class Api::V1::Mypage::MypagesController < ApplicationController
  skip_before_action :verify_authenticity_token
  def me
    render json: {
    user: Api::V1::UserSerializer.new(current_user).serializable_hash,
    mypage: current_user.mypage ? Api::V1::MypageSerializer.new(current_user.mypage).serializable_hash : nil
    }, status: :ok
  end
  def show
    render json: Mypage.find(params[:id]), serializer: Api::V1::MypageSerializer, status: :ok
  end

  def create
    mypage = current_user.build_mypage(mypage_params)
    if mypage.save
      render json: mypage, serializer: Api::V1::MypageSerializer, status: :created
    else
      render json: { errors: mypage.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    mypage = current_user.mypage
    if mypage.update(mypage_params)
      render json: mypage, serializer: Api::V1::MypageSerializer, status: :ok
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
