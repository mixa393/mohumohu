class CreateTeams < ActiveRecord::Migration[6.1]
  def change
    create_table :teams do |t|
      t.string :name, null: false, limit: 31
      t.datetime :deleted_at, null: false
      t.timestamps
    end
  end
end
