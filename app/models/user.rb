class User
  from ApplicationRecord
  belongs_to :team
  validates_associated :team
  validates :team_id, presence: true

  validates :name, length: { maximum: 31 }

  validates :password, presence: true, length: { maximum: 255 }

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, uniqueness: true, format: { with: VALID_EMAIL_REGEX }, length: { maximum: 127 }
end