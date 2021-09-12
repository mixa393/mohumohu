module Batch

  def update_wash_at
    # 昨日の日時
    yesterday = Time.now.to_date - 1

    # wash_atが昨日のものを取得
    laundries = Laundry.where(deleted_at: nil, wash_at: yesterday)

    # その全てのwash_atを、今日からdays日後に修正し直す
    laundries.each do |laundry|

      # controller風に書けるなら以下
      if laundry.days
        laundry.update(wash_at: laundry.wash_at + laundry.days)
      else
        laundry.update(wash_at: laundry.wash_at + 30)
      end

      # API実行なら以下
      # put "/api/v1/laundries/#{laundry.id}", params: { wash_at: laundry.wash_at + laundry.days }
      # auth_token解決せねば
    end

  end

  private

  def laundry_params
    params.permit(:wash_at)
  end
end
