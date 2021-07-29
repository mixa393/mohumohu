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

ActiveRecord::Schema.define(version: 4) do

  create_table "laundries", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "team_id", null: false
    t.bigint "user_id", null: false
    t.string "name", limit: 127, null: false
    t.string "description"
    t.integer "days", default: 7, null: false, comment: "次の洗濯までの期間、デフォルトは7日"
    t.text "notice", comment: "洗濯期間が過ぎたときの通知文"
    t.datetime "deleted_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["team_id"], name: "fk_rails_8d3d62ee18"
    t.index ["user_id"], name: "fk_rails_a8d139236e"
  end

  create_table "laundry_histories", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "laundry_id", null: false
    t.datetime "deleted_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["laundry_id"], name: "fk_rails_fc39ad0af7"
    t.index ["user_id"], name: "fk_rails_e9cb30e4a7"
  end

  create_table "teams", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "name", limit: 31, null: false
    t.datetime "deleted_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "team_id", null: false
    t.string "name", limit: 31, null: false
    t.string "email", limit: 127, null: false
    t.string "password", null: false
    t.time "remind_at"
    t.datetime "deleted_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["team_id"], name: "fk_rails_b2bbf87303"
  end

  add_foreign_key "laundries", "teams"
  add_foreign_key "laundries", "users"
  add_foreign_key "laundry_histories", "laundries"
  add_foreign_key "laundry_histories", "users"
  add_foreign_key "users", "teams"
end
