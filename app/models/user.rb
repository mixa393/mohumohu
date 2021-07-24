class User < ApplicationRecord
  validates :created_at, :updated_at, :name, :password, :email, :team_id, presence: true

  validates :name, length: { maximum: 31 }
  validates :password, length: { maximum: 255 }

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, uniqueness: true, format: { with: VALID_EMAIL_REGEX }, length: { maximum: 127 }

  belongs_to :team
  validates_associated :team
end