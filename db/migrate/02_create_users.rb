class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.bigint :group_id
      t.string :name, limit: 31, null: false
      t.string :email, limit: 127, null: false
      t.string :password,null: false
      t.datetime :deleted_at
      t.timestamps
    end

    add_foreign_key :users,:groups

  end
end
