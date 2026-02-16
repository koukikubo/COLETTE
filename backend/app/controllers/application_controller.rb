class ApplicationController < ActionController::Base
  include ActionController::Cookies
  include ActionController::RequestForgeryProtection
  include ActionController::MimeResponds

  protect_from_forgery with: :null_session
  before_action :set_current_user
  before_action :require_login

  after_action :set_csrf_cookie

  helper_method :current_user

  private

  def set_current_user
    Current.reset
    Current.user = User.find_by(id: session[:user_id]) if session[:user_id]
  end

  def current_user
    Current.user
  end

  def require_login
    return if current_user

    render json: { error: "Unauthorized" }, status: :unauthorized
  end

  def set_csrf_cookie
    return unless protect_against_forgery?

    cookies["CSRF-TOKEN"] = {
      value: form_authenticity_token,
      same_site: :lax,
      secure: Rails.env.production?,
      httponly: false
    }
  end
end
