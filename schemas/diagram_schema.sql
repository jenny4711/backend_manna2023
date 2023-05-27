CREATE TABLE "users" (
  "id" integer PRIMARY KEY,
  "email" text,
  "password" text
);

CREATE TABLE "history" (
  "id" integer PRIMARY KEY,
  "user_id" integer,
  "msg" text
);

CREATE TABLE "poppular_event" (
  "id" integer PRIMARY KEY,
  "user_id" integer
);

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "history" ("user_id");

ALTER TABLE "history" ADD FOREIGN KEY ("user_id") REFERENCES "poppular_event" ("user_id");
