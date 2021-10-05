namespace :laundry do
  desc "wash_atが昨日のものの値をdays日後に更新する"
  task update_wash_at: :environment do
    Laundry.update_wash_at
  end

  desc "is_displayedがfalseのものをtrueに変更"
  task update_display_true: :environment do
    Laundry.update_display_true
  end
end