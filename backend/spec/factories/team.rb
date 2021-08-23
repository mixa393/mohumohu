FactoryBot.define do
  factory :team do
    name { Faker::Team.name }
    location_id { 130010 }
  end
end