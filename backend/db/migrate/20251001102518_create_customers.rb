class CreateCustomers < ActiveRecord::Migration[7.1]
  def change
    create_table :customers do |t|
      t.string :family_name
      t.string :family_name_kana
      t.string :given_name
      t.string :given_name_kana
      t.string :phone1
      t.string :phone2
      t.string :email
      t.text :memo
      t.date :birthday
      # t.references :customer_rank, null: false, foreign_key: true
      t.references :mypage, null: false, foreign_key: true

      t.timestamps
    end
  end
end
