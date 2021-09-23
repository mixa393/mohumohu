require 'rails_helper'

RSpec.describe Laundry, type: :model do

  let(:laundry) { FactoryBot.create(:laundry) }

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

  it "wash_atが現在より前の日付なら無効" do
    laundry.wash_at = Time.now.to_date - 3
    debugger
    expect(laundry).not_to be_valid
  end

  it 'wash_atが空の場合1週間後の値が入る' do
    laundry.wash_at = nil
    expect(laundry).to be_valid
    expect(Laundry.find(laundry.id).wash_at).to eq(Time.now.to_date + 7)
  end

  it "日数が数字以外なら無効" do
    laundry.days = "a"
    expect(laundry).not_to be_valid
  end

  it "説明が256文字以上であれば無効" do
    laundry.description = "a" * 256
    expect(laundry).not_to be_valid
  end

  it "imageが128文字以上であれば無効" do
    laundry.image = "a" * 128
    expect(laundry).not_to be_valid
  end

end
