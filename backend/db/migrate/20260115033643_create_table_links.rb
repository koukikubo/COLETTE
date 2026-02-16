class CreateTableLinks < ActiveRecord::Migration[7.1]
  def change
    create_table :table_links do |t|
      t.references :table, null: false, foreign_key: { to_table: :tables }
      t.references :linked_table, null: false, foreign_key: { to_table: :tables }

      t.timestamps
    end

    add_index :table_links, [:table_id, :linked_table_id], unique: true
  end
end
