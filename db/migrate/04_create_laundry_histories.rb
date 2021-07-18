class CreateLaundryHistories < ActiveRecord::Migration[6.1]
  def change
    create_table :laundry_histories do |t|

      t.timestamps
    end
  end
end
