class AddTableToReservationSeats < ActiveRecord::Migration[7.1]
  def change
    add_reference :reservation_seats, :table, foreign_key: true
  end
end
