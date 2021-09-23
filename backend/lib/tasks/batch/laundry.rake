namespace :laundry do
  desc "wash_atが昨日のものの値をdays日後に更新する"
  task update_wash_at: :environment do
    Laundry.update_wash_at
  end
end