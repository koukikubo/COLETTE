# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2025_12_08_100619) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "customers", force: :cascade do |t|
    t.string "family_name"
    t.string "family_name_kana"
    t.string "given_name"
    t.string "given_name_kana"
    t.string "phone1"
    t.string "phone2"
    t.string "email"
    t.text "memo"
    t.date "birthday"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "mypages", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "family_name"
    t.string "family_name_kana"
    t.string "given_name"
    t.string "given_name_kana"
    t.string "nick_name"
    t.string "position"
    t.date "birthday"
    t.string "made_in"
    t.string "phone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_mypages_on_user_id"
  end

  create_table "posts", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "shop_infos", force: :cascade do |t|
    t.string "shop_name", null: false
    t.string "phone"
    t.text "address"
    t.string "business_hours"
    t.string "holiday"
    t.string "tax_mode", default: "内税"
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "standard_list_mastas", force: :cascade do |t|
    t.bigint "standard_masta_id", null: false
    t.string "list_code", null: false
    t.string "name", null: false
    t.boolean "enabled", default: true, null: false
    t.text "remarks"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["standard_masta_id", "list_code"], name: "index_std_list_on_masta_and_option_code", unique: true
    t.index ["standard_masta_id"], name: "index_standard_list_mastas_on_standard_masta_id"
  end

  create_table "standard_mastas", force: :cascade do |t|
    t.string "base_code", null: false
    t.string "name", null: false
    t.boolean "enabled", default: true, null: false
    t.text "remarks"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["base_code"], name: "index_standard_mastas_on_base_code", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "mypages", "users"
  add_foreign_key "standard_list_mastas", "standard_mastas"
end
