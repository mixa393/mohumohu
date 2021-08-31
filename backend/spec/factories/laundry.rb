FactoryBot.define do
  factory :laundry do
    team
    user
    name { Faker::String.random(length: 3..12) }
    wash_at { Time.now.to_date + 5 }
    days { rand(5..10) }
    description { "#{Faker::String.random(length: 3..12)}の説明文" }
    notice { "#{Faker::String.random(length: 3..12)}の通知文" }
  end
end