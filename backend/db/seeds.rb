[
  { base_code: "0001", name: "顧客ランク", enabled: true, remarks: "顧客ランク管理用" },
  { base_code: "0002", name: "性別",     enabled: true, remarks: "性別分類" }
].each do |attrs|
  StandardMasta.find_or_create_by!(base_code: attrs[:base_code]) do |record|
    record.name    = attrs[:name]
    record.enabled = attrs[:enabled]
    record.remarks = attrs[:remarks]
  end
end

# ② 4桁の連番（0003〜1999）を一気に投入 ※存在すればスキップ
(3..1999).each do |i|
  StandardMasta.find_or_create_by!(base_code: format("%04d", i)) do |record|
    record.name    = "-"
    record.enabled = true
    record.remarks = "-"
  end
end