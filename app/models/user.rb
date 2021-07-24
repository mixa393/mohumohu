class User < ApplicationRecord
  validates :name, :password, :email, :team_id, :created_at, :updated_at, presence: true

  validates :name, length: { maximum: 31 }
  validates :password, length: { maximum: 255 }

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, uniqueness: true, format: { with: VALID_EMAIL_REGEX }, length: { maximum: 127 }

  belongs_to :team
  has_many :laundry_history
  has_many :laundries
end