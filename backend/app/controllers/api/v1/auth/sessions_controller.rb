class Api::V1::Auth::SessionsController < ApplicationController
  skip_before_action :require_login, only: :create
  skip_before_action :verify_authenticity_token, only: [:create, :destroy]

  def create
    user = User.find_by(email: params.dig(:user, :email))

    if user&.authenticate(params.dig(:user, :password))
      session[:user_id] = user.id
      Current.user = user
      render json: { message: "ログイン成功", user: Api::V1::UserSerializer.new(user).serializable_hash }, status: :ok
    else
      render json: { error: "メールアドレスまたはパスワードが正しくありません" }, status: :unauthorized
    end
  end

  def show
    if current_user
      render json: { user: Api::V1::UserSerializer.new(current_user).serializable_hash }, status: :ok
    else
      render json: { user: nil }, status: :unauthorized
    end
  end

  def destroy
    if current_user
      reset_session
      Current.reset
      render json: { message: "ログアウトしました" }, status: :ok
    else
      render json: { error: "ログインしていません" }, status: :unauthorized
    end
  end
end
