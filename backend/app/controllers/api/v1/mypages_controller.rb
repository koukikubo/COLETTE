class Api::V1::MypagesController < ApplicationController
  before_action :authenticate_api_v1_user!

  
  def me
    if current_api_v1_user&.mypage
      render json: current_api_v1_user.mypage, status: :ok
    else
      head :no_content  # 204（未作成）
    end
  end

  def show
    # /mypages/:id 用（必要なら）
    render json: Mypage.find(params[:id]), status: :ok
  end

  def create
    mypage = current_api_v1_user.build_mypage(mypage_params)
    if mypage.save
      render json: mypage, status: :created
    else
      render json: { errors: mypage.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    mypage = current_api_v1_user.mypage
    if mypage.update(mypage_params)
      render json: mypage, status: :ok
    else
      render json: { errors: mypage.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def mypage_params
    params.require(:mypage).permit(:family_name, :family_name_kana,
                                  :given_name, :given_name_kana,
                                  :nick_name, :position,
                                  :birthday, :made_in, :phone)
  end
end