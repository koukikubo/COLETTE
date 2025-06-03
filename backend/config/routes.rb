Rails.application.routes.draw do

  if Rails.env.development?
    mount LetterOpenerWeb::Engine, at: "/letter_opener"
  end
  
  namespace :api do
    namespace :v1 do
      get "health_check", to: "health_check#index"

      mount_devise_token_auth_for "User", at: "auth", controllers: {
        registrations: "api/v1/auth/registrations"
      }

      namespace :current do
        resource :user, only: [:show]
      end
    end
  end
end