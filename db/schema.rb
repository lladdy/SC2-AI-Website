# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180804061821) do

  create_table "bot_histories", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "bot_id", null: false
    t.integer "mmr", null: false
    t.datetime "created_at", null: false
    t.index ["bot_id"], name: "index_bot_histories_on_bot_id"
  end

  create_table "bot_types", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "name", null: false
  end

  create_table "bots", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "bot_type_id"
    t.bigint "owner_id"
    t.string "name", null: false
    t.string "author", null: false
    t.string "race", null: false
    t.integer "match_count", default: 0, null: false
    t.integer "win_count", default: 0, null: false
    t.string "executable"
    t.index ["bot_type_id"], name: "fk_rails_6f2cf3be8b"
    t.index ["owner_id"], name: "fk_rails_f93a12e463"
  end

  create_table "game_result_bots", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.bigint "bot_id", null: false
    t.bigint "game_result_id", null: false
    t.index ["bot_id"], name: "fk_rails_1e2878cb84"
    t.index ["game_result_id"], name: "fk_rails_2975451098"
  end

  create_table "game_results", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.datetime "created_at"
    t.string "map", null: false
    t.bigint "winner_id"
    t.string "replay"
    t.index ["winner_id"], name: "fk_rails_f187e71c0b"
  end

  create_table "users", force: :cascade, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8" do |t|
    t.string "role", default: "user"
    t.string "avatar"
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "username", null: false
    t.string "github"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "bot_histories", "bots"
  add_foreign_key "bots", "bot_types"
  add_foreign_key "bots", "users", column: "owner_id"
  add_foreign_key "game_result_bots", "bots"
  add_foreign_key "game_result_bots", "game_results"
  add_foreign_key "game_results", "bots", column: "winner_id"
end
