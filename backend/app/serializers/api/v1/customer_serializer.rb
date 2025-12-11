class CustomerSerializer < ActiveModel::Serializer
  attributes  :id,
              :family_name,
              :family_name_kana,
              :given_name,
              :given_name_kana,
              :phone1,
              :phone2,
              :email,
              :memo,
              :birthday,
              :created_at,
              :updated_at

end
