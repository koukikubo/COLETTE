class Api::V1::Admin::UsersController < ApplicationController
  def index
    users = User.order(:id)
    render json: users
  end

  def show
    render json: User.find(params[:id])
  end

  def create
    user = User.new(user_params)
    user.save!
    render json: user
  end

  def update
    user = User.find(params[:id])
    user.update!(user_params)
    render json: user
  end

  def destroy
    User.find(params[:id]).destroy!
    head :no_content
  end

  private

  def user_params
    params.require(:user).permit(:email, :password, :role, :start_on, :end_on, :suspended)
  end

end
