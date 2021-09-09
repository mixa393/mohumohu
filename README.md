# mohumohu(仮名)
洗濯物の頻度チェッカー  
何日に１回洗うか登録し、その日になったら通知してくれるwebアプリケーション

<br>

## 環境
- React.js
- MySQL
- Ruby 2.6.7
- Ruby on Rails 3.0

<br>

## 作成期間
2021年7月13日〜

## 参考
### Rails
- 環境構築
  - [最初参考にした記事](https://qiita.com/nsy_13/items/9fbc929f173984c30b5d)
  - [途中から](https://qiita.com/tkmd35/items/7e42b2953f5431690d91)
  - [公式](https://docs.docker.com/samples/rails/)
- API
  - [天気取得API](https://weather.tsukumijima.net/)
  - https://qiita.com/kazama1209/items/5c07d9a65ef07a02a4f5
  - https://zenn.dev/nicoryo/articles/20201214tech
  - CSRF対策：https://qiita.com/k_kind/items/e26f03f4e24551b46b98
  - [i18n](https://qiita.com/shimadama/items/7e5c3d75c9a9f51abdd5)
  - [React Hooks + Rails APIを使ったログイン・認証系機能の実装手順](https://qiita.com/kurawo___D/items/d5257e69bcb300908687)
- Rspec
  - 「Everyday Rails - RSpecによるRailsテスト入門」Aaron Sumner
  - https://qiita.com/k-penguin-sato/items/defdb828bd54729272ad
  - [before_actionでログインチェック](https://nanayaku.com/rails-login_check/)
  - [Rspec共通処理](https://qiita.com/tanutanu/items/14b0a1729069b53aa5b8)
  - [Ruby on Railsのmigrationでdatetimeのデフォルト値をCURRENT_TIMESTAMPにする](https://qiita.com/keizokeizo3/items/f2b278a4439bc921b14f)
- devise 
  - [Rails API + React + devise_token_authでログイン機能を実装する](https://qiita.com/kazama1209/items/caa387bb857194759dc5)
  - [Rails5 + devise token authで作る 認証API](http://www.webcyou.com/?p=7869)
  - [【Rails API 入門】devise-token-auth](https://qiita.com/tomokazu0112/items/5fdd6a51a84c520c45b5)
  - [Rails6.0とdevice_token_auth でトークンベースで認証を実装する~confirmable + action mailerの設定まで](https://qiita.com/mtoyopet/items/076b623ac72f4f83c5f6)
- 使わなくなった
  - [ユーザー情報更新時のhas_secure_passwordによるパスワードチェック回避](https://qiita.com/Zambiker/items/fa1680732b582a1e5098)
  - https://qiita.com/d0ne1s/items/7c4d2be3f53e34a9dec7
  - Vue.js
    - [導入参考①](https://www.techpit.jp/courses/123/curriculums/126/sections/934/parts/3576)
    - [導入参考②](https://qiita.com/tatsurou313/items/4f18c0d4d231e2fb55f4)
    - [削除](https://stackoverflow.com/questions/64465562/rails-how-to-remove-vue-js-with-webpack)

### React
- [導入](https://github.com/reactjs/react-rails)