class LaundryHistory < ApplicationRecord
  belongs_to :user
  belongs_to :laundry
end