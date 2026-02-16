class ReservationMastersQuery
  def self.call
    {
      tables: Table.order(:position).select(:id, :code, :name, :capacity, :enabled),

      menu_types: list("0007"),
      courses: list("0008"),
      purpose: list("0009"),
      status: list("0006"),
      cancel: list("0012"),
      allergies: list("0014"),
      guest_types: list("0005"),
    }
  end

  def self.list(base_code)
    StandardListMasta
      .joins(:standard_masta)
      .where(standard_mastas: { base_code: base_code })
      .order(:position)
  end
end