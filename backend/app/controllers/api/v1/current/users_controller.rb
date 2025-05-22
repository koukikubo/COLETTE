class Api::V1::Current::UsersController < Api::V1::BaseController
  before_action :authenticate_user!

  def show
    wrapper = CurrentUserWrapper.new(current_user)
    render json: wrapper, serializer: CurrentUserSerializer
  end
end
