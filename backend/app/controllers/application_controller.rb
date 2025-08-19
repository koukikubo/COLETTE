class ApplicationController < ActionController::Base
  include Devise::Controllers::Helpers
  include ActionController::RequestForgeryProtection
  include ActionController::Cookies
  include ActionController::MimeResponds
  helper_method :current_user
  protect_from_forgery with: :exception
  skip_before_action :verify_authenticity_token, if: :json_request?  # ✅ 条件付きで除外

  before_action :authenticate_api_v1_user!, unless: :devise_controller?

  private

  def json_request?
    request.format.json?
  end
end