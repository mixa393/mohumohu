class Team
  from ApplicationRecord
  has_many :user
  validates :name, presence: true, length: { maximum: 31 }
end