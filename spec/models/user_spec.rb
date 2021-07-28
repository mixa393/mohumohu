require 'rails_helper'

RSpec.describe User, type: :model do

  before do
    @team = Team.create(
      name: "testteam"
    )
  end

  describe User do
    it "名前、メールアドレス、パスワード、team_idがあれば有効" do
      user = User.new(
        name: "test",
        email: "email@test.com",
        password: "testpass",
        team_id: @team.id
      )
      expect(user).to be_valid
    end

    it "名前が無ければ無効" do
      user = User.new(
        name: nil,
        email: "email@test.com",
        password: "testpass",
        team_id: @team.id
      )
      expect(user).not_to be_valid
    end

    it "名前が32文字以上なら無効" do
      user = User.new(
        name: "a" * 32,
        email: "email@test.com",
        password: "testpass",
        team_id: @team.id
      )
      expect(user).not_to be_valid
    end

    it "メールアドレスが無ければ無効" do
      user = User.new(
        name: "test",
        email: nil,
        password: "testpass",
        team_id: @team.id
      )
      expect(user).not_to be_valid
    end

    it "メールアドレスが127文字以上なら無効" do
      user = User.new(
        name: "test",
        email: "a" * 127,
        password: "testpass",
        team_id: @team.id
      )
      expect(user).not_to be_valid
    end

    it "メールアドレスがフォーマットに即していなければ無効" do

    end

    it "パスワードが無ければ無効" do
      user = User.new(
        name: "test",
        email: "email@test.com",
        password: nil,
        team_id: @team.id
      )
      expect(user).not_to be_valid
    end

    it "パスワードが256文字以上であれば無効" do
      user = User.new(
        name: "test",
        email: "email@test.com",
        password: "a" * 256,
        team_id: @team.id
      )
      expect(user).not_to be_valid
    end

    it "重複したメールアドレスなら無効" do
      User.create(
        name: "first_user",
        email: "email@test.com",
        password: "first_user_pass",
        team_id: @team.id
      )

      second_user = User.new(
        name: "second_user",
        email: "email@test.com",
        password: "second_user_pass",
        team_id: @team.id
      )
      expect(second_user).not_to be_valid
    end
  end
end
