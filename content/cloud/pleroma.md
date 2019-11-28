---
title: "Amazon Lightsail に Pleroma をインストールしてみた"
date: 2018-10-08 20:45:00 +0900
tags:
  - AWS
  - Amazon S3
  - Amazon Lightsail
  - Pleroma
toc: true
aliases:
  - /tech/pleroma/
---

今回は利用料金が安くなった Amazon Lightsail を使って Pleroma インスタンスを建ててみたいと思います。
ついでに最近利用できるようになった Amazon S3 にメディアを保存する機能も使用します。

自分がやったことを軽くまとめただけなので足りない情報など各自補ってください

## TL;DR
- Amazon Lightsail
	- OS: Ubuntu LTS 16.04.5
- Amazon S3
	- Static website hosting 有効化すること

## Setup
事前に必要なものをインストールしていきます。
ついでにタイムゾーンと言語設定を日本に変更します。

```sh
apt update
apt -y dist-upgrade
apt -y autoremove

apt -y install language-pack-ja
update-locale LANG=ja_JP.UTF-8

ln -sf /usr/share/zoneinfo/Asia/Tokyo /etc/localtime
dpkg-reconfigure --frontend noninteractive tzdata

apt -y install git build-essential openssl ssh sudo
```

## Caddy

今回リバースプロキシには [Caddy](https://caddyserver.com/) を使用します。
Caddy は自動的に Let’s Encrypt で HTTPS を使用する HTTP/2 対応のウェブサーバーです。

```sh
curl https://getcaddy.com | bash -s personal

chown root:root /usr/local/bin/caddy
chmod 755 /usr/local/bin/caddy
setcap 'cap_net_bind_service=+ep' /usr/local/bin/caddy

# グループ・ユーザーが存在しない場合のみ実行してください。
# グループ一覧: /etc/group
# ユーザー一覧: /etc/passwd
groupadd --system -g 33 www-data
useradd \
  -g www-data --no-user-group \
  --home-dir /var/www --no-create-home \
  --shell /usr/sbin/nologin \
  --system --uid 33 www-data

# 使用するフォルダを用意します
mkdir -p /etc/caddy
chown -R root:root /etc/caddy
mkdir -p /etc/ssl/caddy
chown -R root:www-data /etc/ssl/caddy
chmod 770 /etc/ssl/caddy

# 設定ファイルを作成します
# domain.tld など実際に使用する環境に合わせて変更してください
cat <<EOL > /etc/caddy/Caddyfile
http:// {
  gzip
  root /var/www/html
}

social.domain.tld {
  gzip

  tls social@domain.tld

  proxy / localhost:4000 {
    websocket
    transparent
  }
}
EOL

# 公開用フォルダを作成します
mkdir -p /var/www/html
cat <<EOL > /var/www/html/index.html
<h1>Hello World!</h1>
EOL
chown -R www-data:www-data /var/www
chmod 555 /var/www

# systemd を設定します
curl -s https://raw.githubusercontent.com/mholt/caddy/master/dist/init/linux-systemd/caddy.service -o /etc/systemd/system/caddy.service
chown root:root /etc/systemd/system/caddy.service
chmod 644 /etc/systemd/system/caddy.service
systemctl daemon-reload
systemctl start caddy.service
systemctl enable caddy.service
```

サーバーはこれで用意できるのであとポート設定などは各自調べてください

## postgresql

データベースをインストールします。
今回は PostgreSQL 10 を使います。

```sh
cat <<EOL > /etc/apt/sources.list.d/pgdg.list
deb http://apt.postgresql.org/pub/repos/apt/ xenial-pgdg main
EOL

wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -
apt update

apt install postgresql-10 postgresql-contrib-10
```

## Elixir/Erlang

Pleroma を実行する Elixir/Erlang をインストールします。

```sh
wget -P /tmp/ https://packages.erlang-solutions.com/erlang-solutions_1.0_all.deb && sudo dpkg -i /tmp/erlang-solutions_1.0_all.deb
apt update

apt -y install elixir erlang-dev erlang-parsetools erlang-xmerl erlang-tools
```

## pleroma

ユーザーを追加しソースコードを git でダウンロードします。

```sh
adduser pleroma
usermod -aG sudo pleroma

su pleroma
cd ~
git clone https://git.pleroma.social/pleroma/pleroma
cd pleroma/
```

依存関係をダウンロードします

```sh
mix deps.get
```

設定ファイルを作成します

```sh
# まずは自動生成
mix generate_config
cp config/generated_config.exs config/prod.secret.exs
```

`config/prod.secret.exs` を次項のサンプルを例に編集します

```sh
vi config/prod.secret.exs
```

データベースの設定をします

```sh
sudo su postgres -c 'psql -f config/setup_db.psql'
MIX_ENV=prod mix ecto.migrate
```

### sample config

見やすいように私は設定の順序を変更してます

```elixir
use Mix.Config

config :pleroma, Pleroma.Web.Endpoint,
   url: [host: "インスタンスURL", scheme: "https", port: 443],
   secret_key_base: "なんとか"

config :pleroma, Pleroma.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "pleroma",
  password: "なんとか",
  database: "pleroma_dev",
  hostname: "localhost",
  pool_size: 10

config :pleroma, :instance,
  name: "インスタンス名",
  email: "メールアドレス",
  dedupe_media: false,
  limit: 5000,
  registrations_open: true
# limit は文字数制限です
# registrations_open は新規登録するかの設定です

config :pleroma, :media_proxy,
  enabled: false,
  redirect_on_failure: true

# 今回東京リージョンのS3を使います
config :ex_aws, :s3,
  access_key_id: "XXXXXXXXXXXX",
  secret_access_key: "YYYYYYYYYYYYYYYYYYYYY",
  region: "ap-northeast-1",
  scheme: "https://"

config :pleroma, Pleroma.Uploaders.S3,
  bucket: "bucket名",
  public_endpoint: "s3.dualstack.ap-northeast-1.amazonaws.com"

# この部分でアップロード先をS3に変更します
config :pleroma, Pleroma.Upload,
  uploader: Pleroma.Uploaders.S3

# 各機能の有効化します
config :pleroma, :fe,
  show_instance_panel: true,
  scope_options_enabled: true,
  collapse_message_with_subject: true
config :pleroma, :suggestions,
  enabled: true
```

設定についてはまた今度まとめたいと思います

### systemd

`systemd` を設定します

```sh
cp /home/pleroma/pleroma/installation/pleroma.service /etc/systemd/system/pleroma.service
```

`/etc/systemd/system/pleroma.service` の `Environment` と書いてる下に `Environment="MIX_ENV=prod"` を追記します

run `systemctl enable --now pleroma.service`

## 補足説明

今回コピペするとすべて用意できるように `cat` コマンドを使ってファイルを作成してます。

```sh
cat <<EOL > 書き込む対象のファイル
ファイルの内容
EOL # 書き込み終了
```
