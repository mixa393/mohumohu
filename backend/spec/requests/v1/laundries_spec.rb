require 'rails_helper'

RSpec.describe "Laundries", type: :request do

  # laundries#index
  context "GET /laundries" do
    # サインイン
    let(:user) { FactoryBot.create(:user) }
    let(:auth_tokens) { sign_in(user) }

    let!(:team) { FactoryBot.create(:team) }
    let!(:laundry_days) { {} }
    let!(:laundries) { [] }

    before do
      # 洗濯期間daysを1〜5でデータ作成
      (1..5).each { |n|
        laundry = FactoryBot.create(:laundry, wash_at: Time.now.to_date + n, days: n + 1, team_id: team.id)
        laundries << laundry

        # 洗濯物のidをキー、期間をvalueとして作成する配列
        # { id:期間, id:期間, id:期間, ...}
        laundry_days.store(laundry.id, n)
      }

      # 洗濯物のidを与えるとその洗濯期間を返却する
      # @param [Integer] laundry_id
      # @return [Integer] days
      def days(laundry)
        laundry_days[laundry["id"]]
      end
    end

    it '特定チームのデータの取得' do
      get "/api/v1/laundries", headers: auth_tokens, params: { team_id: team.id }
      expect(response.status).to eq(200)

      json = JSON.parse(response.body)
      expect(json["data"].first["name"]).to eq(laundries.first.name)
    end

    it 'weeklyの取得' do
      get "/api/v1/laundries", headers: auth_tokens, params: { team_id: team.id }
      json = JSON.parse(response.body)

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

  # laundries#create
  context "laundry#index以外" do
    # サインイン
    let(:user) { FactoryBot.create(:user) }
    let(:auth_tokens) { sign_in(user) }

    let(:laundry) { FactoryBot.create(:laundry) }
    let!(:valid_params) { { name: Faker::String.random(length: 3..12),
                            wash_at: Time.now.to_date + 5,
                            user_id: user.id,
                            team_id: user.team_id } }

    # laundries#create
    it "POST /api/v1/laundries" do
      expect { post '/api/v1/laundries', headers: auth_tokens, params: valid_params }.to change(Laundry, :count).by(+1)
      expect(response.status).to eq(200)
    end

    # laundries#show
    it "GET /api/v1/laundries/:id" do
      get "/api/v1/laundries/#{laundry.id}", headers: auth_tokens
      json = JSON.parse(response.body)

      expect(json['data']['name']).to eq(laundry.name)
      expect(response.status).to eq(200)
    end

    # laundries#update
    it "PUT /api/v1/laundries/:id" do
      put "/api/v1/laundries/#{laundry.id}", headers: auth_tokens, params: valid_params
      expect(response.status).to eq(200)

      json = JSON.parse(response.body)
      expect(json['data']['name']).to eq(valid_params[:name])
    end

    # laundries#destroy
    it "DELETE /api/v1/laundries/:id" do
      delete "/api/v1/laundries/#{laundry.id}", headers: auth_tokens
      json = JSON.parse(response.body)
      expect(json['data']['deleted_at']).not_to eq(nil)
      expect(response.status).to eq(200)
    end

  end
end