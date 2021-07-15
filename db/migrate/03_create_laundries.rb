class CreateLaundries < ActiveRecord::Migration[6.1]
  def change
    create_table :laundries do |t|
      t.bigint :group_id
      t.bigint :user_id
      t.string :name, null: false, limit: 31
      t.string :description, limit: 255
      t.integer :days, null: false, default: 7, comment: "次の洗濯までの期間、デフォルトは7日"
      t.text :notice, comment: "洗濯期間が過ぎたときの通知文"
      t.datetime :deleted_at
      t.timestamps
    end

    add_foreign_key :laundries, :groups
    add_foreign_key :laundries, :users

  end
end
