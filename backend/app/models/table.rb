class Table < ApplicationRecord
  has_many :reservation_seats, dependent: :restrict_with_exception
  has_many :reservations, through: :reservation_seats
# 自分が「from_table」になってるリンク
  has_many  :table_links_as_from,
            class_name: "TableLink",
            foreign_key: :from_table_id,
            dependent: :destroy

  # 自分が「to_table」になってるリンク
  has_many  :table_links_as_to,
            class_name: "TableLink",
            foreign_key: :to_table_id,
            dependent: :destroy
            
  validates :name, presence: true
  validates :seat_type, inclusion: { in: %w[counter table] }
  validates :capacity, numericality: { greater_than: 0 }

  before_validation :assign_code_and_position, on: :create

  private

  def assign_code_and_position
    return if code.present?

    prefix =
      case seat_type
      when "counter" then "C"
      when "table"   then "T"
      else return
      end

    next_position =
      Table.where(seat_type: seat_type).maximum(:position).to_i + 1

    self.position = next_position
    self.code = "#{prefix}#{next_position}"
  end
end
