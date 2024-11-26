-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "users" (
    "id"  SERIAL  NOT NULL,
    "name" varchar(255)   NOT NULL,
    "email" varchar(255)   NOT NULL,
    "phone" varchar(20)   NOT NULL,
    "auth_id" UUID   NOT NULL,
    "create_at" timestamp  DEFAULT clock_timestamp() NOT NULL,
    "update_ate" timestamp  DEFAULT clock_timestamp() NOT NULL,
    CONSTRAINT "pk_users" PRIMARY KEY (
        "id"
     ),
    CONSTRAINT "uc_users_auth_id" UNIQUE (
        "auth_id"
    )
);

CREATE INDEX "idx_users_auth_id"
ON "users" ("auth_id");

