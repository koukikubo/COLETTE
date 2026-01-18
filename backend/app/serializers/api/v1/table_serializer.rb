class Api::V1::TableSerializer < ActiveModel::Serializer
  attributes :id, :code, :name, :seat_type, :capacity
end