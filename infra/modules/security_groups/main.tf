resource "aws_security_group" "web_sg" {
  name        = "${var.name_prefix}-web-sg"
  description = "Security group for web server"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = var.tags
}

resource "aws_security_group" "local_ingress" {
  name        = "${var.name_prefix}-local-ingress-sg"
  description = "Security group for local ingress"
  vpc_id      = var.vpc_id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = var.local_ingress_cidr_blocks
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = var.tags
}

resource "aws_security_group" "ec2-rds" {
  name        = "${var.name_prefix}-ec2-rds"
  description = "regra de saida para porta rds"
  vpc_id      = var.vpc_id
  tags        = var.tags
}

resource "aws_security_group" "rds-ec2" {
  name        = "${var.name_prefix}-rds-ec2"
  description = "regra de entrada na porta rds"
  vpc_id      = var.vpc_id
  tags        = var.tags
}

resource "aws_security_group_rule" "ec2_rds_egress" {
  type              = "egress"
  from_port         = var.port_rds
  to_port           = var.port_rds
  protocol          = "tcp"
  source_security_group_id = aws_security_group.rds-ec2.id
  security_group_id = aws_security_group.ec2-rds.id
}

resource "aws_security_group_rule" "rds_ec2_ingress" {
  type              = "ingress"
  from_port         = var.port_rds
  to_port           = var.port_rds
  protocol          = "tcp"
  source_security_group_id = aws_security_group.ec2-rds.id
  security_group_id = aws_security_group.rds-ec2.id
}