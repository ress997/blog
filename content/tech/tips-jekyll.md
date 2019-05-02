---
title: "Jekyll で Sass(SCSS) を css に変換し style タグ内に挿入する方法"
date: 2016-08-16 12:00:00 +0900
tags: ["Jekyll", "scss", "Sass"]
toc: true
---
jekyll を使って scss を css に変換し style タグ内に挿入したかったがやり方が分からなかったので

## やり方
```scss:css/style.scss
---
---
@charset "utf-8";
@import 'base';
@import 'layout';
```

を次のように変更する

```scss:_includes/css/style.scss
@charset "utf-8";
@import 'base';
@import 'layout';
```

次に link stylesheet で指定してたファイルを style タグ内に挿入するようにする

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

## Sass の場合
`scssify` の部分を `sassify` に変えると Sass から css に変換してくれます！

---
`scssify` を使えば良いと言うことは分かってたがビルドできなくてあれこれ試行錯誤したら問題点は scss ファイル内の YAML front matter を記述してたせいでしたorz
