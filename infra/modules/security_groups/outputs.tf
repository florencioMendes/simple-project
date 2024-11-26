output "web_sg_id" {
  description = "ID of the web security group"
  value       = aws_security_group.web_sg.id
}

output "local_ingress_sg_id" {
  description = "ID of the local ingress security group"
  value       = aws_security_group.local_ingress.id
}

output "ingress_rds" {
  description = "ID of the rds-ec2 security group"
  value       = aws_security_group.rds-ec2.id
}

output "egress_rds" {
  description = "ID of the ec2-rds security group"
  value       = aws_security_group.ec2-rds.id
}