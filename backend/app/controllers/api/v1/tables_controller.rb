class Api::V1::TablesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    tables = Table.order(:seat_type, :position)
    render json: tables
  end

  def show
    table = Table.find(params[:id])
    render json: table
  end

  def create
    table = Table.create!(table_params)
    render json: table, status: :created
  end

  def update
    table = Table.find(params[:id])
    table.update!(table_params)
    render json: table
  end

  def destroy
    table = Table.find(params[:id])
    table.destroy!
    head :no_content
  end

  private

  def table_params
    params.require(:table).permit(
      :name,
      :seat_type,
      :capacity,
      :enabled
    )
  end
end
