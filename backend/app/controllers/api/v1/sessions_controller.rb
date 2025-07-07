class Api::V1::SessionsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:create]
  
  def create
    user = User.find_by(email: params[:email])

    if user&.valid_password?(params[:password])
      sign_in(user)  # Deviseのログインメソッド。ここでセッションに保存される
      render json: { message: "ログイン成功", user: { id: user.id, email: user.email } }, status: :ok
    else
      render json: { error: "メールアドレスまたはパスワードが違います" }, status: :unauthorized
    end
  end

  def destroy
    sign_out(current_user) # Deviseのログアウトメソッド
    render json: { message: "ログアウトしました" }, status: :ok
  end

  def me
    if current_user
      render json: { id: current_user.id, email: current_user.email }, status: :ok
    else
      render json: { error: "ログインしていません" }, status: :unauthorized
    end
  end
end
