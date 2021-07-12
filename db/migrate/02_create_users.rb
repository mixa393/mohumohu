class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :name, limit: 31, null: false
      t.string :email, limit: 127, null: false
      t.string :password
      t.string :image_path
      t.datetime :deleted_at
      t.timestampsrbenv
    end
  end
end
