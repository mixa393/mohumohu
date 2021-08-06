require 'rails_helper'

RSpec.describe LaundryHistory, type: :model do

  let(:team) { FactoryBot.create(:team) }
  let(:user) { FactoryBot.create(:user, team_id: team.id) }
  let(:laundry) { FactoryBot.create(:laundry, team_id: team.id, user_id: user.id) }
  let(:laundry_history) { FactoryBot.create(:laundry_history, user_id: user.id, laundry_id: laundry.id) }

  it "user_id,laundry_idがあれば有効" do
    expect(laundry_history).to be_valid
  end
end
