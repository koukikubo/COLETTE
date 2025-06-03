class Api::V1::Auth::RegistrationsController < DeviseTokenAuth::RegistrationsController
  before_action :set_redirect_url, only: [:create]

def create
  super
  # 登録失敗した場合のエラー詳細を出す（重要！）
  if @resource && @resource.errors.any?
  end
end
  private

  def set_redirect_url
      @redirect_url = params[:confirm_success_url]
  end
  
  def sign_up_params
    params.permit(:email, :password, :password_confirmation)
  end
end