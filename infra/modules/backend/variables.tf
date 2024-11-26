variable "s3_name" {
  description = "name of bucket for backend terraform"
  type = string
}

variable "dynamo_name" {
  description = "name of table in dynamoDB for backend terraform"
  type = string
}

variable "tags" {
  description = "tags for resources created by terraform"
  type = map(string)
}