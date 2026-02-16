class Api::V1::StandardMastaSerializer < ActiveModel::Serializer
  attributes :id, :base_code, :name, :enabled, :remarks
end

