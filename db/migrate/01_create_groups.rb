class CreateGroups < ActiveRecord::Migration[6.1]
  def change
    create_table :groups do |t|
      t.string :name, null: false, limit: 31
      t.datetime :deleted_at, null: false
      t.timestamps
    end
  end
end
