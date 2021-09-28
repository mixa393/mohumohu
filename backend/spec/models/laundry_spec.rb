require 'rails_helper'

RSpec.describe Laundry, type: :model do

  let(:laundry) { FactoryBot.build(:laundry) }

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
    expect(laundry).not_to be_valid
  end

  it 'wash_atが空の場合1週間後の値が入る' do
    laundry.wash_at = nil
    expect(laundry).to be_valid
    # wash_atに値を入れるため一旦保存
    laundry.save
    # 保存後のものを名前で検索して7日後の日付と比較
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

  # 昨日の日時のデータを作成するのと相反するので、
  # Laundry.wash_at_checkを一時的に除去しないと動作しない
  describe "self.update_wash_at" do
    subject { Laundry.update_wash_at }
    let(:yesterday) { Time.current.yesterday.to_date }

    context "wash_atが昨日のデータがあった場合" do
      context "daysがある場合" do
        let!(:laundry) { FactoryBot.create(:laundry, wash_at: yesterday, days: rand(1..7)) }
        it 'wash_atがdays日後になる' do
          expect { subject }.to change { Laundry.find(laundry.id).wash_at }.from(yesterday).to(yesterday + laundry.days)
        end
      end

      context "daysがない場合" do
        let!(:laundry) { FactoryBot.create(:laundry, wash_at: yesterday, days: nil) }
        it 'wash_atが30日後になる' do
          expect { subject }.to change { Laundry.find(laundry.id).wash_at }.from(yesterday).to(yesterday + 30)
        end
      end
    end

    context "更新するデータがなかった場合" do
      let!(:laundry) { FactoryBot.create(:laundry) }
      it '空の配列が返却され、レコードの変更は行われない' do
        expect(subject).to eq([])
        expect { subject }.not_to change { Laundry.find(laundry.id) }
      end
    end
  end

  describe "self.update_display_true" do
    subject { Laundry.update_display_true }

    context "is_displayがfalseのデータがある場合" do
      let!(:laundry) { FactoryBot.create(:laundry, is_displayed: false) }
      it 'is_displayedがtrueになる' do
        expect { subject }.to change { Laundry.find(laundry.id).is_displayed }.from(false).to(true)
      end
    end

    context "更新するデータがない場合" do
      let!(:laundry) { FactoryBot.create(:laundry) }
      it '空の配列が返却され、レコードの変更は行われない' do
        expect(subject).to eq([])
        expect { subject }.not_to change { Laundry.find(laundry.id) }
      end
    end
  end
end
