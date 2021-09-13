namespace :laundries do
  desc "毎日wash_atが昨日のものの値をdays日後に更新する"
  task update_wash_at: :environment do
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
