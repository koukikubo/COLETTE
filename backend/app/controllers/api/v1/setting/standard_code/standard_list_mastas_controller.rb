class Api::V1::Setting::StandardCode::StandardListMastasController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_standard_masta

  def index
    render json: @standard_masta.standard_list_mastas
  end

  def create
    list = @standard_masta.standard_list_mastas.new(list_params)
    if list.save
      render json: list, status: :created
    else
      render json: { errors: list.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    list = @standard_masta.standard_list_mastas.find(params[:id])
    if list.update(list_params)
      render json: list
    else
      render json: { errors: list.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    list = StandardListMasta.find(params[:id])
    render json: list
  end

  def destroy
    list = @standard_masta.standard_list_mastas.find(params[:id])
    list.destroy
    head :no_content
  end

  private

  def set_standard_masta
    @standard_masta = StandardMasta.find(params[:standard_masta_id]) 
  end

  def list_params
    params.require(:standard_list_masta).permit(:list_code, :name, :enabled, :remarks)
  end
end