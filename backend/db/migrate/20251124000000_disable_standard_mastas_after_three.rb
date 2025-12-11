class DisableStandardMastasAfterThree < ActiveRecord::Migration[7.1]
  def up
    execute <<~SQL
      UPDATE standard_mastas
      SET enabled = FALSE
      WHERE base_code ~ '^[0-9]+' AND CAST(base_code AS INTEGER) >= 4;
    SQL
  end

  def down
    execute <<~SQL
      UPDATE standard_mastas
      SET enabled = TRUE
      WHERE base_code ~ '^[0-9]+' AND CAST(base_code AS INTEGER) >= 4;
    SQL
  end
end
