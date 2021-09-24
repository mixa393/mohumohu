class CreateLaundries < ActiveRecord::Migration[6.1]
  def change
    create_table :laundries do |t|
      t.bigint :team_id, null: false
      t.bigint :user_id, null: false
      t.string :name, null: false, limit: 127
      t.string :description, limit: 255
      t.integer :days, comment: "次の洗濯までの期間"
      t.date :wash_at, null: false, default: -> { '(CURRENT_DATE + INTERVAL 7 DAY)' }, comment: "次回の洗濯日"
      t.text :notice, comment: "洗濯期間が過ぎたときの通知文"
      t.string :image, default: "default", null: false, limit: 127
      t.boolean :is_displayed, null: false, default: "false", comment: "その日画面に出力するか否か"
      t.datetime :deleted_at
      t.timestamps
    end

    add_foreign_key :laundries, :teams
    add_foreign_key :laundries, :users

  end
end
