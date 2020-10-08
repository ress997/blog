---
title: "Speed Wi-Fi NEXT W06 を USBで接続する"
date: 2019-06-11T16:32:30+09:00
author: ["Ress"]
image: "https://res.cloudinary.com/dagsofv2s/image/upload/q_auto:good/blog/post/w06-usb/thumbnail.png"
tags:
  - Arch Linux
  - Huawei
  - WiMAX
categories: ["tech"]
---
外出時にパソコンを使う機会が多くモバイルルーターを契約しました。

そこで Speed Wi-Fi NEXT W05 にクレードルを接続して有線接続をしてました。

しかし Speed Wi-Fi NEXT W06 に機種変したことによって有線接続ができなくなりました。

そこで usb 接続でできないか調べたところ日本語情報がなかったのでここに掲載します！
<!--more-->

## 環境

モバイルルーターとパソコンとは Type-C の**通信可能**なケーブルで接続します

- Arch Linux
- Huawei 製モバイルルーター
    - Speed Wi-Fi NEXT W06

今回 **Arch Linux** を使用してますが Ubuntu / Debian など他ディストリビューションの場合は読み替えて設定を行ってください。

## やり方

まず `lsusb` で下記のようにルーターを認識してるか確認します

```bash
Bus 002 Device 003: ID 12d1:1f01 Huawei Technologies Co., Ltd. E353/E3131 (Mass storage mode)
```

今回 `usb_modeswitch` を使用するためインストールします。

```bash
sudo pacman -S usb_modeswitch
```

ネットワークデバイスとして使用できるように書き換えます。

```bash
sudo usb_modeswitch -v 12d1 -p 1f01 -V 12d1 -P 14DC -J 
```

`lsusb` で成功したか確認します。

```bash
Bus 002 Device 003: ID 12d1:14db Huawei Technologies Co., Ltd. E353/E3131
```

上記のように `(Mass storage mode)` が消え `ID` が `12d1:1f01` から `12d1:14db` に変わってたら成功です。

あとはそれぞれの環境にインストールされてる `NetworkManager` などを使用し接続してください
