Rails.application.config.session_store :cookie_store,
  key: '_coretto_session',
  same_site: :lax,  
  secure: Rails.env.production? # httpならfalse、本番httpsならtrueに
