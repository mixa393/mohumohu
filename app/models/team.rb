class Team < ApplicationRecord
  validates :name, presence: true, length: { maximum: 31 }

  has_many :users
  has_many :laundries
end