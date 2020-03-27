---
title: "Jekyll で sass を css に変換し style タグ内に挿入する方法"
date: 2016-08-16 12:00:00 +0900
tags:
  - Jekyll
  - SCSS
toc: true
---
jekyll を使って scss を css に変換し style タグ内に挿入したかったがやり方が分からなかったので

AMP HTML ページを用意する場合などに使えます。

**追記**: [hugo で行う方法も追記しました]({{< ref "/web/hugo-sass.md" >}})

## やり方

いままで下記のようにアクセスしてた `css` ファイルを

```html:_layouts/default.html
  <link rel="stylesheet" href="{{ site.baseurl }}/css/style.css">
```

を次のように変更する

```html:_layouts/default.html
<style>
{% capture styles %}
    {% include css/style.scss %}
{% endcapture %}
{{ styles | scssify }}
</style>
```

簡単に解決することができました。

## Sass の場合

`scssify` の部分を `sassify` に変えると Sass から css に変換してくれます！
