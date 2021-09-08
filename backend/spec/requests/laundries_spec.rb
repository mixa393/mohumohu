require 'rails_helper'

RSpec.describe "Laundries", type: :request do
  let(:request_header) { { "X-Requested-With" => "XMLHttpRequest" } }

  # laundries#index
  context "GET /laundries" do
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

    it '特定データの取得' do
      get "/api/v1/laundries", headers: request_header, params: { team_id: team.id }
      expect(response.status).to eq(200)

      json = JSON.parse(response.body)
      expect(json["data"].first["name"]).to eq(laundries.first.name)
    end

    it 'weeklyの取得' do
      get "/api/v1/laundries", headers: request_header, params: { team_id: team.id }
      json = JSON.parse(response.body)
      #
      # # dataまで掘る
      # json["data"].each { |laundry|
      #
      #   # 1つの洗濯物データ中のweekly配列の値を1つ1つチェック
      #   laundry["weekly"].each_with_index { |n, index|
      #
      #     case index
      #
      #       # 当日か洗濯期間が2or3回過ぎた日は 2 が格納されている
      #     when days(laundry), 2 * days(laundry) + 1, 3 * days(laundry) + 2
      #       expect(n).to eq(2)
      #
      #       # 上記の前後の日は 1 が格納されている
      #     when days(laundry) - 1, days(laundry) + 1, 2 * days(laundry), 2 * days(laundry) + 2, 3 * days(laundry) + 1, 3 * days(laundry) + 3
      #       expect(n).to eq(1)
      #
      #       # それ以外の日は 0 が格納されている
      #     else
      #       expect(n).to eq(0)
      #     end
      #   }
      # }

      expect(json["data"].first["weekly"].length).to eq(7)
    end
  end


  # laundries#create
  context "POST /api/v1/laundries" do
    let(:user) { FactoryBot.create(:user) }
    let!(:valid_params) { { name: Faker::String.random(length: 3..12),
                            wash_at: Time.now.to_date + 5,
                            user_id: user.id,
                            team_id: user.team_id } }

    it 'Laundryモデルの数が1つ増える' do
      expect { post '/api/v1/laundries', headers: request_header, params: valid_params }.to change(Laundry, :count).by(+1)
      expect(response.status).to eq(200)
    end
  end


  # laundries#show
  context "GET /api/v1/laundries/:id" do
    let(:laundry) { FactoryBot.create(:laundry) }

    it '特定のデータの取得' do
      get "/api/v1/laundries/#{laundry.id}", headers: request_header
      expect(response.status).to eq(200)

      json = JSON.parse(response.body)
      expect(json['data']['name']).to eq(laundry.name)
    end
  end


  # laundries#update
  context "PUT /api/v1/laundries/:id" do
    let(:user) { FactoryBot.create(:user) }
    let!(:valid_params) { { name: Faker::String.random(length: 3..12),
                            wash_at: Time.now.to_date + 5,
                            user_id: user.id,
                            team_id: user.team_id } }
    let(:laundry) { FactoryBot.create(:laundry) }

    it 'データの更新' do
      put "/api/v1/laundries/#{laundry.id}", headers: request_header, params: valid_params
      expect(response.status).to eq(200)

      json = JSON.parse(response.body)
      expect(json['data']['name']).to eq(valid_params[:name])
    end
  end


  # laundries#destroy
  context "DELETE /api/v1/laundries/:id" do
    let(:laundry) { FactoryBot.create(:laundry) }

    it '論理削除 deleted_atカラムの更新' do
      delete "/api/v1/laundries/#{laundry.id}", headers: request_header
      expect(response.status).to eq(200)

      json = JSON.parse(response.body)
      expect(json['data']['deleted_at']).not_to eq(nil)
    end
  end

end