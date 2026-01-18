class AddUniqueIndexToTablesSeatTypePosition < ActiveRecord::Migration[7.1]
  def change
    add_index :tables, [:seat_type, :position], unique: true
  end
end
