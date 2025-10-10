class Api::V1::CustomerRanksController < ApplicationController
  def index
    ranks = CustomerRank.order(:priority)
    render json: ranks
  end

  def create
    rank = CustomerRank.new(rank_params)
    if rank.save
      render json: rank, status: :created
    else
      render json: { errors: rank.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    rank = CustomerRank.find(params[:id])
    if rank.update(rank_params)
      render json: rank
    else
      render json: { errors: rank.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    rank = CustomerRank.find(params[:id])
    rank.destroy
  end

  private

  def rank_params
    params.require(:customer_rank).permit(:name, :display_name, :priority)
  end
end

