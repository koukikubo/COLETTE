class CreateStandardListMastas < ActiveRecord::Migration[7.1]
  def change
    create_table :standard_list_mastas do |t|
      t.references :standard_masta, null: false, foreign_key: true

      t.string :list_code, null: false
      t.string :name, null: false
      t.boolean :enabled, default: true, null: false
      t.text :remarks

      t.timestamps
    end
    add_index :standard_list_mastas, [:standard_masta_id, :list_code], unique: true, name: "index_std_list_on_masta_and_list_code"
  end
end
