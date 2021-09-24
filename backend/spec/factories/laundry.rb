FactoryBot.define do
  factory :laundry do
    team
    user
    name { "#{user.name}の洗濯物" }
    wash_at { Time.now.to_date + rand(0..3) }
    days { rand(1..5) }
    description { "#{name}の説明文" }
    notice { "#{name}の通知文" }
  end
end