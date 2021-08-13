require 'rails_helper'

RSpec.describe Team, type: :model do

  let(:team) { FactoryBot.create(:team) }

  it "名前があれば有効" do
    expect(team).to be_valid
  end

  it "名前が無ければ無効" do
    team.name = nil
    expect(team).not_to be_valid
  end

  it "名前が32文字以上なら無効" do
    team.name = "a" * 32
    expect(team).not_to be_valid
  end
end
