class CreateLaundryHistories < ActiveRecord::Migration[6.1]
  def change
    create_table :laundry_histories do |t|
      t.bigint :user_id, null: false
      t.bigint :laundry_id, null: false
      t.datetime :deleted_at
      t.timestamps
    end

    add_foreign_key :laundry_histories, :users
    add_foreign_key :laundry_histories, :laundries

  end
end
