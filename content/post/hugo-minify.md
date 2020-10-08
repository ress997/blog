---
title: "Hugo で minify をサポート"
date: 2018-08-17T20:54:38+09:00
author: ["Ress"]
image: "https://res.cloudinary.com/dagsofv2s/image/upload/q_auto:good/blog/post/hugo-minify/thumbnail.png"
tags:
  - Hugo
categories: ["tech"]
---
最近嬉しい更新が多い Hugo に `minify` オプションが追加されました！

詳しくは [公式ブログ](https://gohugo.io/news/0.47-relnotes/) を見てください。

## minify

今まではテンプレートファイルの改行をなるべく減らしたり、`{{-` や `-}}` で不要な改行を削除してました。
また、人によってはタスクランナーを使用してたと思われます。

これからは `hugo --minify` とオプションを追加するだけで縮小されたコードを吐き出してくれます！

(早速のこのブログも `minify` オプションを有効化しています)
