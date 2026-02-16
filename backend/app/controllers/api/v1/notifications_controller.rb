class Api::V1::NotificationsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    notifications = Notification
      .where(published: true)
      .order(created_at: :desc)
      .page(params[:page])
      .per(params[:per] || 10)

    render json: {
      data: notifications,
      meta: {
        current_page: notifications.current_page,
        total_pages: notifications.total_pages,
        total_count: notifications.total_count,
      },
    }
  end

  def show
    notification = Notification.find(params[:id])
    render json: notification 
  end
end