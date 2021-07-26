class Laundry < ApplicationRecord
  validates :name, presence: true, length: { maximum: 127 }
  validates :description, length: { maximum: 255 }
  validates :days, presence: true, numericality: { only_integer: true }

  belongs_to :team
  belongs_to :user
  has_many :laundry_histories
end