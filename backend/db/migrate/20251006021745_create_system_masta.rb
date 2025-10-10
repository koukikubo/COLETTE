class CreateSystemMasta < ActiveRecord::Migration[7.1]
  def change
    create_table :system_masta do |t|
      t.string :category
      t.string :code
      t.string :name
      t.boolean :active
      t.string :action
      t.bigint :user_id
      t.string :user_name
      t.string :target_table
      t.bigint :target_id
      t.json :before_values
      t.json :after_values
      t.datetime :operation_time

      t.timestamps
    end
  end
end
