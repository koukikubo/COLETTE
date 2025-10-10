class Customer < ApplicationRecord
  belongs_to :customer_rank, optional: true
  belongs_to :mypage
end
