require 'rails_helper'

RSpec.describe Laundry, type: :model do

  before do
    @team = Team.create(
      name: "test_team"
    )

    @user = User.create(
      name: "test_name",
      email: "email@test.com",
      password: "test_pass",
      team_id: @team.id
    )
  end

  describe Laundry do
    it "名前、日数、team_id、user_idがあれば有効" do
      laundry = Laundry.new(
        name: "laundry_name",
        days: 5,
        team_id: @team.id,
        user_id: @user.id
      )
      expect(laundry).to be_valid
    end

    it "名前が無ければ無効" do
      laundry = Laundry.new(
        name: nil,
        days: 5,
        team_id: @team.id,
        user_id: @user.id
      )
      expect(laundry).not_to be_valid
    end

    it "名前が128文字以上なら無効" do
      laundry = Laundry.new(
        name: "a"*128,
        days: 5,
        team_id: @team.id,
        user_id: @user.id
      )
      expect(laundry).not_to be_valid
    end

    it "日数が無ければ無効" do
      laundry = Laundry.new(
        name: "laundry_name",
        days: nil,
        team_id: @team.id,
        user_id: @user.id
      )
      expect(laundry).not_to be_valid
    end

    it "日数が数字以外なら無効" do
      laundry = Laundry.new(
        name: "laundry_name",
        days: "a",
        team_id: @team.id,
        user_id: @user.id
      )
      expect(laundry).not_to be_valid
    end

    it "説明が256文字以上であれば無効" do
      laundry = Laundry.new(
        name: "laundry_name",
        days: 5,
        description: "a"*256,
        team_id: @team.id,
        user_id: @user.id
      )
      expect(laundry).not_to be_valid
    end

  end
end
