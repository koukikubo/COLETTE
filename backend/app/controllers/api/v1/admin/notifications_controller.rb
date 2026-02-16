class Api::V1::Admin::NotificationsController < Api::V1::Admin::BaseController
    skip_before_action :verify_authenticity_token

  def index
    notifications = Notification.order(created_at: :desc)
    render json: notifications
  end

  def new
  end

  def create
  end

  def edit
  end

  def update
  end

  def destroy
  end
end
