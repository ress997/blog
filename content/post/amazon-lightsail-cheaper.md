---
title: "Amazon Lightsail が国内最安に"
date: 2018-08-24T18:16:52+09:00
author: ["Ress"]
image: "https://res.cloudinary.com/dagsofv2s/image/upload/q_auto:good/blog/post/amazon-lightsail-cheaper/thumbnail.png"
tags:
  - AWS
  - Amazon Lightsail
categories: ["tech"]
---
[Developers.IO](https://dev.classmethod.jp/cloud/aws/amazon-lightsail-cheaper/) でも紹介されましたが AWS の VPS と言われている Amazon Lightsail がほぼ半額になり(私が知ってる中で)国内最安となりました。

## Amazon Lightsail とは

Amazon Lightsail とは AWS の EC2 をより簡単に使えるようにした VPS です。

EC2 に比べるとファイヤーウォールが貧弱だったりしますが問題なく使えると思います。

### ファイヤーウォール

EC2 では AWS 側で特定の IP アドレスのみ特定のポート(例: 22番ポート)をアクセス許可するなど柔軟な設定をすることが可能です。
しかし Lightsail では `0.0.0.0` に対して外部からのアクセスに関して特定のポートをを許可するようになってます。

ですが、ConoHa などの他 VPS サービスでも同じように外部からの接続に対して特定のポートを通すようなファイヤーウォールなので問題ないと思います。

### ブラウザコンソール

Lightsail でも他 VPS のようにブラウザからコンソールを開くことができます。

しかし他 VPS ではいわいる “サーバーコンソール” ですが Lightsail では SSH コンソールとなってるためなにか問題あったときに “強制的になにかやる” と言ったことができないので注意が必要です。

### 料金について

Lightsail では他 VPS と同じように停止中でも課金されます。

また [公式サイト](https://aws.amazon.com/jp/lightsail/) が執筆時点では古い料金での表示となってるので気をつけてください。
(ちなみに、ログイン後の新規作成画面では新料金になってます)

## まとめ

国内最安となった Lightsail は初心者には難しい部分がありますが、コストパフォーマンス的に優れているのでこれから活用していきたいと思います。
