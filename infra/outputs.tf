output "vpc_id" {
  description = "ID of the VPC"
  value       = module.vpc.vpc_id
}

output "web_sg_id" {
  description = "ID of the web security group"
  value       = module.security_groups.web_sg_id
}

output "local_ingress_sg_id" {
  description = "ID of the local ingress security group"
  value       = module.security_groups.local_ingress_sg_id
}

output "ec2_instance_id" {
  description = "ID of the EC2 instance"
  value       = module.ec2_instance.id
}

output "s3_bucket_name" {
  description = "Name of the S3 bucket"
  value       = module.backend.s3_bucket_name
}

output "dynamodb_table_name" {
  description = "Name of the DynamoDB table"
  value       = module.backend.dynamodb_table_name
}

output "ec2-rds" {
  description = "ID of the ec2-rds security group"
  value       = module.security_groups.egress_rds
}

output "rds-ec2" {
  description = "ID of the rds-ec2 security group"
  value       = module.security_groups.ingress_rds
}
