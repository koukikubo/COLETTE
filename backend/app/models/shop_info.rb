class ShopInfo < ApplicationRecord
  validates :shop_name, presence: true
  validates :tax_mode, inclusion: { in: ["内税", "外税"] }
end