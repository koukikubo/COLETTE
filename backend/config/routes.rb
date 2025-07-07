Rails.application.routes.draw do
  devise_for :users

  namespace :api do
    namespace :v1 do
      post "login",  to: "sessions#create"
      delete "logout", to: "sessions#destroy"
      get "me", to: "sessions#me"
    end
  end
end
