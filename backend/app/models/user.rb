class User < ApplicationRecord
  has_one :mypage, dependent: :destroy
  has_many :notifications, foreign_key: :created_by_id, dependent: :nullify
  has_secure_password

  validates :email, presence: true, uniqueness: true

  enum role: {
    staff: 0,
    admin: 1
  }

  def active?
    return false if suspended?

    today = Date.current

    return false if start_on.present? && today < start_on
    return false if end_on.present? && today > end_on

    true
  end

  def active_for_authentication?
    super && active?
  end
end

