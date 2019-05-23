---
title: "cloudinary が便利!"
date: 2018-09-20 16:00:00 +0900
tags: ["cloudinary"]
toc: true
---
最近[ホスティングを変更した]({{< ref "/tech/blog-change-hosting.md" >}})関係で 1GB 以上になると料金が発生します。
そこで無料で使用できる画像管理サービスを探しました。

Gyazo や imgix など様々なサービスと比較していった中で cloudinary を使うことにしました。

## 特徴

- 最適な画像形式に自動変換ができる
- 様々な画像加工ができる
- 画像の CDN 配信

などがあり無料で 30万枚/10GB まで保存することができます。

### 最適な画像形式に変換
cloudinary に保存した写真は以下のような形式で配信されます

`https://res.cloudinary.com/<cloud name>/image/upload/<option: 省略可能>/<path>`

このオプションの部分に `f_auto` を追加することによって WebP など最適な形式に変換し画像を配信することができます。

また、`q_auto` を追加することによって画像のサイズを最適化することができます。
(ちなみに複数のオプションを書く場合はコンマ区切りで書きます)

### 様々な画像加工ができる
これも先程のオプション部分に対して書くと可能です。

[Cloudinaryを使って画像の変換をやってみる](https://qiita.com/kanaxx/items/7d88948c9f8f43cdf760)に日本語で詳しく書いてあります。

### 画像の CDN 配信
> FAST DELIVERY Get your images and videos delivered lightning-fast, responsively and highly optimized for any device in any location. Assets are served via Akamai, Fastly and CloudFront CDN.

と書いてあるように Akamai と Fastly と CloudFront を使って画像の CDN 配信を行ってくれます。

## CMS と連携
みんな大好き WordPress や私の使ってる forestry.io に対応してます!

WordPress の場合はアドオンとして対応してます。
アドオンをインストール後 [cloudinary にログイン](https://cloudinary.com/console)すると表示される Account Details の Environment variable を設定することで使えるようになります。

forestry.io の場合 Media 設定から指定することができます。
(詳しくは [公式ドキュメント](https://forestry.io/docs/media/cloudinary/)に書いてあります)

## さいごに
cloudinary によって画像管理を簡単に行うことがます。
ほかにも簡単に画像加工を行ったり、高速に配信されるためおすすめです!
