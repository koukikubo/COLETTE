class MypageSerializer < ActiveModel::Serializer
    attributes :id, :family_name, :family_name_kana,
              :given_name, :given_name_kana,
              :nick_name, :position,
              :birthday, :made_in, :phone
end