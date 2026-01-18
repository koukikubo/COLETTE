class CreateReservationSeats < ActiveRecord::Migration[7.1]
  def change
    create_table :reservation_seats do |t|
      t.references :reservation, null: false, foreign_key: true
      t.string :seat_code, null: false
      t.timestamps
    end

    add_index :reservation_seats, :seat_code
  end
end