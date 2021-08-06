require 'rails_helper'

RSpec.describe Laundry, type: :model do

  let(:team) { FactoryBot.create(:team) }
  let(:user) { FactoryBot.create(:user, team_id: team.id) }
  let(:laundry) { FactoryBot.create(:laundry, team_id: team.id, user_id: user.id) }

  describe Laundry do
    it "名前、日数、team_id、user_idがあれば有効" do
      expect(laundry).to be_valid
    end

    it "名前が無ければ無効" do
      laundry.name = nil
      expect(laundry).not_to be_valid
    end

    it "名前が128文字以上なら無効" do
      laundry.name = "a" * 128
      expect(laundry).not_to be_valid
    end

    it "日数が無ければ無効" do
      laundry.days = nil
      expect(laundry).not_to be_valid
    end

    it "日数が数字以外なら無効" do
      laundry.days = "a"
      expect(laundry).not_to be_valid
    end

    it "説明が256文字以上であれば無効" do
      laundry.description = "a" * 256
      expect(laundry).not_to be_valid
    end

  end
end
