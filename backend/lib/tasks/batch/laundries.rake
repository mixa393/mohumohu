namespace :laundries do
  desc "毎日wash_atが昨日のものの値をdays日後に更新する"
  task update_wash_at: :environment do
    Laundry.new.update_wash_at
  end
end