class ChangeSeatCodeNullOnReservationSeats < ActiveRecord::Migration[7.1]
  def change
    change_column_null :reservation_seats, :seat_code, true
  end
end
