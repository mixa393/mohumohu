class LaundryHistory < ApplicationRecord
  validates :user_id, :laundry_id, :created_at, :updated_at, presence: true

  belongs_to :user
  belongs_to :laundry
end