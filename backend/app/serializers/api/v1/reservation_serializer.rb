class Api::V1::ReservationSerializer < ActiveModel::Serializer
  attributes :id, :customer_name, :contact_phone, :start_at, :end_at, :guest_count, 
              :status_code, :menu_type_code, :course_code,:purpose_code, :cancel_reason_code, 
              :allergy_code,:memo

  attribute :tables

  def tables
    object.reservation_seats.includes(:table).map(&:table).compact
  end
end