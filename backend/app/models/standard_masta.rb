class StandardMasta < ApplicationRecord
  has_many :standard_list_mastas, dependent: :destroy

  validates :base_code, presence: true, uniqueness: true
  validates :name, presence: true

  def self.search(query: nil, enabled: nil)
    result = all
    result = result.where("base_code LIKE :q OR name LIKE :q", q: "%#{query}%") if query.present?
    case enabled
    when "true" then result = result.where(enabled: true)
    when "false" then result = result.where(enabled: false)
    end
    result
  end

  def self.next_base_code
    max_code = maximum(Arel.sql("CAST(base_code AS INTEGER)")) || 0
    format("%04d", max_code + 1)
  end
end
