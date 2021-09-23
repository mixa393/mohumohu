require 'rails_helper'

RSpec.describe LaundryHistory, type: :model do

  let(:laundry_history) { FactoryBot.build(:laundry_history) }

  it "user_id,laundry_idがあれば有効" do
    expect(laundry_history).to be_valid
  end
end
