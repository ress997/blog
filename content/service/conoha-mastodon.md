---
title: "ConoHa で Mastodon を立ててみた (テンプレート使用)"
date: 2017-04-27 12:00:00 +0900
tags:
  - Conoha
  - Mastodon
  - Ubuntu
toc: true
---
**追記**: 公式にConoHaのメールサーバーの合わせて使う方法が公開されました

- [MastodonアプリケーションイメージｘConoHaメールサーバーでMastodonのインスタンスを作る](https://www.conoha.jp/guide/mastodonconoha.php)

---
いつも使っている {{< link conoha >}} にMastodonのテンプレートが公開されたので早速使用してみました！

参考元: [Mastodonアプリケーションイメージの使い方](https://www.conoha.jp/guide/mastodon.php)

## サーバーを建ててみる

せっかくなのでConoHaを使うのでアプリケーションサーバのメールサーバーも立ててみました。

{{< gyazo id="eb4730f27ecba8e8e5db494e47c3b192" >}}

### `.env.production` を編集する

ConoHa のテンプレートを使用するとデータベースの部分は自動的に書き換わってると思うのでメールの部分を編集します

```diff:.env.production
# E-mail configuration
# Note: Mailgun and SparkPost (https://sparkpo.st/smtp) each have good free tiers
-SMTP_SERVER=smtp.mailgun.org
+SMTP_SERVER=smtp.mastodon.conoha.io
SMTP_PORT=587
-SMTP_LOGIN=
-SMTP_PASSWORD=
-SMTP_FROM_ADDRESS=notifications@example.com
+SMTP_LOGIN=notifications@mastodon.conoha.io
+SMTP_PASSWORD=HogeHoge
+SMTP_FROM_ADDRESS=notifications@mastodon.conoha.io
```

### データベースを作成とRailsのアセットをコンパイルをする

```bash
sudo -u mastodon RAILS_ENV=production /home/mastodon/.rbenv/versions/2.4.1/bin/bundle exec rails db:setup
sudo -u mastodon RAILS_ENV=production /home/mastodon/.rbenv/versions/2.4.1/bin/bundle exec rails assets:precompile
```

上記のコマンドを実行するだけなので簡単ですね

## Mastodon を起動する

```bash
systemctl enable --now mastodon-*
```

上記のコマンドを実行することによってMastodonが立ち上がると思います
そうしたら `http://<サイトのアドレス>:3000` からアクセスできるようになってると思います。

### 管理者権限を付与する

下記のコマンドを実行することによって指定したユーザーに管理者権限を付与することができます。

```bash
sudo -u mastodon RAILS_ENV=production /home/mastodon/.rbenv/versions/2.4.1/bin/bundle exec rails  mastodon:make_admin USERNAME=(登録時のユーザー名)
```

もし、メールアドレスが届かない場合は下記のコマンドを実行することによってメールを認証することもできます。

```bash
sudo -u mastodon RAILS_ENV=production /home/mastodon/.rbenv/versions/2.4.1/bin/bundle exec rails  mastodon:confirm_email USER_EMAIL=(登録時のメアド)
```

## 本格的な運用に向けて

これまで書いてきた部分は参考元のドキュメントを見ればわかることですがこれから先のことは自分で試行錯誤しながらやったことなので自己責任でお願いします。
またこうした方がいいよって事がありましたらぜひ教えてください。

### Nginx や Let's Encrypt  を設定する

まず必要なものをインストールします。

```bash
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install certbot
```

インストールを終えたら証明書を発行します

```
sudo certbot certonly --standalone -d example.com
```

次に Mastodon 用の Nginx 設定ファイルを用意します

[公式ドキュメント](https://git.io/v9sSK) から `/etc/nginx/conf.d/mastodon.conf` へコピーしドメインの部分をを適切なものに変更します。

設定が終わったら Nginx にファイルを読み込ませます

`sudo nginx -s reload`

これで `https://<サイトのアドレス>` からアクセスできるようになったと思います。

#### `nginx reload` ができない場合

調べるまで分かりませんでしたが、どうやら `/etc/ssl/certs/dhparam.pem` というファイルがなくて怒ってました。
これは下記のコマンドで生成することができます(生成するのに結構時間がかかります)

```bash
sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 2048
```

### 使用しないポートを閉じる

Ubuntuを全然触ったことがないのでやり方が分からなかったです。

とりあえず応急雨処置としてConoHaのコントロールパネルからMastodonを運用してるVPSを開き`ネットワーク情報` -> `接続許可ポート` -> `すべて許可`のチェックを外し必要なものだけチェックを入れ対応しました。

## 感想

今日の昼過ぎにテンプレートが公開され帰宅後試してみた程度なので足りない点があると思いますが今のところとりあえず使えるようにはなったので記事にしました。
