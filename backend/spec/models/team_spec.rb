require 'rails_helper'

RSpec.describe Team, type: :model do

  let(:team) { FactoryBot.build(:team) }

  it "名前、location_idがあれば有効" do
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

  it "location_idが無ければ無効" do
    team.location_id = nil
    expect(team).not_to be_valid
  end

  it "location_idが7文字以上なら無効" do
    team.location_id = 1111111
    expect(team).not_to be_valid
  end

  it "location_idが数字以外なら無効" do
    team.location_id = "test"
    expect(team).not_to be_valid
  end
end
