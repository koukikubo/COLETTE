class CreateStaffMembers < ActiveRecord::Migration[7.1]
  def change
    create_table :staff_members do |t|
      t.references :user, null: false, foreign_key: true
      t.string :family_name
      t.string :family_name_kana
      t.string :given_name
      t.string :given_name_kana
      t.string :nick_name
      t.string :position
      t.date :birthday
      t.integer :made_in
      t.string :phone

      t.timestamps
    end
  end
end
