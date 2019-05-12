---
title: "HUGO 0.47: Hugo Reloaded リリース"
date: 2018-08-17 20:54:38 +0900
tags: ["Hugo"]
toc: true
thumbnail: "https://res.cloudinary.com/dagsofv2s/image/upload/f_auto,q_auto:good/blog/thumbnail/hugo-reloaded"
---
最近嬉しい更新が多い Hugo に `minify` オプションが追加されました！

詳しくは [公式ブログ](https://gohugo.io/news/0.47-relnotes/) を見てください。

## minify
今まではテンプレートファイルの改行をなるべく減らしたり、`{{-` や `-}}` で不要な改行を削除してました。
また、人によってはタスクランナーを使用してたと思われます。

これからは `hugo --minify` とオプションを追加するだけで縮小されたコードを吐き出してくれます！

(早速のこのブログも `minify` オプションを有効化しています)
