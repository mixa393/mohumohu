class LaundryHistory < ApplicationRecord
  # ユーザーIDと履歴IDを用いて検索
  # @params [Integer] user_id, id
  scope :valid, -> { where(deleted_at: nil) }

  belongs_to :user
  belongs_to :laundry
end