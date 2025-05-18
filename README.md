# テーブル設計

## staff_members テーブル

| Column             | Type    | Options     |
| ------------------ | ------- | ----------- |
| family_name        | string  | null: false |
| family_name_kana   | string  | null: false |
| given_name         | string  | null: false |
| given_name_kana    | string  | null: false |
| nick_name          | string  | null: false |
| email              | string  | null: false |
| encrypted_password | string  | null: false |
| position           | integer | null: false |
| birthday           | date    | null: false |
| made_in            | integer | null: false |
| phone              | string  | null: false |

### Association

- has_many :customers
- has_many :daily_reports
- has_many :visits
- has_many :survey_tables
- has_many :reservations

## customers テーブル

| Column           | Type       | Options                        |
| ---------------- | ---------- | ------------------------------ |
| family_name      | string     | null: false                    |
| family_name_kana | string     | null: false                    |
| given_name       | string     | null: false                    |
| given_name_kana  | string     | null: false                    |
| phone1           | string     | null: false                    |
| phone2           | string     |                                |
| customer_rank_id | references | null: false, foreign_key: true |
| staff_member_id  | references | null: false, foreign_key: true |
| email            | string     |                                |
| memo             | text       |                                |
| birthday         | date       |                                |

### Association

- belongs_to :staff_member
- belongs_to :customer_rank
- has_many :customer_reports
- has_many :reservations
- has_many :visits

## customer_ranks テーブル

| Column | Type   | Options     |
| ------ | ------ | ----------- |
| name   | string | null: false |
| color  | string | null: false |

### Association

- has_many :customers

## daily_reports テーブル

| Column            | Type       | Options                        |
| ----------------- | ---------- | ------------------------------ |
| staff_member_id   | references | null: false, foreign_key: true |
| sales_amount      | integer    | null: false                    |
| morning_comment   | text       | null: false                    |
| afternoon_comment | text       | null: false                    |
| target_value      | integer    | null: false, foreign_key: true |

### Association

- belongs_to :staff_member
- belongs_to :standard_codes

## customer_reports テーブル

| Column                   | Type       | Options                                                 |
| ------------------------ | ---------- | ------------------------------------------------------- |
| customer_id              | references | null: false, foreign_key: true                          |
| staff_member_id          | references | null: false, foreign_key: true                          |
| reservation_id           | references | null: false, foreign_key: true                          |
| number_appointments_type | references | null: false, foreign_key: { to_table: :standard_codes } |
| menu_code_type           | references | null: false, foreign_key: { to_table: :standard_codes } |
| who_come_with            | string     | null: false                                             |
| menu_details             | text       | null: false                                             |
| memo                     | text       | null: false                                             |
| luxury_goods_type        | string     | null: false                                             |
| table_masters_id         | integer    | null: false, foreign_key: { to_table: :table_master }   |

### Association

- belongs_to :customer
- belongs_to :staff_member
- belongs_to :reservation

## reservations テーブル

| Column           | Type       | Options                                                  |
| ---------------- | ---------- | -------------------------------------------------------- |
| customer_id      | references | null: false, foreign_key: true                           |
| staff_member_id  | references | null: false, foreign_key: true                           |
| table_masters_id | references | null: false, foreign_key: { to_table: :table_master }    |
| reserved_at      | datetime   | null: false                                              |
| reservation_type | references | null: false,foreign_key:{ to_table:standard_codes }false |
| menu_details     | text       | null: false                                              |
| memo             | text       | null: false                                              |

### Association

- belongs_to :customer
- belongs_to :staff_member
- has_one :customer_report
- has_many :schedule_slots
- belongs_to :table_master

## schedule_slots テーブル

| Column         | Type     | Options                        |
| -------------- | -------- | ------------------------------ |
| reservation_id | integer  | null: false, foreign_key: true |
| start_time     | datetime | null: false                    |
| date_time      | datetime | null: false                    |
| color          | string   |                                |

### Association

- belongs_to :reservation

## visits テーブル

| Column               | Type       | Options                        |
| -------------------- | ---------- | ------------------------------ |
| customer_id          | references | null: false, foreign_key: true |
| staff_member_id      | references | null: false, foreign_key: true |
| product_menu_code_id | references | null:false,Default:0,          |
| price                | integer    |                                |

### Association

- belongs_to :customer
- belongs_to :staff_member
- has_many :visit_details
- has_many :budgets

## visit_details

| Column          | Type       | Options                                                        |
| --------------- | ---------- | -------------------------------------------------------------- |
| visit_id        | references | null: false, foreign_key: true                                 |
| product_menu_id | references | null: false, foreign_key: true                                 |
| unit_type       | references | null: false, default:0,foreign_key:{ to_table:standard_codes } |
| price           | integer    |                                                                |
| table_master_id | references | null: false, default:0,foreign_key:{ to_table:standard_codes } |
| memo            | text       |                                                                |

## table_master テーブル

| Column     | Type    | Options      |
| ---------- | ------- | ------------ |
| name       | string  | null: false  |
| floor      | string  | null: false  |
| capacity   | integer | null: false  |
| table_type | integer | null: false  |
| active     | boolean | default:true |
| memo       | text    |              |

### Association

- has_many :reservations

## standard_code_category テーブル

| Column | Type   | Options     |
| ------ | ------ | ----------- |
| name   | string | null: false |
| code   | string | null: false |

### Association

has_many :standard_codes

## standard_codes テーブル

| Column          | Type    | Options                       |
| --------------- | ------- | ----------------------------- |
| staff_member_id | integer | null: false, foreign_key:true |
| standard_codes  | integer | null: false, foreign_key:true |
| name            | string  | null: false                   |
| code            | string  | null: false                   |

### Association

- belong_to :standard_code_category
- has_many :reservations (as reservation_type)
- has_many :customer_reports
- has_many :daily_reports
- has_many :visit_details

## product_group_codes

| Column                       | Type    | Options     |
| ---------------------------- | ------- | ----------- |
| product_name                 | string  | null: false |
| description                  | text    | null: false |
| active                       | integer | null: false |
| purchase_record_registration | integer | null: false |
| inventory_registration       | integer | null: false |

### Association

- has_many :product_codes

## product_codes

| Column           | Type    | Options     |
| ---------------- | ------- | ----------- |
| product_group_id | string  | null: false |
| code             | string  | null: false |
| name             | string  | null: false |
| description      | text    | null: false |
| active           | integer | null: false |

### Association

- belong_to :product_group_codes
- has_many :product_menu_codes

## product_menu_codes

| Column          | Type    | Options                       |
| --------------- | ------- | ----------------------------- |
| product_name    | string  | null: false                   |
| product_code_id | integer | null: false, foreign_key:true |
| price           | integer | default:0                     |
| is_virtual      | boolean | null: false                   |
| active          | integer | null: false                   |

## Association

- belong_to :product_codes

## admins

| Column           | Type   | Options     |
| ---------------- | ------ | ----------- |
| family_name      | string | null: false |
| family_name_kana | string | null: false |
| given_name       | string | null: false |
| given_name_kana  | string | null: false |
| birthday         | date   | null: false |

## Association

- has_many :notices
- has_many :budgets

## Notices

| Column      | Type    | Options                      |
| ----------- | ------- | ---------------------------- |
| title       | string  | null: false                  |
| description | text    | null: false                  |
| admin_id    | integer | null: false,foreign_key:true |

## Association

- belong_to :admins
