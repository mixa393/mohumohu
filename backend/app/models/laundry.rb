class Laundry < ApplicationRecord
  belongs_to :team
  belongs_to :user
  has_many :laundry_histories

  validates :name, presence: true, length: { maximum: 127 }
  validates :description, length: { maximum: 255 }
  validates :days, numericality: { only_integer: true }, allow_nil: true
  validates :image, length: { maximum: 127 }

  validate :wash_at_check

  def wash_at_check
    # wash_atが空の時は自動的に7日後になるためチェックしない
    unless self.wash_at.nil?
      errors.add(:wash_at, "は現在の日時より遅い時間を選択してください") if self.wash_at < Time.now.to_date
    end
  end
end