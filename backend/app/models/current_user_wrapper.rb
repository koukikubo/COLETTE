class CurrentUserWrapper
  include ActiveModel::Model
  attr_reader :user, :staff_member
  include ActiveModel::Serialization 

  def initialize(user)
    @user = user
    @staff_member = user.staff_member
  end
end