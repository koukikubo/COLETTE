class CreateStandardMastas < ActiveRecord::Migration[7.1]
  def change
    create_table :standard_mastas do |t|
      t.string :base_code, null: false
      t.string :name, null: false
      t.boolean :enabled, default: true, null: false
      t.text :remarks

      t.timestamps
    end

    add_index :standard_mastas, :base_code, unique: true
  end
end
