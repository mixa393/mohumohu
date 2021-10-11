require 'rails_helper'

RSpec.describe "sessions API", type: :request do
  subject { get "/api/v1/auth/sessions", headers: auth_tokens }
  let!(:user) { FactoryBot.create(:user) }
  let(:json) { JSON.parse(response.body) }
  let(:auth_tokens) { sign_in(user) }

  it 'ユーザー情報の返却' do
    subject
    expect(response.status).to eq(200)
    expect(json["is_login"]).to eq(true)
    expect(json["data"]["name"]).to eq(user.name)
  end

  context 'remind_atがある場合' do
    it '文字列が入って返却される' do
      subject
      expect(json["data"]["remind_at"]).to eq("09:00")
    end
  end

  context 'remind_atがない場合' do
    let!(:user) { FactoryBot.create(:user,remind_at:nil) }
    it '空の値が返却される' do
      subject
      expect(json["data"]["remind_at"]).to eq(nil)
    end
  end
end

