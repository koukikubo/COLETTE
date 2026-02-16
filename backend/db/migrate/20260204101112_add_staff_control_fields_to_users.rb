class AddStaffControlFieldsToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :role, :integer, default: 0, null: false
    add_column :users, :start_on, :date
    add_column :users, :end_on, :date
    add_column :users, :suspended, :boolean, default: false, null: false
  end
end
