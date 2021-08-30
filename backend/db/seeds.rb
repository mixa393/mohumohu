# Team作成
# location_idは札幌、仙台、東京、神戸、沖縄からランダムに選択
locations = [{ id: "016010", city: "札幌" },
             { id: "040010", city: "仙台" },
             { id: "130010", city: "東京" },
             { id: "280010", city: "神戸" },
             { id: "471010", city: "沖縄" }]

5.times do |n|
  location = locations.sample

  Team.create!(
    name: "#{location[:city]}の#{Faker::Name.last_name}家",
    location_id: location[:id]
  )
end

# user作成
Team.all.each do |team|
  rand(1..3).times do |n|
    password = Faker::Internet.password

    team.users.create!(
      name: Faker::Name.first_name,
      email: Faker::Internet.unique.email,
      password: password,
      password_confirmation: password
    )
  end
end

# laundry作成
# 各ユーザにつき5つ
laundry_categories = %w[シーツ 枕カバー ぬいぐるみ タオル 毛布 服 カーテン 布団カバー マット ブランケット クッション]
day_numbers = [nil, 3, 5, 7, 9, 12]

User.all.each do |user|
  rand(1..5).times do
    # daysはday_numbersからランダムに選出
    # もしdaysがnullだったら次の洗濯日は10~30日後
    days = day_numbers.sample
    plus_days = days ? days : rand(10..30)

    user.laundries.create!(
      team_id: user.team_id,
      name: "#{user.name}の#{laundry_categories.sample}",
      days: days,
      wash_at: Time.now.to_date + plus_days,
      description: "#{user.name}の#{laundry_categories.sample}の説明文",
      notice: "#{user.name}の#{laundry_categories.sample}の洗濯期限になりました。"
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
