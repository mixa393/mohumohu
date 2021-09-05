class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.bigint :team_id, null: false
      t.string :name, limit: 31, null: false
      t.string :email, limit: 127, null: false, unique: true
      t.string :password_digest, limit: 255, null: false
      t.string :remember_digest
      t.time :remind_at
      t.datetime :deleted_at
      t.timestamps
    end

    add_foreign_key :users, :teams

  end
end
