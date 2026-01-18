class AddLinkGroupToTables < ActiveRecord::Migration[7.1]
  def change
    add_column :tables, :link_group, :string

    add_index :tables, :link_group
  end
end
