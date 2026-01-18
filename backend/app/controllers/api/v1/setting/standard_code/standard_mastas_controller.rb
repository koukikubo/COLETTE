class Api::V1::Setting::StandardCode::StandardMastasController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_standard_masta, only: [:show, :update, :destroy]
  
  def index
  keyword = params[:query].presence || params[:q].presence

  codes = StandardMasta.search(
    query: keyword,
    enabled: params[:enabled]
  ).order(:base_code)    
  
  render json: codes, each_serializer: Api::V1::StandardMastaSerializer
  end

  def next_code
    render json: { base_code: StandardMasta.next_base_code }
  end

  def show
    render json: @standard_masta
  end

  def create
    @standard_masta = StandardMasta.new(standard_masta_params)
    if @standard_masta.save
      render json: @standard_masta, status: :created
    else
      render json: @standard_masta.errors, status: :unprocessable_entity
    end
  end

  def update
    if @standard_masta.update(standard_masta_params)
      render json: @standard_masta
    else
      render json: @standard_masta.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @standard_masta.destroy
    head :no_content
  end

  def count
  total = StandardMasta.count
  render json: { count: total }, status: :ok
  end

  private

  def set_standard_masta
    @standard_masta = StandardMasta.find(params[:id])
  end

  def standard_masta_params
    params.require(:standard_masta).permit(:base_code, :name, :enabled, :remarks)
  end
end
