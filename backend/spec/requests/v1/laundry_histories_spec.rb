require 'rails_helper'

RSpec.describe "LaundryHistoriesAPI", type: :request do

  describe 'GET /api/v1/laundry_histories' do
    subject { get "/api/v1/laundry_histories", headers: auth_tokens }
    let(:auth_tokens) { sign_in(users.first) }
    let(:json) { JSON.parse(response.body) }

    context '同じチームの履歴がある場合' do
      # 同じチームに属するデータを作成
      let(:team) { FactoryBot.create(:team) }
      let(:users) { FactoryBot.create_list(:user, 2, team_id: team.id) }
      let(:laundries) { FactoryBot.create_list(:laundry, 2, team_id: team.id) }
      before :each do
        FactoryBot.create(:laundry_history, user_id: users.first.id, laundry_id: laundries.first.id)
        FactoryBot.create(:laundry_history, user_id: users.last.id, laundry_id: laundries.last.id)
      end

      it '同じチームの履歴は全て取得できること' do
        subject
        expect(response.status).to eq(200)
        expect(json['data'].length).to eq(2)
      end
    end

    context '違うチームの履歴がある場合' do
      let(:users) { FactoryBot.create_list(:user, 2) }
      let(:first_laundry) { FactoryBot.create(:laundry, user_id: users.first.id, team_id: users.first.team_id) }
      let(:second_laundry) { FactoryBot.create(:laundry, user_id: users.last.id) }
      before :each do
        FactoryBot.create(:laundry_history, user_id: users.first.id, laundry_id: first_laundry.id)
        FactoryBot.create(:laundry_history, user_id: users.last.id, laundry_id: second_laundry.id)
      end

      it '違うチームの履歴は取得できないこと' do
        subject
        expect(response.status).to eq(200)
        expect(json['data'].length).to eq(1)
      end
    end
  end

  describe "GET /api/v1/laundry_histories/:id" do
    subject{ get "/api/v1/laundry_histories/#{laundry.id}", headers: auth_tokens }
    let(:json) { JSON.parse(response.body) }

    context "同じチームの履歴を指定した場合" do
      let(:team) { FactoryBot.create(:team) }
      let(:users) { FactoryBot.create_list(:user, 2, team_id: team.id) }
      let(:laundry) { FactoryBot.create(:laundry, user_id: users.second.id, team_id: team.id) }
      before :each do
        FactoryBot.create(:laundry_history, user_id: users.first.id, laundry_id: laundry.id)
        FactoryBot.create(:laundry_history, user_id: users.last.id, laundry_id: laundry.id)
      end
      let(:auth_tokens) { sign_in(users.first) }

      it "履歴を取得できること" do
        subject
        expect(response.status).to eq(200)
        expect(json['data'].length).to eq(2)
      end
    end

    context "違うチームの履歴を指定した場合" do
      let(:user) { FactoryBot.create(:user) }
      let(:auth_tokens) { sign_in(user) }
      # 異なるチームに属する洗濯物
      let(:laundry) { FactoryBot.create(:laundry) }
      before :each do
        FactoryBot.create(:laundry_history, laundry_id: laundry.id)
      end

      it '履歴を取得できないこと' do
        subject
        expect(response.status).to eq(200)
        expect(json['data']).to eq([])
      end
    end
  end

  describe "POST /api/v1/laundry_histories" do
    subject { post "/api/v1/laundry_histories", headers: auth_tokens, params: { laundry_id: laundry.id } }
    let(:user) { FactoryBot.create(:user) }
    let(:auth_tokens) { sign_in(user) }

    context "自分のチームの洗濯物IDを指定した場合" do
      let(:laundry) { FactoryBot.create(:laundry, team_id: user.team_id) }
      it "履歴が作成できること" do
        expect { subject }.to change(LaundryHistory, :count).by(+1)
        expect(response.status).to eq(200)
      end
    end

    context "異なるチームの洗濯物IDを指定した場合や、洗濯物IDが間違っている場合" do
      let(:laundry) { FactoryBot.create(:laundry) }
      it '履歴が作成できないこと' do
        subject
        json = JSON.parse(response.body)
        expect(json["message"]).to include("失敗")
      end
    end
  end

  describe "DELETE /api/v1/laundry_histories/:id" do
    subject { delete "/api/v1/laundry_histories/#{laundry_history.id}", headers: auth_tokens }
    let(:team) { FactoryBot.create(:team) }
    let(:users) { FactoryBot.create_list(:user, 2, team_id: team.id) }
    let(:laundry) { FactoryBot.create(:laundry, team_id: team.id) }
    let(:auth_tokens) { sign_in(users.first) }
    let(:json) { JSON.parse(response.body) }

    context "自分の作成した履歴である場合" do
      let!(:laundry_history) { FactoryBot.create(:laundry_history, user_id: users.first.id, laundry_id: laundry.id) }

      it "deleted_atが更新されること" do
        subject
        expect(response.status).to eq(200)
        expect(json['data']['deleted_at']).not_to eq(nil)
      end
    end

    context "自分の作成した履歴でない場合" do
      let!(:laundry_history) { FactoryBot.create(:laundry_history, user_id: users.last.id, laundry_id: laundry.id) }

      it '削除できないこと' do
        subject
        expect(response.status).to eq(200)
        expect(json["message"]).to include("履歴がありません")
      end
    end
  end
end