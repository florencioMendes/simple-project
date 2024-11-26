output "s3_bucket_name" {
  description = "Name of the S3 bucket"
  value = aws_s3_bucket.s3_bucket.id
}

output "dynamodb_table_name" {
  description = "Name of the DynamboDB table"
  value = aws_dynamodb_table.dynamo_table.name
}