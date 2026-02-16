class Api::V1::ReservationMastersController < ApplicationController
  skip_before_action :verify_authenticity_token
  
  def show
      render json: ReservationMastersQuery.call
  end
end 