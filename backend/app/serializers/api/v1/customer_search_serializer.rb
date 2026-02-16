class Api::V1::CustomerSearchSerializer < ActiveModel::Serializer
  attributes :id, :family_name, :given_name, :phone1, :phone2, :created_at, :birthday
end