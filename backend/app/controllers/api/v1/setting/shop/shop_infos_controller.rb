class Api::V1::Setting::Shop::ShopInfosController < ApplicationController
  skip_before_action :verify_authenticity_token

  def show
    @shop_info = ShopInfo.first_or_initialize
    render json: @shop_info
  end

  def create
    @shop_info = ShopInfo.first_or_initialize
    if @shop_info.update(shop_info_params)
      render json: @shop_info, status: :ok
    else
      render json: { errors: @shop_info.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @shop_info = ShopInfo.first_or_initialize
    if @shop_info.update(shop_info_params)
      render json: @shop_info, status: :ok
    else
      render json: { errors: @shop_info.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def shop_info_params
    params.require(:shop_info).permit(
      :shop_name, :phone, :address, :business_hours, 
      :holiday, :tax_mode, :notes
    )
  end
end