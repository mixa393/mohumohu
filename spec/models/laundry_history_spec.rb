require 'rails_helper'

RSpec.describe LaundryHistory, type: :model do
  before do
    @team = Team.create(
      name: "test_team"
    )

    @user = User.create(
      name: "test_user",
      email: "email@test.com",
      password: "test_pass",
      team_id: @team.id
    )

    @laundry = Laundry.create(
      name: "laundry_name",
      days: 5,
      team_id: @team.id,
      user_id: @user.id
    )
  end

  it "user_id,laundry_idがあれば有効" do
    laundry_history = LaundryHistory.new(
      user_id: @user.id,
      laundry_id: @laundry.id
    )
    expect(laundry_history).to be_valid
  end
end
