class CreateCustomerRanks < ActiveRecord::Migration[7.1]
  def change
    create_table :customer_ranks do |t|
      t.string :name
      t.string :display_name
      t.integer :priority

      t.timestamps
    end
  end
end
