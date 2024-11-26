provider "aws" {
  region = "us-east-1"
}

# Invocando o módulo que cria os recursos para o backend
module "backend" {
  source = "./modules/backend"

  s3_name = var.s3_backend_name
  dynamo_name = var.dynamo_backend_name
  tags = var.common_tags
}

# Outras configurações e módulos, como VPC e EC2

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "myservice-vpc"
  cidr = var.vpc_cidr

  azs                 = var.availability_zones
  private_subnets     = [for k, v in var.availability_zones : cidrsubnet(var.vpc_cidr, 8, k)]
  public_subnets      = [for k, v in var.availability_zones : cidrsubnet(var.vpc_cidr, 8, k + 4)]
  database_subnets    = [for k, v in var.availability_zones : cidrsubnet(var.vpc_cidr, 8, k + 8)]

  create_database_subnet_group = true

  enable_nat_gateway = false
  enable_vpn_gateway = false

  tags = var.common_tags
}

resource "aws_eip" "link-ip" {
  tags = var.common_tags
}

module "security_groups" {
  source = "./modules/security_groups"

  name_prefix              = "myservice"
  vpc_id                   = module.vpc.vpc_id
  local_ingress_cidr_blocks = var.local_ingress_cidr_blocks
  tags = var.common_tags
  port_rds = var.port_rds
}

resource "aws_key_pair" "lb_key_par" {
  key_name   = var.key_pair_name
  public_key = file(var.public_key_path)
}

data "aws_ami" "ubuntu_22_04" {
  most_recent = true
  owners      = ["099720109477"]  # Canonical

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }

  filter {
    name   = "architecture"
    values = ["x86_64"]
  }
}

module "ec2_instance" {
  source = "terraform-aws-modules/ec2-instance/aws"

  name                     = "ec2-server"
  availability_zone        = var.availability_zones[0]
  ami                      = data.aws_ami.ubuntu_22_04.id
  instance_type            = var.instance_type
  key_name                 = aws_key_pair.lb_key_par.key_name
  monitoring               = true
  vpc_security_group_ids   = [module.security_groups.web_sg_id, module.security_groups.local_ingress_sg_id, module.security_groups.egress_rds]
  subnet_id                = element(module.vpc.public_subnets, 0)

  tags = var.common_tags
}

resource "aws_eip_association" "association_ip_link" {
  instance_id   = module.ec2_instance.id
  allocation_id = aws_eip.link-ip.id
}

module "db" {
  source = "terraform-aws-modules/rds/aws"

  identifier = "db-main-myservice"

  # All available versions: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_PostgreSQL.html#PostgreSQL.Concepts
  engine               = "postgres"
  engine_version       = "16.1"
  family               = "postgres16" # DB parameter group
  major_engine_version = "16.1"         # DB option group
  instance_class       = "db.t3.micro"

  allocated_storage     = 20
  max_allocated_storage = 1000

  # NOTE: Do NOT use 'user' as the value for 'username' as it throws:
  # "Error creating DB Instance: InvalidParameterValue: MasterUsername
  # user cannot be used as it is a reserved word used by the engine"
  db_name  = "db_name"
  username = "username"
  port     = var.port_rds

  # Setting manage_master_user_password_rotation to false after it
  # has previously been set to true disables automatic rotation
  # however using an initial value of false (default) does not disable
  # automatic rotation and rotation will be handled by RDS.
  # manage_master_user_password_rotation allows users to configure
  # a non-default schedule and is not meant to disable rotation
  # when initially creating / enabling the password management feature
  manage_master_user_password                       = false
  manage_master_user_password_rotation              = false
  master_user_password_rotate_immediately           = false
  password = "senha_aqui"

  multi_az               = false
  db_subnet_group_name   = module.vpc.database_subnet_group
  vpc_security_group_ids = [module.security_groups.ingress_rds]

  maintenance_window              = "Mon:00:00-Mon:03:00"
  backup_window                   = "03:00-06:00"
  enabled_cloudwatch_logs_exports = ["postgresql", "upgrade"]
  create_cloudwatch_log_group     = false

  backup_retention_period = 1
  skip_final_snapshot     = true
  deletion_protection     = false
  copy_tags_to_snapshot   = true

  performance_insights_enabled          = true
  performance_insights_retention_period = 7
  create_monitoring_role                = false

  parameters = [
    {
      name  = "autovacuum"
      value = 1
    },
    {
      name  = "client_encoding"
      value = "utf8"
    }
  ]

  tags = var.common_tags
  db_option_group_tags = {
    "Sensitive" = "low"
  }
  db_parameter_group_tags = {
    "Sensitive" = "low"
  }
}

module "aws_cognito_user_pool" {
  source = "lgallard/cognito-user-pool/aws"

  user_pool_name             = "authSignatureThemyservice"
  alias_attributes           = ["email", "phone_number"]
  auto_verified_attributes   = ["email"]

  // Configurações de senha
  password_policy = {
    minimum_length                   = 8
    require_lowercase                = true
    require_numbers                  = true
    require_symbols                  = true
    require_uppercase                = true
    temporary_password_validity_days = 7
  }

  // Configurações de auto-cadastro
  admin_create_user_config = {
    allow_admin_create_user_only = false
  }

  // Configurações de mensagens de verificação
  verification_message_template = {
    email_message = "Seu código de verificação é {####}."
    email_subject = "Código de verificação"
  }

  // Desativar MFA e segurança avançada
  user_pool_add_ons        = {
    advanced_security_mode = "OFF"
  }

  // client
    clients = [
    {
      allowed_oauth_flows                  = ["code"]
      allowed_oauth_flows_user_pool_client = true
      allowed_oauth_scopes                 = ["email", "openid", "profile", "aws.cognito.signin.user.admin"]
      callback_urls                        = ["https://themyservice.com.br"]
      default_redirect_uri                 = "https://themyservice.com.br"
      explicit_auth_flows                  = ["ALLOW_USER_SRP_AUTH", "ALLOW_REFRESH_TOKEN_AUTH"]
      generate_secret                      = false
      logout_urls                          = ["https://themyservice.com.br"]
      name                                 = "simple-pwa"
      read_attributes                      = ["email", "phone_number"]
      supported_identity_providers         = ["COGNITO"]
      write_attributes                     = ["email", "phone_number"]
      refresh_token_validity               = 30
    }
  ]

  // Tags opcionais
  tags = var.common_tags
}
