---
title: "AMP で Google Analytics を利用する"
date: 2016-05-17 12:00:00 +0900
tags:
  - AMP
  - GoogleAnalytics
toc: true
aliases:
  - /tech/amp-analytics/
---
## やり方

次のスクリプト分を `<head>` 内かつ AMP JS library[^1] よりも前に以下の内容を記述

```html
<script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
```

Body 先頭に以下の内容を記述

```html
<amp-analytics type="googleanalytics" id="analytics1">
    <script type="application/json">
        {
            "vars": {
                // 通常ページのトラッキング用と、 AMP 用ではプロパティを分けて設定することが推奨
                "account": "UA-XXXXXX-Y"
            },
            "triggers": {
                "trackPageview" : {
                    "on": "visible",
                    "request": "pageview"
                }
            }
        }
    </script>
</amp-analytics>
```

ちなみに `amp-analytics` に `id` は必須ではないがデバッグのために追加しておくことが推奨

[^1]: AMP JS library は `<script async src="https://cdn.ampproject.org/v0.js"></script>` です
