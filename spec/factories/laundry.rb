FactoryBot.define do
  factory :laundry do
    name { Faker::String.random(length: 3..12) }
    days { 5 }
    team_id { 1 }
    user_id { 1 }
  end
end