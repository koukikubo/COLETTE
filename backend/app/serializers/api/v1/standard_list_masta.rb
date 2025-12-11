class Api::V1::StandardListMastaSerializer < ActiveModel::Serializer
  attributes :id, :list_code, :name, :enabled, :standard_masta_id
end