class AddPositionToStandardListMastas < ActiveRecord::Migration[7.1]
  def change
    add_column :standard_list_mastas, :position, :integer

    add_index :standard_list_mastas,
      [:standard_masta_id, :position],
      name: "index_std_list_on_masta_and_position"
  end
end
