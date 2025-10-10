class Api::V1::RegistrationsController < ApplicationController
  skip_before_action :require_login, only: [:create]
  skip_before_action :verify_authenticity_token, only: [:create]

  def create
    user = User.new(user_params)
    if user.save
      session[:user_id] = user.id
      Current.user = user
      render json: { message: "Signup successful", user: Api::V1::UserSerializer.new(user).serializable_hash }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end
end
