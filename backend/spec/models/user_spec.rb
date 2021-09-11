require 'rails_helper'

RSpec.describe User, type: :model do
  let(:user) { FactoryBot.build(:user) }

  it "名前、メールアドレス、パスワード、team_idがあれば有効" do
    expect(user).to be_valid
  end

  describe "ユーザー名" do
    it "無ければ無効" do
      user.name = nil
      expect(user).not_to be_valid
    end

    it "32文字以上なら無効" do
      user.name = "a" * 32
      expect(user).not_to be_valid
    end
  end

  describe "メールアドレス" do
    it "無ければ無効" do
      user.email = nil
      expect(user).not_to be_valid
    end

    it "127文字以上なら無効" do
      user.email = "a" * 127
      expect(user).not_to be_valid
    end

    it "フォーマットに即していなければ無効" do
      user.email = "emailtestcom"
      expect(user).not_to be_valid
    end

    it "重複したメールアドレスなら無効" do
      user.save
      second_user = build(:user, email: user.email)
      expect(second_user).not_to be_valid
    end
  end

  describe "パスワード" do
    it "無ければ無効" do
      user.password = nil
      user.password_confirmation = nil
      expect(user).not_to be_valid
    end

    it "6文字未満であれば無効" do
      user.password = user.password_confirmation = "a" * 5
      expect(user).not_to be_valid
    end

    it "256文字以上であれば無効" do
      user.password = user.password_confirmation = "a" * 256
      expect(user).not_to be_valid
    end

    it "複合パスワードが不一致なら無効" do
      user.password_confirmation = "mismatch"
      expect(user).not_to be_valid
    end
  end

end
