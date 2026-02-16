class Api::V1::ReservationsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    date_str = params[:date]
    date = date_str.present? ? Date.parse(date_str) : Date.current

    reservations = Reservation
      .includes(reservation_seats: :table)
      .where(start_at: date.beginning_of_day..date.end_of_day)

      render json: reservations, each_serializer: Api::V1::ReservationSerializer 
  end

  def show
    reservation = Reservation.includes(reservation_seats: :table).find(params[:id])
    render json: reservation, serializer: Api::V1::ReservationSerializer
  end

  def create
    table_ids = params[:reservation].delete(:table_ids)

    reservation = nil
    ActiveRecord::Base.transaction do
      reservation = Reservation.create!(reservation_params)

      Array(table_ids).each do |table_id|
        reservation.reservation_seats.create!(table_id: table_id)
      end
    end

    reservation = Reservation.includes(reservation_seats: :table).find(reservation.id)
    render json: reservation, serializer: Api::V1::ReservationSerializer, status: :created
  end

  def update
    reservation = Reservation.find(params[:id])
    table_ids = params[:reservation].delete(:table_ids)

    ActiveRecord::Base.transaction do
      reservation.update!(reservation_params)

      if table_ids
        reservation.reservation_seats.destroy_all
        Array(table_ids).each do |table_id|
          reservation.reservation_seats.create!(table_id: table_id)
        end
      end
    end

    reservation = Reservation.includes(reservation_seats: :table).find(reservation.id)
    render json: reservation, serializer: Api::V1::ReservationSerializer
  end

  def destroy
    reservation = Reservation.find(params[:id])
    reservation.destroy
    head :no_content
  end 

  private

  def reservation_params
    params.require(:reservation).permit(
      :customer_name,
      :contact_phone,
      :start_at,
      :end_at,
      :guest_count,
      :status_code,
      :menu_type_code,
      :course_code,
      :purpose_code,
      :cancel_reason_code,
      :allergy_code,
      :memo
    )
  end
end