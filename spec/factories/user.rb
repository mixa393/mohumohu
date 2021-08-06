FactoryBot.define do
  factory :user, class: User do
    name { Faker::Internet.username }
    email { Faker::Internet.unique.email }
    password { Faker::Internet.password }
    team_id { 1 }
  end

  factory :second_user, class: User do
    name { Faker::Internet.username }
    email { Faker::Internet.unique.email }
    password { Faker::Internet.password }
    team_id { 1 }
  end
end