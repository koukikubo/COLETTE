class Api::V1::SessionsController < Devise::SessionsController
  before_action :configure_sign_in_params, only: [:create]

  def create
  user = User.find_by(email: params[:user][:email])

  if user&.valid_password?(params[:user][:password])
    sign_in(user)
    render json: { message: "ログイン成功", user: Api::V1::UserSerializer.new(user) }, status: :ok
  else
    render json: { error: "メールアドレスまたはパスワードが正しくありません" }, status: :unauthorized
  end
  end

  def destroy
    if current_user
      sign_out(current_user)
      render json: { message: "ログアウトしました" }, status: :ok
    else
      render json: { error: "ログインしていません" }, status: :unauthorized
    end
  end

  protected

  def configure_sign_in_params
    devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  end
end