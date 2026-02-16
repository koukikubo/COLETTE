class StandardListMasta < ApplicationRecord
  belongs_to :standard_masta
  has_many :customers

  validates :list_code, presence: true, uniqueness: { scope: :standard_masta_id }
  validates :name, presence: true
end
