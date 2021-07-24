class Team < ApplicationRecord
  validates :name, :created_at, :updated_at, presence: true

  has_many :user
  validates :name, length: { maximum: 31 }
end