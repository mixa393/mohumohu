class Laundry < ApplicationRecord
  # 論理削除されていないものを検索
  # @return [Array]
  scope :valid, ->  { where(deleted_at: nil) }

  # wash_atで今日から3日以内をソートして返却
  # @params [Integer] yesterday,three_days_later
  # @return [Array]
  scope :recent, -> (yesterday, three_days_later) do
    where("wash_at <= ?", three_days_later)
      .where("wash_at > ?", yesterday) #バッチ処理未完成のため過去の表示を消すために一時的に表記
      .order(id: :desc, wash_at: :asc)
  end

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