---
title: "Mastodon をカスタマイズする"
date: 2017-12-04 12:00:00 +0900
tags:
  - Mastodon
  - Rails
toc: true
---
この記事は [Mastodon Advent Calendar 2017 - Qiita](https://qiita.com/advent-calendar/2017/mastodon) と [Mastodon 2 Advent Calendar 2017 - Adventar](https://adventar.org/calendars/2265) の5日目の記事です。

昨日は [@xserver](https://qiita.com/xserver) さんによる [インスタンス運用アンチパターン](https://qiita.com/xserver/items/d6b616dca1f346a2313c) と [@Denmaaaa](https://adventar.org/users/17459) さんによる [具体的分析結果から考える神崎の倒し方](http://denmaaa.hatenablog.com/entry/2017/12/04/000000) でした。

## はじめに

Mastodon 使いやすくするために制限を緩和しようとしましたが、ドキュメントがなく Rails 初心者の私が行った簡単なカスタマイズを書きたいと思います。

使用してるバージョンは **v2.0.0** です。

## 文字数制限の緩和

**注意:** 長文を投稿することができるようになり TL(タイムライン) が荒れる可能性があります。
また、自分のインスタンスのみだけではなく他のインスタンスにも迷惑がかかるのでしっかりとルールを設定し行うことをすすめます。

- 本体側の制限を緩和

```diff:app/validators/status_length_validator.rb
 # frozen_string_literal: true

 class StatusLengthValidator < ActiveModel::Validator
-  MAX_CHARS = 500
+  MAX_CHARS = 4096

   def validate(status)
     return unless status.local? && !status.reblog?
```

- Web UI 側の制限を緩和

```diff:app/javascript/mastodon/features/compose/components/compose_form.js
           </div>

           <div className='compose-form__publish'>
-            <div className='character-counter__wrapper'><CharacterCounter max={500} text={text} /></div>
-            <div className='compose-form__publish-button-wrapper'><Button text={publishText} onClick={this.handleSubmit} disabled={disabled || this.props.is_uploading || length(text) > 500 || (text.length !== 0 && text.trim().length === 0)} block /></div>
+            <div className='character-counter__wrapper'><CharacterCounter max={4096} text={text} /></div>
+            <div className='compose-form__publish-button-wrapper'><Button text={publishText} onClick={this.handleSubmit} disabled={disabled || this.props.is_uploading || length(text) > 4096 || (text.length !== 0 && text.trim().length === 0)} block /></div>
           </div>
         </div>
       </div>
```

## 投稿画像の画質制限の緩和

**注意:** この機能を使用する際は AWS S3 などのストレージサービスを使用してない場合、容量をガンガン削られるので使用することをオススメします。

変更箇所は2点です。

- 画像の解像度を変更

```diff:app/models/media_attachment.rb
   IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif'].freeze
   VIDEO_MIME_TYPES = ['video/webm', 'video/mp4'].freeze

-  IMAGE_STYLES = { original: '1280x1280>', small: '400x400>' }.freeze
+  IMAGE_STYLES = { original: '3840x2160>', small: '400x400>' }.freeze
   VIDEO_STYLES = {
     small: {
       convert_options: {
```

- 投稿画像のファイル容量制限を変更

```diff:app/models/media_attachment.rb
   include Remotable

   validates_attachment_content_type :file, content_type: IMAGE_MIME_TYPES + VIDEO_MIME_TYPES
-  validates_attachment_size :file, less_than: 8.megabytes
+  validates_attachment_size :file, less_than: 20.megabytes

   validates :account, presence: true
   validates :description, length: { maximum: 420 }, if: :local?
```

これにより画像の制限をオリジナル画像では 1280x1280 から 3840x2160 へ緩和しファイルの容量制限を 8MB から 20MB へと変更されます。

## テーマ機能

テーマ機能については [公式ドキュメント](https://github.com/tootsuite/documentation/blob/master/Running-Mastodon/Customizing.md#customizing-style) がありますが日本語の記事がなかったので書こうと思いました。

内容を変更したファイルを追加します

```scss:app/javascript/styles/custom.scss
// カスタム内容の例
$ui-highlight-color: #d3d900;

@import 'application';
```

コンフィグにテーマファイルを追記します

```diff:config/themes.yml
 default: styles/application.scss
+custom: styles/custom.scss
```

表示名を追加します。

```diff:config/locales/en.yml
     title: "%{instance} Terms of Service and Privacy Policy"
   themes:
     default: Mastodon
+    custom: Custom
   time:
     formats:
       default: "%b %d, %Y, %H:%M"
```

## おまけ: 管理者権限の剥奪

先日間違って一般ユーザーに Admin権限 を付与してしまったので権限を一般ユーザーに戻したときのメモです。


まず Rails のコンソールを開きます

```zsh
# 直接インストールしてる場合
RAILS_ENV=production bundle exec rails console
# docker-compose を利用してる場合
docker-compose rails console
```

ユーザーネームを指定し権限を更新します

```ruby
user = User.joins(:account).where(accounts:{username:'ユーザーネーム'})
user.update(admin: false)
```

ちなみに [ソースコード](https://git.io/vbIQC) を見ながら行いました。

## さいごに

"ここはもっとこうするといいよ!" みたいなものがありましたら教えてください！
