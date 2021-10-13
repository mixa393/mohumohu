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
- 論理削除
  - [Deviseで論理削除を実装する](https://qiita.com/tanutanu/items/3048e17da0dc5a0e944e)
  - [【翻訳】deviseで論理削除を実装する方法](https://qiita.com/t1gert1ger/items/0b90040085005f0860bf)
  - [How to: Soft delete a user when user deletes account](https://github.com/heartcombo/devise/wiki/How-to:-Soft-delete-a-user-when-user-deletes-account)
- バッチ処理
  - [Railsで定期的に実行したい処理を、rakeタスクを使って実装する。（おまけ:Wheneverとの連携）](https://qiita.com/Tatsu88/items/0d85d2e8509632d2536b)
  - [Railsでバッチを書く時によく使うrails runnerとrake taskの違い](https://qiita.com/rllllho/items/672e336a03335cba6b34)
  - [Dockerでwheneverを扱う時No such file or directory - crontabとなる](https://qiita.com/hiroki_404_/items/f4859c67be13ed74f258)
  - [Railsで定期実行を実現したい](https://bon-voyage23.hatenablog.com/entry/2020/12/28/095205)
- 使わなくなった
  - [ユーザー情報更新時のhas_secure_passwordによるパスワードチェック回避](https://qiita.com/Zambiker/items/fa1680732b582a1e5098)
  - https://qiita.com/d0ne1s/items/7c4d2be3f53e34a9dec7
  - Vue.js
    - [導入参考①](https://www.techpit.jp/courses/123/curriculums/126/sections/934/parts/3576)
    - [導入参考②](https://qiita.com/tatsurou313/items/4f18c0d4d231e2fb55f4)
    - [削除](https://stackoverflow.com/questions/64465562/rails-how-to-remove-vue-js-with-webpack)

### React
- [導入](https://github.com/reactjs/react-rails)
- [スライドメニュー](https://www.kirupa.com/react/smooth_sliding_menu_react_motion.htm)
- [画像によるradioボタン](https://gouf.hatenablog.com/entry/2018/02/19/075202)
- [tooltop](https://reffect.co.jp/react/react-tooltip)
- [自分で実装したいけどまだしていないmodal](https://reffect.co.jp/react/react-modal)

### デプロイ
- [React + RailsのアプリをHerokuで動かす方法](https://qiita.com/pure-adachi/items/c2c5730560650c80a5e0)
- [Failed to install gems via Bundler. が出た時の対処法 HEROKU](https://qiita.com/m6mmsf/items/fb8a8672df98bdb59c9c)