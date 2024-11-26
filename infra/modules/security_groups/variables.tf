variable "name_prefix" {
  description = "Prefix for the security group names"
  type        = string
}

variable "vpc_id" {
  description = "The VPC ID where the security groups will be created"
  type        = string
}

variable "local_ingress_cidr_blocks" {
  description = "CIDR blocks for local ingress"
  type        = list(string)
}

variable "tags" {
  description = "Tags to apply to the resources"
  type        = map(string)
  default     = {}
}

variable "port_rds" {
  description = "porta utilizada na db rds"
  type        = number
}