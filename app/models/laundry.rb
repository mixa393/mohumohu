class Laundry < ApplicationRecord
  validates :team_id, :user_id, :days, :created_at, :updated_at, presence: true

  validates :name, length: { maximum: 127 }
  validates :description, length: { maximum: 255 }
  validates :days, numericality: { only_integer: true }

  belongs_to :team
  belongs_to :user
  has_many :laundry_histories
end