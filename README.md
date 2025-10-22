# ファイル構成

pollock-app/
├── index.html # ログイン画面
├── chat.html # チャット画面
├── createprofile.html # 新規登録画面
├── home.html # ホーム画面
├── post.html # 投稿画面
├── css/
│ └── style.css # 共通スタイル
└── js/
├── login.js # ログイン用 JS
├── createprofile.js # 新規登録用 JS
├── post.js # 投稿画面用 JS
└── chat.js # チャット画面用 JS

# pollock_app

ポロック\_資格試験勉強チャットアプリ要件定義書

1. 目的
   独学で資格試験を目指している学習者をターゲットに勉強仲間やモチベーション維持につながるようなチャットアプリを作成する

2. 機能
   2.1.MVP
   ① ユーザー登録＆ログイン
   ② チャットルーム
   ・試験ごとにルームを作成＆参加
   ・メッセージ送信＆受信
   ③ 勉強報告機能
   ・「勉強時間」「コメント」を投稿できるフォーム
   ・投稿一覧表示(日ごと/週ごと集計)
   ④ ランキング
   　・週ごとに勉強時間を集計して簡易ランキング表示
   ・自分の順位がわかる UI
   　　　　 ⑤ スタンプ/応援機能
   　　　　　・投稿やチャットに「👍🏻」「🔥」「👏🏻」など送れる
   2.2.追加機能
   ・画像やファイルの送信
   ・メッセージの既読機能
   ・通知機能
   ・ユーザー検索
   ・ステータス表示機能

3. DB 設計(あくまでも案)
   Table4-1 ユーザーテーブル

Table4-2 　メッセージテーブル

4.画面設計（pollock-study-app – Figma）
4.1.ログイン画面
・ユーザー名入力
・パスワード入力
・ログインボタン

<img width="500" height="500" alt="image" src="https://github.com/user-attachments/assets/b8b97a88-512e-406d-8eb4-74e2671ac82a" />

4.2.新規登録画面
・ユーザー名入力
・登録メールアドレス入力
・パスワード入力(確認用に 2 回)
・登録ボタン

 <img width="500" height="500" alt="image" src="https://github.com/user-attachments/assets/d2d71e5b-1b5f-4e20-b057-ca85b2fe7c3c" />

4.3.チャット画面
　・メッセージ表示エリア
　・メッセージ入力欄

 <img width="414" height="902" alt="image" src="https://github.com/user-attachments/assets/3025aac4-ffaf-49c9-9f2c-65926cbef8df" />

4.4.勉強報告投稿画面
　・投稿内容入力欄
4.5.勉強報告内容確認画面
　・投稿内容反応ボタン(スタンプ)

<img width="886" height="662" alt="image" src="https://github.com/user-attachments/assets/2b479257-d36d-460a-b555-1ef1be14f18f" />

4.6.ランキング画面
　・週ごとの順位表示エリア

<img width="396" height="881" alt="image" src="https://github.com/user-attachments/assets/e30f1f52-a17e-47de-9531-6dfbb44f3ba6" />

4.7.マイページ画面
　・プロフィール表示
　・プロフィール編集ボタン
　・勉強時間の履歴表示エリア

5.API 仕様(仮)
機能 メソッド エンドポイント リクエスト Body レスポンス(JSON)
新規登録 POST /api/users { username, password, email } { userId, username }
ログイン POST /api/login { username, password } { token, userId }
メッセージ送信 POST /api/messages { roomId, senderId, message } { messageId, createdAt }
メッセージ取得 GET /api/messages/{roomId} なし [ { sender, message, createdAt } ]
