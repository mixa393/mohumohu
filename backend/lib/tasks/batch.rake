namespace :batch do
  desc "毎日wash_atが昨日のものの値をdays日後に更新する"
  task batch: :environment do
    Batch.batch
  end
end
