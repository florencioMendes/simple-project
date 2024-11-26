terraform {
  required_version = ">= 1.0"
  backend "s3" {
    bucket = "backend-tf-control"
    key = "terraform.tfstate"
    region = "us-east-1"
    encrypt = true
    dynamodb_table = "backend-tf-locker"
  }
}
