FactoryBot.define do
  factory :user, class: User do
    name { "testuser" }
    email { "email@test.com" }
    password { "testpass" }
    team_id { 1 }
  end

  factory :second_user, class: User do
    name { "testuser2" }
    email { "email@test.com" }
    password { "testpass2" }
    team_id { 1 }
  end
end