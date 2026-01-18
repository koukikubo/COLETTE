class CreateSeats < ActiveRecord::Migration[7.1]
  def change
    create_table :tables do |t|
      t.string  :code,      null: false          
      t.string  :name,      null: false          
      t.string  :seat_type, null: false          
      t.integer :capacity, null: false          
      t.boolean :enabled,  null: false, default: true
      t.integer :position, null: false, default: 0  

      t.timestamps
    end

    add_index :tables, :code, unique: true
    add_index :tables, :seat_type
    add_index :tables, :enabled
  end
end
