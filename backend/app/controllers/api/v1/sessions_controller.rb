class Api::V1::SessionsController < Devise::SessionsController
  before_action :configure_sign_in_params, only: [:create]

  # POST /resource/sign_in
  def create
    user = User.find_by(email: params[:user][:email])

    if user&.valid_password?(params[:user][:password])
      sign_in(user)
      render json: { message: "ログイン成功", user: user }, status: :ok
    else
      render json: { error: "メールアドレスまたはパスワードが正しくありません" }, status: :unauthorized
    end
  end

  # DELETE /resource/sign_out
  def destroy
    if current_user
      sign_out(current_user)  # Deviseでログイン状態を解除（Cookie削除含む）
      render json: { message: "ログアウトしました" }, status: :ok
    else
      render json: { error: "ログインしていません" }, status: :unauthorized
    end
  end

  protected

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_in_params
    devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  end
end
