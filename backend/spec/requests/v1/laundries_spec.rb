require 'rails_helper'

RSpec.describe "LaundriesAPI", type: :request do

  describe "GET /laundries" do
    subject { get "/api/v1/laundries", headers: auth_tokens }
    let(:user) { FactoryBot.create(:user) }
    let(:auth_tokens) { sign_in(user) }
    let(:json) { JSON.parse(response.body) }

    context "自分のチームの洗濯物を取得する場合" do
      let!(:laundries) { FactoryBot.create_list(:laundry,5,team_id: user.team_id) }

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
      let!(:laundries) { FactoryBot.create_list(:laundry,5) }
      it '洗濯物は取得されないこと' do
        subject
        expect(response.status).to eq(200)
        expect(json["data"].length).to eq(0)
      end
    end

  end

  describe "GET /laundries/list" do
    let(:team) { FactoryBot.create(:team) }
    let(:user) { FactoryBot.create(:user, team_id: team.id) }
    let(:auth_tokens) { sign_in(user) }
    let(:json) { JSON.parse(response.body) }

    context "wash_at当日の場合" do
      let!(:laundry) { FactoryBot.create(:laundry, wash_at: Time.now().to_date, team_id: team.id) }

      it "limit_daysが0" do
        get "/api/v1/laundries/list", headers: auth_tokens
        expect(json['data'].first["limit_days"]).to eq(0)
        expect(response.status).to eq(200)
      end
    end

    context "wash_atが3日後の場合" do
      let!(:laundry) { FactoryBot.create(:laundry, wash_at: Time.now().to_date + 3, team_id: team.id) }

      it "limit_daysが3" do
        get "/api/v1/laundries/list", headers: auth_tokens
        expect(json['data'].first["limit_days"]).to eq(3)
        expect(response.status).to eq(200)
      end
    end

    context "wash_atが4日後の場合" do
      let!(:laundry) { FactoryBot.create(:laundry, wash_at: Time.now().to_date + 4, team_id: team.id) }

      it "データが取得されない" do
        get "/api/v1/laundries/list", headers: auth_tokens
        expect(json['data'].length).to eq(0)
        expect(response.status).to eq(200)
      end
    end
  end

  describe "POST /api/v1/laundries" do
    let(:user) { FactoryBot.create(:user) }
    let(:auth_tokens) { sign_in(user) }
    let!(:valid_params) { { name: "#{user.name}の洗濯物",
                            wash_at: Time.now.to_date + 5 } }
    let(:json) { JSON.parse(response.body) }

    it "新しいデータの作成" do
      expect { post '/api/v1/laundries', headers: auth_tokens, params: valid_params }.to change(Laundry, :count).by(+1)
      expect(response.status).to eq(200)
    end

    it 'should ' do

    end
  end

  describe "GET /api/v1/laundries/:id" do
    subject { get "/api/v1/laundries/#{laundry.id}", headers: auth_tokens }
    let(:user) { FactoryBot.create(:user) }
    let(:auth_tokens) { sign_in(user) }
    let(:json) { JSON.parse(response.body) }

    context "自分のチームのデータを指定した場合" do
      let!(:laundry) { FactoryBot.create(:laundry, team_id: user.team_id) }
      it "特定データの取得" do
        subject
        expect(json['data']['name']).to eq(laundry.name)
        expect(response.status).to eq(200)
      end
    end

    context "洗濯物IDが不正の場合" do
      let!(:laundry) { FactoryBot.create(:laundry) }
      it 'データが取得されないこと' do
        subject
        expect(json['message']).to include("失敗")
        expect(response.status).to eq(200)
      end
    end
  end

  let(:user) { FactoryBot.create(:user) }
  let(:auth_tokens) { sign_in(user) }

  let!(:laundry) { FactoryBot.create(:laundry) }
  let!(:valid_params) { { name: "#{user.name}の洗濯物",
                          wash_at: Time.now.to_date + 5 } }
  let(:json) { JSON.parse(response.body) }

  # laundries#update
  it "PUT /api/v1/laundries/:id" do
    put "/api/v1/laundries/#{laundry.id}", headers: auth_tokens, params: valid_params
    expect(response.status).to eq(200)
    expect(json['data']['name']).to eq(valid_params[:name])
  end

  # laundries#destroy
  it "DELETE /api/v1/laundries/:id" do
    delete "/api/v1/laundries/#{laundry.id}", headers: auth_tokens
    expect(json['data']['deleted_at']).not_to eq(nil)
    expect(response.status).to eq(200)
  end

end