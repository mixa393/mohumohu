require 'rails_helper'

RSpec.describe User, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"

  describe User do
    it "is valid with a first name, last name, email, and password"
    it "名前が無ければ無効"
    it "名前が32文字以上なら無効"
    it "メールアドレスが無ければ無効"
    it "メールアドレスが127文字以上なら無効"
    it "メールアドレスがフォーマットに即していなければ無効"
    it "パスワードが無ければ無効"
    it "パスワードが255文字以上であれば無効"
    it "team_idが無ければ無効"
    it "重複したメールアドレスなら無効"
  end
end
