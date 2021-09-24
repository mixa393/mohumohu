require 'rails_helper'

RSpec.describe "LaundriesAPI", type: :request do
  let(:user) { FactoryBot.create(:user) }
  let(:auth_tokens) { sign_in(user) }
  let(:json) { JSON.parse(response.body) }

  describe "GET /laundries" do
    subject { get "/api/v1/laundries", headers: auth_tokens }

    context "自分のチームの洗濯物を取得する場合" do
      let!(:laundries) { FactoryBot.create_list(:laundry, 5, team_id: user.team_id) }

      it '特定チームのデータの取得' do
        subject
        expect(response.status).to eq(200)
        expect(json["data"].first["name"]).to eq(laundries.first.name)
      end

      it 'weeklyの取得' do
        subject

        # dataまで掘る
        json["data"].each { |laundry|
          # 1つの洗濯物データ中のweekly配列の値を1つ1つチェック
          laundry["weekly"].each { |n|
            # 2か1か0が格納されていることをチェック
            expect(n).to eq(2) | eq(1) | eq(0)
          }
        }

        # weeklyの要素が7つであることをチェック
        expect(json["data"].first["weekly"].length).to eq(7)
      end
    end

    context "異なるチームの洗濯物がある場合" do
      let!(:laundries) { FactoryBot.create_list(:laundry, 5) }
      it '洗濯物は取得されないこと' do
        subject
        expect(response.status).to eq(200)
        expect(json["data"].length).to eq(0)
      end
    end

  end

  describe "POST /api/v1/laundries" do
    subject { post '/api/v1/laundries', headers: auth_tokens, params: valid_params }
    let!(:valid_params) { { name: "#{user.name}の洗濯物",
                            wash_at: Time.now.to_date + 5 } }

    it "新しいデータの作成" do
      expect { subject }.to change(Laundry, :count).by(+1)
      expect(response.status).to eq(200)
    end
  end

  describe "GET /api/v1/laundries/:id" do
    subject { get "/api/v1/laundries/#{laundry.id}", headers: auth_tokens }

    context "自分のチームのデータを指定した場合" do
      let!(:laundry) { FactoryBot.create(:laundry, team_id: user.team_id) }
      it "特定データの取得" do
        subject
        expect(json['data']['name']).to eq(laundry.name)
        expect(response.status).to eq(200)
      end
    end

    context "異なるチームの洗濯物ID 又は 不正なIDを指定した場合" do
      let!(:laundry) { FactoryBot.create(:laundry) }
      it 'データが取得されないこと' do
        subject
        expect(json['message']).to include("失敗")
        expect(response.status).to eq(200)
      end
    end
  end

  describe "PUT /api/v1/laundries/:id" do
    subject { put "/api/v1/laundries/#{laundry.id}", headers: auth_tokens, params: valid_params }
    let(:valid_params) { { name: "#{user.name}の洗濯物",
                           wash_at: Time.now.to_date + 5 } }

    context "自分のチームの洗濯物を指定した場合" do
      let!(:laundry) { FactoryBot.create(:laundry, team_id: user.team_id) }
      it "データが変更される" do
        subject
        expect(response.status).to eq(200)
        expect(json['data']['name']).to eq(valid_params[:name])
      end
    end

    context "異なるチームの洗濯物ID 又は 不正なIDを指定した場合" do
      let!(:laundry) { FactoryBot.create(:laundry) }
      it 'データが変更されないこと' do
        subject
        expect(json['message']).to include("失敗")
        expect(response.status).to eq(200)
      end
    end
  end

  describe "DELETE /api/v1/laundries/:id" do
    subject { delete "/api/v1/laundries/#{laundry.id}", headers: auth_tokens }

    context "自分のチームの洗濯物を指定した場合" do
      let!(:laundry) { FactoryBot.create(:laundry, team_id: user.team_id) }
      it "論理削除されること" do
        subject
        expect(json['data']['deleted_at']).not_to eq(nil)
        expect(response.status).to eq(200)
      end
    end

    context "異なるチームの洗濯物ID 又は 不正なIDを指定した場合" do
      let!(:laundry) { FactoryBot.create(:laundry) }
      it "論理削除されないこと" do
        subject
        expect(json['message']).to include("失敗")
        expect(response.status).to eq(200)
      end
    end
  end

  describe "GET /laundries/list" do
    subject { get "/api/v1/laundries/list", headers: auth_tokens }

    context "is_displayedがtrueの場合" do
      context "wash_at3日前〜当日の場合" do
        let(:limit) { rand(0...3) }
        let!(:laundry) { FactoryBot.create(:laundry, wash_at: Time.now.to_date + limit, team_id: user.team_id) }
        it "limit_daysと期間が同一" do
          subject
          expect(json['data'].first["limit_days"]).to eq(limit)
          expect(response.status).to eq(200)
        end
      end

      context "wash_atが4日後の場合" do
        let!(:laundry) { FactoryBot.create(:laundry, wash_at: Time.now.to_date + 4, team_id: user.team_id) }
        it "データが取得されない" do
          subject
          expect(json['data'].length).to eq(0)
          expect(response.status).to eq(200)
        end
      end
    end

    context "is_displayedがfalseの場合" do
      let(:limit) { rand(0...3) }
      let!(:laundry) { FactoryBot.create(:laundry, wash_at: Time.now.to_date + limit, team_id: user.team_id,
                                         is_displayed: false) }
      it "3日以内でもデータが取得できない" do
        subject
        expect(json['data'].length).to eq(0)
        expect(response.status).to eq(200)
      end
    end
  end

  describe "PUT /api/v1/laundries/washed" do
    subject { put "/api/v1/laundries/washed", headers: auth_tokens, params: { id: laundry.id } }

    context "正しい洗濯物IDを指定した場合" do
      let!(:laundry) { FactoryBot.create(:laundry, team_id: user.team_id) }
      it 'wash_atの更新' do
        expect { subject }.to change { Laundry.find(laundry.id).wash_at }
                                .from(laundry.wash_at)
                                .to(Time.now.to_date + laundry[:days])
        expect(response.status).to eq(200)
        updated_wash_at = (Time.now.to_date + laundry[:days]).strftime("%m月%d日")
        expect(json['data']).to eq(updated_wash_at)
      end

      it 'is_displayedをfalseに更新' do
        expect { subject }.to change { Laundry.find(laundry.id).is_displayed }.from(true).to(false)
        expect(response.status).to eq(200)
      end
    end

    context "異なるチームの洗濯物ID 又は 不正なIDを指定した場合" do
      let!(:laundry) { FactoryBot.create(:laundry) }
      it 'データが変更されないこと' do
        expect { subject }.not_to change { laundry }
        expect(json['message']).to include("失敗")
        expect(response.status).to eq(200)
      end
    end
  end

  describe "PUT /api/v1/laundries/un_washed" do
    subject { put "/api/v1/laundries/un_washed", headers: auth_tokens, params: { id: laundry.id } }

    context "正しい洗濯物IDを指定した場合" do
      let!(:laundry) { FactoryBot.create(:laundry, team_id: user.team_id) }
      it 'is_displayedをfalseに更新' do
        expect { subject }.to change { Laundry.find(laundry.id).is_displayed }.from(true).to(false)
        expect(response.status).to eq(200)
      end
    end

    context "異なるチームの洗濯物ID 又は 不正なIDを指定した場合" do
      let!(:laundry) { FactoryBot.create(:laundry) }
      it 'データが変更されないこと' do
        expect { subject }.not_to change { laundry.is_displayed }
        expect(response.status).to eq(200)
      end
    end
  end
end