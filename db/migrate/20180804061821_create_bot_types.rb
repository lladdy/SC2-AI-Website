class CreateBotTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :bot_types do |t|
      t.string :name, null: false
      t.boolean :invisible, null: false
    end
    add_column :bots, :bot_type_id, :integer, limit: 8, null: false
    add_foreign_key :bots, :bot_types, column: :bot_type_id
  end
end
