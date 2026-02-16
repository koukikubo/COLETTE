class TableLink < ApplicationRecord
  belongs_to :from_table, class_name: "Table"
  belongs_to :to_table, class_name: "Table"

  validates :to_table_id, uniqueness: { scope: :from_table_id }
  validate :link_group_must_match
  validate :cannot_link_self

  def cannot_link_self
    errors.add(:to_table_id, "同じテーブルは連結できません") if from_table_id == to_table_id
  end

  def link_group_must_match
    return if from_table.nil? || to_table.nil?

    # カウンターや個室など link_group がないものは連結不可
    if from_table.link_group.nil? || to_table.link_group.nil?
      errors.add(:base, "このテーブルは連結できません")
      return
    end

    # グループが違うものは連結不可
    if from_table.link_group != to_table.link_group
      errors.add(:base, "違うグループのテーブルは連結できません")
    end
  end
end
