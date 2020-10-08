---
title: "forestry.io Tips"
date: 2018-09-21T12:00:00+09:00
author: ["Ress"]
image: "https://res.cloudinary.com/dagsofv2s/image/upload/q_auto:good/blog/post/forestry/thumbnail.png"
tags:
  - forestry
categories: ["tech"]
---
forestry.io でサイトを更新するときにちょっと工夫しないと大変な部分があったので紹介していきます!

今後も更新し追加していく予定です。

## タイムゾーン

タイムゾーンを日本に変更します。

1. `settings` を開く
1. `TIMEZONE` を `(GTM+09:00) Osaka` に変更する

(バグなのか `(GTM+09:00) Tokyo` は選べませんでした)

## ファイル名

forestry.io で記事を追加するときにタイトルとファイル名の取扱に注意が必要です。

![](https://res.cloudinary.com/dagsofv2s/image/upload/f_auto,q_auto:good/blog/post/forestry/1)

`Add New` ボタンを押し `Create Pages` で設定する `TITLE` はファイル名に使用されます。

そこで slug は英語、タイトルは日本語と分けたい場合は注意が必要です。
上記のタイトルを英語 slug、Front Matter で日本語のタイトルとすることによって分けることができます
