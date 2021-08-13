class Team < ApplicationRecord
  has_many :users
  has_many :laundries

  validates :name, presence: true, length: { maximum: 31 }
end