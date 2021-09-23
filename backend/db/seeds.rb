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
      password_confirmation: password,
      remind_at: Random.rand(Time.parse("08:00:00")..Time.parse("22:00:00")),
      team_id: team.id
    )
  end
end

# laundry作成
# 各ユーザにつき5つ
laundry_categories = [{ name: "シーツ", image: "sheets" },
                      { name: "枕カバー", image: "pillow" },
                      { name: "ぬいぐるみ", image: "bear" },
                      { name: "タオル", image: "bath-towel" },
                      { name: "服", image: "default" },
                      { name: "カーテン", image: "curtains" },
                      { name: "布団カバー", image: "duvet-cover" },
                      { name: "マット", image: "mat" },
                      { name: "毛布", image: "blanket" },
                      { name: "クッション", image: "cushion" }]

day_numbers = [nil, 3, 5, 7, 9, 12]

User.all.each do |user|
  rand(1..5).times do
    laundry = laundry_categories.sample

    # daysはday_numbersからランダムに選出
    # もしdaysがnullだったらwash_atもnil(自動的に7日後になる)
    days = day_numbers.sample
    wash_at = days ? Time.now.to_date + days : nil

    user.laundries.create!(
      team_id: user.team_id,
      name: "#{user.name}の#{laundry[:name]}",
      days: days,
      wash_at: wash_at,
      description: "#{user.name}の#{laundry[:name]}の説明文",
      notice: "#{user.name}の#{laundry[:name]}の洗濯期限になりました。",
      image: laundry[:image]
    )
  end
end

# laundry_history作成
Laundry.all.each do |laundry|
  # 同じチームに属するユーザーを検索
  users = User.where(team_id: laundry.team_id)

  rand(1..3).times do
    laundry.laundry_histories.create!(
      user_id: users.sample.id,
      laundry_id: laundry.id
    )
  end
end