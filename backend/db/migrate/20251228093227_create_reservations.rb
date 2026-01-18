class CreateReservations < ActiveRecord::Migration[7.1]
  def change
    create_table :reservations do |t|
      t.references :customer, null: true, foreign_key: true
      t.string     :customer_name,  null: false
      t.string     :contact_phone

      t.datetime   :start_at,    null: false
      t.datetime   :end_at,      null: false
      t.integer    :guest_count, null: false
      t.integer    :adult_count
      t.integer    :child_count

      t.string     :seat_type_code, null: false
      t.string     :status_code,    null: false

      t.string     :menu_type_code
      t.string     :course_code

      t.string     :purpose_code
      t.string     :source_code
      t.string     :payment_method_code
      t.string     :cancel_reason_code
      t.string     :seat_request_code
      t.string     :allergy_code

      t.integer    :created_by_staff_id

      t.text       :memo

      t.timestamps
    end

    add_index :reservations, :start_at
    add_index :reservations, :end_at
    add_index :reservations, :status_code
    add_index :reservations, :seat_type_code

  end
end