# config/initializers/session_store.rb（なければ作成）
Rails.application.config.session_store :cookie_store,
  key: '_coretto_session',
  domain: 'localhost',
  same_site: :lax,        # ← これ
  secure: false           # ← http なので false