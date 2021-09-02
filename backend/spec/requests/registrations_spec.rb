require 'rails_helper'

RSpec.describe "Registrations", type: :request do
  describe "GET /signup" do
    it "returns http success" do
      get "/registrations/signup"
      expect(response).to have_http_status(:success)
    end
  end

end
