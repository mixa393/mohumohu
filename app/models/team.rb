class Team < ApplicationRecord
  validates :name, :created_at, :updated_at, presence: true

  validates :name, length: { maximum: 31 }

  has_many :users
  has_many :laundries
end