# config/initializers/session_store.rb
Rails.application.config.session_store :cookie_store,
  key: '_coretto_session',
  same_site: :lax,
  secure: false,   # httpだからfalse
  domain: nil      # ← domain: 'localhost' は削除！