class Laundry < ApplicationRecord
  belongs_to :team
  belongs_to :user
  has_many :laundry_histories

  validates :name, presence: true, length: { maximum: 127 }
  validates :description, length: { maximum: 255 }

  validates :days, presence: true, unless: :wash_at?
  validates :days, numericality: { only_integer: true }, allow_nil: true

  validates :wash_at, presence: true
end