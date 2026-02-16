class CreateShopInfos < ActiveRecord::Migration[7.1]
  def change
    create_table :shop_infos do |t|
      t.string :shop_name, null: false
      t.string :phone
      t.text :address
      t.string :business_hours
      t.string :holiday
      t.string :tax_mode, default: "内税"
      t.text :notes

      t.timestamps
    end
  end
end