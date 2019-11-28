---
title: "forestry.io Tips"
date: 2018-09-21 12:00:00 +0900
tags:
  - forestry
toc: true
aliases:
  - /tech/tips-forestry/
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

{{< gyazo id="1ea8ec3fb841a73f518b776271fd6513" >}}

`Add New` ボタンを押し `Create Pages` で設定する `TITLE` はファイル名に使用されます。

そこで slug は英語、タイトルは日本語と分けたい場合は注意が必要です。
上記のタイトルを英語 slug、Front Matter で日本語のタイトルとすることによって分けることができます
