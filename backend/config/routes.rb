Rails.application.routes.draw do
  
  namespace :api do
    namespace :v1 do
      devise_for :users,
        path: '',
        path_names: {
          sign_in: 'login',
          sign_out: 'logout',
          registration: 'signup'
        },
        controllers: {
          registrations: 'api/v1/registrations',
          sessions: 'api/v1/sessions'
        }

      resources :mypages, only: [:create, :show, :update] do
        collection do
          get :me
        end
      end
    end
  end
end
