class Api::V1::RegistrationsController < Devise::RegistrationsController
  skip_before_action :authenticate_api_v1_user!, only: [:create]
  respond_to :json

  private

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

end

