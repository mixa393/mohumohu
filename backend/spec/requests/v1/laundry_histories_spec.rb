require 'rails_helper'

RSpec.describe "LaundryHistoriesAPI", type: :request do

  describe 'GET /api/v1/laundry_histories' do
    subject(:get_laundry_histories) { get "/api/v1/laundry_histories", headers: auth_tokens }
    let(:auth_tokens) { sign_in(users.first) }
    let(:json) { JSON.parse(response.body) }

    context '同じチームの洗濯履歴がある場合' do
      # 同じチームに属するデータを作成
      let!(:team) { FactoryBot.create(:team) }
      let!(:users) { FactoryBot.create_list(:user, 2, team_id: team.id) }
      let!(:laundries) { FactoryBot.create_list(:laundry, 2, team_id: team.id) }
      before :each do
        FactoryBot.create(:laundry_history, user_id: users.first.id, laundry_id: laundries.first.id)
        FactoryBot.create(:laundry_history, user_id: users.last.id, laundry_id: laundries.last.id)
      end

      it '同じチームの履歴が取得できること' do
        subject
        expect(response.status).to eq(200)
        expect(json['data'].length).to eq(2)
      end
    end

    context '違うチームの履歴がある場合' do
      let!(:users) { FactoryBot.create_list(:user, 2) }

      let!(:first_laundry) { FactoryBot.create(:laundry, user_id: users.first.id, team_id: users.first.team_id) }
      let!(:second_laundry) { FactoryBot.create(:laundry, user_id: users.last.id) }

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


  #
  #
  # let!(:team) { FactoryBot.create(:team) }
  # let!(:users) { FactoryBot.create_list(:user, 3, team_id: team.id) }
  # let(:another_team_user){FactoryBot.create(:user)}
  # let!(:laundries) { FactoryBot.create_list(:laundry, 5, team_id: team.id) }
  # let!(:laundry_histories) { [] }
  #
  # # 1人目のユーザーでサインイン
  # let(:auth_tokens) { sign_in(users.first) }
  #
  # before :each do
  #   laundries.each { |laundry|
  #     users.each { |user|
  #       laundry_histories << FactoryBot.create(:laundry_history, user_id: user.id, laundry_id: laundry.id)
  #     }
  #   }
  # end
  #
  #
  # it "GET /api/v1/laundry_histories/:id" do
  #   laundry_id = laundries.sample.id
  #   get "/api/v1/laundry_histories/#{laundry_id}", headers: auth_tokens
  #
  #   expect(response.status).to eq(200)
  #
  #   json = JSON.parse(response.body)
  #
  #   if json["data"].first
  #     expect(json['data'].first["laundry_id"]).to eq(laundry_id)
  #   end
  # end
  #
  # it "POST /api/v1/laundry_histories" do
  #   expect { post "/api/v1/laundry_histories", headers: auth_tokens, params: { laundry_id: laundries.sample.id } }
  #     .to change(LaundryHistory, :count).by(+1)
  #
  #   expect(response.status).to eq(200)
  # end
  #
  # it "DELETE /api/v1/laundry_histories/:id" do
  #   laundry_history = FactoryBot.create(:laundry_history, user_id: users.first.id, laundry_id: laundries.sample.id)
  #   delete "/api/v1/laundry_histories/#{laundry_history.id}", headers: auth_tokens
  #
  #   json = JSON.parse(response.body)
  #   expect(json['data']['deleted_at']).not_to eq(nil)
  #   expect(response.status).to eq(200)
  # end
end