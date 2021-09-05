class User < ApplicationRecord
  belongs_to :team
  has_many :laundry_histories
  has_many :laundries

  validates :name, presence: true, length: { maximum: 31 }

  has_secure_password
  validates :password, presence: true, length: { minimum: 6, maximum: 255 },on: :create
  validates :password_confirmation, presence: true, length: { minimum: 6, maximum: 255 },on: :create

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }, length: { maximum: 127 }

  # 以下ログイン用
  attr_accessor :remember_token

  # ランダムなトークンを返す
  def User.new_token
    SecureRandom.urlsafe_base64
  end

  # 永続的セッションで使用するユーザーをデータベースに記憶
  def remember
    self.remember_token = User.new_token
    update_attribute(:remember_digest, User.digest(remember_token))
  end

  # 渡されたトークンがダイジェストと一致したらtrueを返す
  def authenticated?(remember_token)
    return false if remember_digest.nil?
    BCrypt::Password.new(remember_digest).is_password?(remember_token)
  end

  # ユーザーログインを破棄
  def forget
    update_attribute(:remember_digest, nil)
  end
end