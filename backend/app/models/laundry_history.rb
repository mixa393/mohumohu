class LaundryHistory < ApplicationRecord
  # 論理削除されていないものを検索
  scope :valid, -> { where(deleted_at: nil) }

  belongs_to :user
  belongs_to :laundry
end