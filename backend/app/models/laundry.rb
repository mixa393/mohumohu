class Laundry < ApplicationRecord
  belongs_to :team
  belongs_to :user
  has_many :laundry_histories

  validates :name, presence: true, length: { maximum: 127 }
  validates :description, length: { maximum: 255 }

  validates :days, presence: true, unless: :wash_at?
  validates :days, numericality: { only_integer: true }, allow_nil: true

  validates :image, length: { maximum: 127 }

  validate :wash_at_check

  def wash_at_check
    errors.add(:wash_at, "は現在の日時より遅い時間を選択してください") if self.wash_at < Time.now.to_date
  end

  def update_wash_at
    # 昨日の日時
    yesterday = Time.now.to_date - 1

    # wash_atが昨日のものを取得
    laundries = Laundry.where(deleted_at: nil, wash_at: yesterday)

    # その全てのwash_atを、今日からdays日後に修正し直す
    laundries.each do |laundry|

      if laundry.days
        laundry.update(wash_at: laundry.wash_at + laundry.days)
      else
        laundry.update(wash_at: laundry.wash_at + 30)
      end
    end
  end
end