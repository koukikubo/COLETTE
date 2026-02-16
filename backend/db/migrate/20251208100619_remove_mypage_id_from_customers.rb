class RemoveMypageIdFromCustomers < ActiveRecord::Migration[7.1]
  def change
    remove_column :customers, :mypage_id, :bigint
  end

end
