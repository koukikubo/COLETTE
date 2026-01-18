class Reservation < ApplicationRecord
  belongs_to :customer, optional: true
  has_many   :reservation_seats, dependent: :destroy
  has_many :tables, through: :reservation_seats


  validates :customer_name, presence: true
  validates :start_at, :end_at, presence: true
  validates :guest_count, presence: true, numericality: { greater_than: 0 }
  validates :seat_type_code, presence: false
  validates :status_code, presence: true

  validate  :end_after_start
  scope :active, -> { where.not(status_code: "canceled") }
  before_validation :set_default_status, on: :create

  private

  def set_default_status
    self.status_code ||= "provisional"
  end

  def end_after_start
    return if start_at.blank? || end_at.blank?

    if end_at <= start_at
      errors.add(:end_at, "は開始時間より後である必要があります")
    end
  end
end