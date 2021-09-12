module UpdateWash_at
  extend self

  def batch
    today = Time.now.to_date

    # wash_atが今日のものを取得
    laundries = Laundry.where(deleted_at: nil, wash_at: today)

    # その全てのwash_atを、今日からdays日後に修正し直す
    laundries.each do |laundry|

      # controller風に書けるなら以下
      laundry.update(wash_at: laundry.wash_at + laundry.days)

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
