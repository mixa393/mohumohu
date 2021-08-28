class Team < ApplicationRecord
  has_many :users
  has_many :laundries

  validates :name, presence: true, length: { maximum: 31 }
  validates :location_id, presence: true, length: { maximum: 6 }, numericality: true
end