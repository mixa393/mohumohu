class LaundryHistory < ApplicationRecord
  # ユーザーIDと履歴IDを用いて検索
  # @params [Integer] user_id, id
  scope :valid_user, -> (user_id,id){ where(deleted_at: nil, user_id: user_id).find(id) }

  belongs_to :user
  belongs_to :laundry
end