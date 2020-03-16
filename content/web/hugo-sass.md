---
title: "hugo で sass を css に変換し style タグ内に挿入する方法"
date: 2019-05-22T15:41:36+09:00
tags:
  - scss
  - hugo
toc: true
aliases:
  - /tech/sass-hugo/
---
以前 [Jekyll で行う方法]({{< ref "/web/jekyll-sass.md" >}}) を書きましたが、今回は hugo で sass(scss) を css に変換し style タグ内に挿入できるようにしたいと思います。

AMP HTML のページを用意しようと思ったときに css を scss で書いてた場合に外部ツールを使って挿入するしてもいいですが静的サイトジェネレータ側で行えるのであれば完結するため紹介します！

<!--more-->

**追記**: `@charset "UTF-8";` が挿入されるようになったため変更 (2020/03/16)

## やり方

テンプレートから `assets` にアクセスする方法は簡単で例のように書くと変換後の css を挿入できます。

### 例

ここでは `/assets/main.scss` を変換し挿入します。

```html
{{ with resources.Get "main.scss" | toCSS | minify }}
	<style>{{ replace .Content `@charset "UTF-8";` "" | safeCSS }}</style>
{{ end }}
```

## あとがき

`with` でアクセスできるとは思ってなくて驚きました。

しかしこのおかげで hugo でも AMP HTML を使用するときに簡単に挿入できるようになりました！
