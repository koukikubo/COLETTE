class StaffMemberSerializer < ActiveModel::Serializer
  attributes :id, :family_name, :family_name_kana, :given_name,
             :given_name_kana, :nick_name, :position, :birthday,
             :made_in, :phone

  include Rails.application.routes.url_helpers

  attribute :image_url do
    object.image.attached? ? rails_blob_url(object.image, only_path: true) : nil
  end
end
