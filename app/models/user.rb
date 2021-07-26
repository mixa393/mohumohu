class User < ApplicationRecord
  belongs_to :team
  has_many :laundry_histories
  has_many :laundries

  validates :name,presence: true, length: { maximum: 31 }
  validates :password, presence:true,length: { maximum: 255 }

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email,presence:true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }, length: { maximum: 127 }
end