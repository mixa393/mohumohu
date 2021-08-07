FactoryBot.define do
  factory :user, class: User do
    team
    name { Faker::Internet.username }
    email { Faker::Internet.unique.email }
    password { Faker::Internet.password }
  end
end