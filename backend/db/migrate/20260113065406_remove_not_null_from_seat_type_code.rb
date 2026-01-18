class RemoveNotNullFromSeatTypeCode < ActiveRecord::Migration[7.1]
  def change
    change_column_null :reservations, :seat_type_code, true
  end
end
