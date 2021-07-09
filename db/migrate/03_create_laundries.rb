class CreateLaundries < ActiveRecord::Migration[6.1]
  def change
    create_table :laundries do |t|

      t.timestamps
    end
  end
end
