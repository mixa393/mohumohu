class User < ApplicationRecord
  belongs_to :team
  has_many :laundry_histories
  has_many :laundries

  validates :name, presence: true, length: { maximum: 31 }

  has_secure_password
  validates :password, presence: true, length: { minimum: 6, maximum: 255 }
  validates :password_confirmation, presence: true, length: { minimum: 6, maximum: 255 }

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }, length: { maximum: 127 }
end