FactoryBot.define do
  factory :user, class: User do
    team
    name { Faker::Internet.username }
    email { Faker::Internet.unique.email }
    password_digest { Faker::Internet.password }
  end
end