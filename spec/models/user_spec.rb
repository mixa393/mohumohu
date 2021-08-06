require 'rails_helper'

RSpec.describe User, type: :model do

  let(:team) { FactoryBot.create(:team) }
  let(:user) { FactoryBot.create(:user, team_id: team.id) }

  describe User do
    it "名前、メールアドレス、パスワード、team_idがあれば有効" do
      expect(user).to be_valid
    end

    it "名前が無ければ無効" do
      user.name = nil
      expect(user).not_to be_valid
    end

    it "名前が32文字以上なら無効" do
      user.name = "a" * 32
      expect(user).not_to be_valid
    end

    it "メールアドレスが無ければ無効" do
      user.email = nil
      expect(user).not_to be_valid
    end

    it "メールアドレスが127文字以上なら無効" do
      user.email = "a" * 127
      expect(user).not_to be_valid
    end

    it "メールアドレスがフォーマットに即していなければ無効" do
      user.email = "emailtestcom"
      expect(user).not_to be_valid
    end

    it "パスワードが無ければ無効" do
      user.password = nil
      expect(user).not_to be_valid
    end

    it "パスワードが256文字以上であれば無効" do
      user.password = "a" * 256
      expect(user).not_to be_valid
    end

    it "重複したメールアドレスなら無効" do
      second_user = build(:user, email: user.email, team_id: team.id)
      expect(second_user).not_to be_valid
    end
  end
end
