require 'rails_helper'

RSpec.describe Team, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"

  it "名前があれば有効" do
    team = Team.new(
      name: "testteam"
    )
    expect(team).to be_valid
  end

  it "名前が無ければ無効" do
    team = Team.new(
      name: nil
    )
    expect(team).not_to be_valid
  end

  it "名前が32文字以上なら無効" do
    team = Team.new(
      name: "a"*32
    )
    expect(team).not_to be_valid
  end
end
