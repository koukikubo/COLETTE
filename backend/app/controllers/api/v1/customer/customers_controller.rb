class Api::V1::Customer::CustomersController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_customer, only: [:show, :update, :destroy]

  def index
    customers = Customer.all
    render json: customers
  end

  def show
    render json: @customer
  end

  def create
    customer = Customer.new(customer_params)
    if customer.save
      render json: customer, status: :created
    else
      render json: { errors: customer.errors.full_messages }, status: :unprocessable_entity
    end
  end



  def update
    if @customer.update(customer_params)
      render json: @customer
    else
      render json: { errors: @customer.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @customer.destroy
    head :no_content
  end

  def stats
    total = Customer.count
    today = Customer.where("DATE(created_at) = ?", Date.current).count
    # vip   = Customer.where(customer_rank_id: 1).count # rank=1 を VIP と仮定
    render json: { total:, today: }# vip:# }
  end

  def search
    customers = Customer.search_advanced(
      name: params[:name],
      phone: params[:phone],
      phone_type: params[:phone_type]
    )

    render json: customers, each_serializer: Api::V1::CustomerSearchSerializer
  end 

  private

  def set_customer
    @customer = Customer.find(params[:id])
  end

  def customer_params
    params.require(:customer).permit(
      :family_name,
      :family_name_kana,
      :given_name,
      :given_name_kana,
      :phone1,
      :phone2,
      :email,
      :memo,
      :birthday
    )
  end
end
