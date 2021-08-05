FactoryBot.define do
  factory :laundry do
    name { "laundry_name" }
    days { 5 }
    team_id { 1 }
    user_id { 1 }
  end
end