variable "s3_backend_name" {
  description = "name of bucket for backend terraform"
  type = string
  default = "backend-tf-control"
}

variable "dynamo_backend_name" {
  description = "name of table in dynamoDB for backend terraform"
  type = string
  default = "backend-tf-locker"
}

variable "common_tags" {
  description = "tags for resource created by terraform"
  type = map(string)
  default = {
    Terraform = "true"
    Environment = "prod"
  }
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "availability_zones" {
  description = "List of availability zones"
  type        = list(string)
  default     = ["us-east-1a", "us-east-1b"]
}

variable "private_subnets" {
  description = "List of private subnet CIDRs"
  type        = list(string)
  default     = []
}

variable "public_subnets" {
  description = "List of public subnet CIDRs"
  type        = list(string)
  default     = ["10.0.101.0/24"]
}

variable "local_ingress_cidr_blocks" {
  description = "CIDR blocks for local ingress"
  type        = list(string)
  default     = ["138.204.25.219/32"]
}

variable "key_pair_name" {
  description = "Name of the SSH key pair"
  type        = string
  default     = "key"
}

variable "public_key_path" {
  description = "Path to the public key file"
  type        = string
  default     = "./keys/key.pub"
}

variable "instance_type" {
  description = "Type of the EC2 instance"
  type        = string
  default     = "t2.micro"
}

variable "port_rds" {
  description = "Porta para o RDS"
  type        = number
  default     = 8642
}
