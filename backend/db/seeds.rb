5.times do |n|
  Team.create!(
    name: Faker::Team.name,
    location_id: 130010
  )
end

# user作成
Team.all.each do |team|
  password = Faker::Internet.password

  team.users.create!(
    name: Faker::Internet.username,
    email: Faker::Internet.unique.email,
    password: password,
    password_confirmation: password
  )
end

# laundry作成
User.all.each do |user|
  3.times do
    user.laundries.create!(
      team_id: user.team_id,
      name: Faker::String.random(length: 3..12),
      wash_at: Time.now.to_date + rand(3..7),
      description: "#{Faker::String.random(length: 3..12)}の説明文",
      notice:"#{Faker::String.random(length: 3..12)}の洗濯期限になりました。"
    )
  end
end

# # laundry_history作成
# Laundry.all.each do |n|
#   laundry.laundry_histories.create!(
#     user_id: User.find(n),
#     laundry_id: Laundry.find(n)
#   )
# end
