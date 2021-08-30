class CreateLaundries < ActiveRecord::Migration[6.1]
  def change
    create_table :laundries do |t|
      t.bigint :team_id, null: false
      t.bigint :user_id, null: false
      t.string :name, null: false, limit: 127
      t.string :description, limit: 255
      t.integer :days, comment: "次の洗濯までの期間"
      t.date :wash_at, null: false, default: Time.now.to_date, comment: "次回の洗濯日"
      t.text :notice, comment: "洗濯期間が過ぎたときの通知文"
      t.string :image_path, default: "default.svg", null: false, limit: 127
      t.datetime :deleted_at
      t.timestamps
    end

    add_foreign_key :laundries, :teams
    add_foreign_key :laundries, :users

  end
end
