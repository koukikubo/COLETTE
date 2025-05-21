class CurrentUserSerializer < ActiveModel::Serializer
  attributes :id, :email, :created_at, :updated_at

  # attribute :staff_member do
  #   StaffMemberSerializer.new(object.staff_member)
  # end

  def id
    object.id
  end

  def email
    object.email
  end

  def created_at
    object.created_at
  end

  def updated_at
    object.updated_at
  end

  # def staff_member
  #   # staff_memberがnilの可能性があるため防御的に処理
  #   return nil unless object.staff_member.present?

  #   # JSONとして返すため、シリアライザーで包み、attributesで明示的にハッシュ形式で返す
  #   StaffMemberSerializer.new(object.staff_member).as_json
  # end
end
