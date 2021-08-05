require 'rails_helper'

RSpec.describe LaundryHistory, type: :model do
  before do
    @team = create(:team)
    @user = create(:user, team_id: @team.id)
    @laundry = create(:laundry, team_id: @team.id, user_id: @user.id)
    @laundry_history = create(:laundry_history, user_id: @user.id, laundry_id: @laundry.id)
  end

  it "user_id,laundry_idがあれば有効" do
    expect(@laundry_history).to be_valid
  end
end
