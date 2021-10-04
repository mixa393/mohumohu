class Laundry < ApplicationRecord
  # 論理削除されていないものを検索
  # @return [Array]
  scope :valid, -> { where(deleted_at: nil) }

  # wash_atで今日から3日以内をソートして返却
  # @params [Integer] yesterday,three_days_later
  # @return [Array]
  scope :recent, -> (yesterday, three_days_later) do
    where("wash_at <= ?", three_days_later)
      .where("wash_at > ?", yesterday) #バッチ処理未完成のため過去の表示を消すために一時的に表記
      .order(is_displayed: :desc, wash_at: :asc, id: :desc)
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

  # daysがなかった場合に代入される
  DAY_NUMBER = 30

  # wash_atの値を1日ごとに確認して修正する
  # バッチ処理で1日1回呼び出す
  # 昨日の日付のものを抽出して、days日後or30日後に修正して格納し直す
  # 上手くいかなかった場合エラーをログに出力してロールバック
  def self.update_wash_at
    yesterday = Time.current.yesterday.to_date

    # wash_atが昨日のものを取得
    laundries = Laundry.where(deleted_at: nil, wash_at: yesterday)

    # もし変更するものがなかったら何もしない
    return unless laundries

    # その全てのwash_atを、今日からdays日後に修正し直す

    laundries.each do |laundry|
      days = laundry.days || DAY_NUMBER
      laundry.update(wash_at: laundry.wash_at + days)
    end

  end
end