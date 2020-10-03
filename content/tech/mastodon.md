---
title: "Mastodon を触ったときのメモ"
date: 2017-05-24 12:00:00 +0900
tags:
  - Mastodon
  - CentOS
  - Docker
toc: true
---
私が Mastodon を立ち上げるときに使ったメモです。あくまで自分用なのでわかりにくい部分があると思いますが改善していこうと思います。

ちなみに構築した環境は CentOS 7.2 + Nginx + Docker です。

## Preparation

事前に必要そうな設定を行っていきます。

### Firewall

ファイヤーウォールの設定をしていきます。

現在の設定を確認します。

```
firewall-cmd --list-all
```

dmzゾーン を default設定 に変更します。

```
firewall-cmd --set-default-zone=dmz
```

次にNICへ割り当てられているゾーンの変更します。
`/etc/sysconfig/network-scripts/ifcfg-eth0` の最終行に `ZONE=dmz` を追加しただけです。

```diff:/etc/sysconfig/network-scripts/ifcfg-eth0
+ ZONE=dmz
```

http と https 用のポートを開け設定を読み込ませます。
`--permanent` をつけることによって永続化させることができます。

```bash
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
firewall-cmd --reload
```

### Swap 領域
私が借りたサーバーはメモリが 1GB と貧弱なので Swap 領域を 4G 設定しました。

```bash
dd if=/dev/zero of=/swapfile bs=1M count=4096
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile
```

## Install ･ Setting

必要なものをどんどんインストールしていきます。

### Certbot

SSL証明書(Let’s Encrypt ) を利用するためクライアントソフトをインストールします
[ここ](https://certbot.eff.org/#centosrhel7-nginx) を参考にしました。

```bash
yum -y install yum-utils
yum-config-manager --enable rhui-REGION-rhel-server-{extras,optional}
yum -y install certbot
```

インストールが終わったら SSL証明書を発行します。

```bash
certbot certonly --standalone -d example.com --rsa-key-size 4096
```

### Nginx

公開するために Web サーバーをインストールします。
[ここ](https://www.nginx.com/resources/wiki/start/topics/tutorials/install/#official-red-hat-centos-packages) を参考にしました。

まず最新版をインストールするために設定ファイルを作成します。

```:/etc/yum.repos.d/nginx.repo
[nginx]
name=nginx repo
baseurl=http://nginx.org/packages/centos/7/$basearch/
gpgcheck=0
enabled=1
```

そして次のコマンドを入力しインストールします。

```bash
yum -y --enablerepo=nginx install nginx
```

最後に、 Nginx の起動とサーバの再起動が行われた場合でも自動で起動されるように設定します。

```bash
systemctl enable nginx
systemctl start nginx
```

### Docker

Mastodon を簡単に動かすために仮想化ソフトをインストールします。
[ここ](https://docs.docker.com/engine/installation/linux/centos/#docker-ce) を参考にしました。

```bash
yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
yum -y install docker-ce
```

Docker の起動とサーバの再起動が行われた場合でも自動で起動されるように設定します。

```bash
systemctl enable docker
systemctl start docker
```

#### Docker Compose

複数のコンテナからなるサービス (ここでは Mastodon のことです) を簡単に操作できるように Docker Compose をインストールします。
[ここ](https://docs.docker.com/compose/install/) を参考にしました。

```bash
curl -L https://github.com/docker/compose/releases/download/1.14.0/docker-compose-$(uname -s)-$(uname -m) > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

Docker Compose が動くか確認します。

```bash
docker-compose --version
```

### Mastodon

[ここ](https://github.com/tootsuite/documentation/blob/master/Running-Mastodon/Docker-Guide.md) を参考にしました。
今回インストールするディレクトリは `/var/www/mstdn` とします。

まず、操作するためのユーザーを作成します

```bash
useradd --system --user-group --shell /bin/false --create-home --home /home/mastodon mastodon
passwd mastodon
```

Mastodonをインストールする場所を用意し所有者を変更します。

```bash
mkdir -p /var/www/mstdn
chown -R mastodon /var/www/mstdn
```

ここからユーザーを変えてMastodonをインストールします。

```bash
su - mastodon
cd /var/www
git clone https://github.com/tootsuite/mastodon.git mstdn
cd /var/www/mstdn
sudo docker-compose build
```

設定ファイルをコピーして書き換えていきます。

```bash
cp .env.production.sample .env.production
```

3回シークレットキーを生成しメモを取ります。
生成したのはシークレットキーは `PAPERCLIP_SECRET` と `SECRET_KEY_BASE` と `OTP_SECRET` の部分を書き直します。

```bash
sudo docker-compose run --rm web rake secret
```

あとは必要に応じて `LOCAL_DOMAIN` や `SMTP_*` の部分を書き直します。

Mastodonを使用して感じたのは、自インスタンスにいるユーザーがリモートフォローしてる人が投稿した画像も自分のインスタンスに保存されるので絵師などをフォローしてるとすぐに容量がなくなります。なのでS3の項目も設定した方がおすすめです。

```zsh:.env.production(設定例)
# S3 (optional)
S3_ENABLED=true
S3_BUCKET=<バケット名>
AWS_ACCESS_KEY_ID=<AWSのアクセスキー>
AWS_SECRET_ACCESS_KEY=<AWSのシークレットキー>
S3_REGION=ap-northeast-1
S3_PROTOCOL=https
S3_HOSTNAME=https://ap-northeast-1.amazonaws.com

# Optional alias for S3 if you want to use Cloudfront or Cloudflare in front
S3_CLOUDFRONT_HOST=<S3のバケットドメインかCDNのドメイン>
```

このままDockerを起動するとデータが消えるので `docker-compose.yml` を編集します。
`Uncomment to enable ...`と書いてある下の`volumes`の部分をコメントアウトします。

```diff:docker-compose.yml
 ### Uncomment to enable DB persistance
-#    volumes:
-#      - ./postgres:/var/lib/postgresql/data
+    volumes:
+      - ./postgres:/var/lib/postgresql/data
 
   redis:
     restart: always
     image: redis:alpine
 ### Uncomment to enable REDIS persistance
-#    volumes:
-#      - ./redis:/data
+    volumes:
+      - ./redis:/data
```

#### PostgreSQL のバージョンを固定化

このままでは PostgreSQL のメインバージョンがアップデートされるとアップグレード作業をする必要が発生するのでバージョンを固定します。
([ここ](http://cryks.hateblo.jp/entry/2017/04/16/145547) を参考にしました)

```diff:docker-compose.yml
-    image: postgres:alpine
+    image: postgres:9.6-alpin
```

#### Sidekiq を冗長化する (オプション)

Pawoo.net を運用してる pixiv で [実際に運用してみてわかった、大規模Mastodonインスタンスを運用するコツ](https://inside.pixiv.blog/harukasan/1284) という記事を見つけ読みました。

> このうちpush、pullのキューは他のMastodonインスタンスのAPIをリクエストする必要があるため、ほかのMastodonインスタンスが応答できない状態に陥っているとかなりのキューが詰まれてしまい、defaultキューの処理も遅延させてしまいます。

とあり具体的な解決策として **Sidekiqのプロセス数を増やす** と書いてあったのでDockerを複数立てて対応して見ました。

```yaml:docker-compose.yml
  sidekiq-default:
    build: .
    image: gargron/mastodon
    restart: always
    env_file: .env.production
    command: bundle exec sidekiq -c 20 -q default
    depends_on:
      - db
      - redis
    volumes:
      - ./public/system:/mastodon/public/system

  sidekiq-maile:
    build: .
    image: gargron/mastodon
    restart: always
    env_file: .env.production
    command: bundle exec sidekiq -c 5 -q mailers
    depends_on:
      - db
      - redis
    volumes:
      - ./public/system:/mastodon/public/system

  sidekiq-pull:
    build: .
    image: gargron/mastodon
    restart: always
    env_file: .env.production
    command: bundle exec sidekiq -c 10 -q pull
    depends_on:
      - db
      - redis
    volumes:
      - ./public/system:/mastodon/public/system

  sidekiq-push:
    build: .
    image: gargron/mastodon
    restart: always
    env_file: .env.production
    command: bundle exec sidekiq -c 15 -q push
    depends_on:
      - db
      - redis
    volumes:
      - ./public/system:/mastodon/public/system
```

### セットアップ

下記のコマンドでデータベースや必要なファイルのセットアップを行います。

```bash
sudo docker-compose run --rm web rails db:setup
sudo docker-compose run --rm web rails assets:precompile
```

最後にMastodonを起動させます

```bash
sudo docker-compose up -d
```

これでローカルに Mastodon を建てることができました。

#### Nginx の設定

Mastodonを外部に公開するためにWebサーバーの設定をします。
[ここ](https://git.io/v9AaO) を参考に `/etc/nginx/conf.d/mastodon.conf` を作成しました。

HSTS の設定を追記します。

```diff:/etc/nginx/conf.d/mastodon.conf
-	add_header Strict-Transport-Security "max-age=31536000";
+	add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload";
```

このまま起動しようとすると `ssl_dhparam` で指定してるファイルがないと怒られるので作成します。
環境によってはすごい時間がかかるので注意してください。

```bash
sudo openssl dhparam -out /etc/ssl/certs/dhparam.pem 4096
```

Nginxと念の為にMastodonを再起動させたら完了です

```bash
sudo docker-compose restart
sudo systemctl restart nginx
```

お疲れ様です。これでサーバーを立てることができたと思います。

## Update

1. リモートリポジトリの最新の履歴の取得します。
	- `git fetch --tags`
1. 最新のTagに変更する (例: v1.6.1 にする場合)
	- `git checkout v1.6.1`
1. 確認
	- `git status`
1. ビルド
	- `docker-compose build`
1. DB (Option)
	- `docker-compose run --rm web rake db:migrate`
1. (Option)
	- `docker-compose run --rm web rake assets:precompile`
1. 再起動
	- `docker-compose up -d`

これで再起動ができてると思われます。

## さいごに

色々と書きましたが今は違う構成をしてたりしてるのであくまでも参考程度にお願いします。
