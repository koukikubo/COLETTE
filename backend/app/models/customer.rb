class Customer < ApplicationRecord
  require "nkf"
  belongs_to :standard_list_masta, optional: true

  scope :by_name, ->(name) {
    return all if name.blank?

    kana = NKF.nkf("-w --katakana", name)

    where(
      "family_name LIKE :q
        OR given_name LIKE :q
        OR family_name_kana LIKE :q
        OR given_name_kana LIKE :q",
      q: "%#{kana}%"
    )
  }

  scope :by_phone, ->(phone, type) {
    return all if phone.blank?

    case type
    when "last4"
      where("RIGHT(phone1, 4) = :p OR RIGHT(phone2, 4) = :p", p: phone)
    when "area"
      where("phone1 LIKE :p OR phone2 LIKE :p", p: "#{phone}%")
    else
      all
    end
  }

  def self.search_advanced(name:, phone:, phone_type:)
    customers = all
    customers = customers.by_name(name)
    customers = customers.by_phone(phone, phone_type)
    customers
  end
end
