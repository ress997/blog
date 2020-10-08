---
title: "Arch Linux パッケージを選定した"
date: 2019-07-10T14:29:50+09:00
author: ["Ress"]
image: "https://res.cloudinary.com/dagsofv2s/image/upload/q_auto:good/blog/post/paclist-v1/thumbnail.png"
tags:
  - Arch Linux
categories: ["tech"]
---
Arch Linux を使用しててパッケージが増えすぎたので整理も兼て選定しました。
<!--more-->

## System

今回パッケージを選ぶときに `python2`, `qt4`, `qt5`, `gtk2` を使用しないようにしました。

### Core

- `intel-ucode`
- `linux-zen`
- `yay-bin`

今回は [ZEN Kernel](https://github.com/zen-kernel/zen-kernel) を使用しインテルのマイクロコードなどを追加しました

### Lib

- `btrfs-progs`
- `exfat-utils`
- `libsecret`
- `libu2f-host`
- `libxss`
- `aic94xx-firmware`
- `wd719x-firmware`

Yubikey や Btrfs などのドライバを追加しました。

### Base

- `wayland`
	- `xorg-server-xwayland`

いままで wayland を試したことがなかったので導入します。
動かないアプリが発生しないように xwayland も導入しておきます。

- `rescached-git`

DNS のクリエを標準のままではキャッシュしてくれないので導入しました。

- `xdg-user-dirs`

XDG ユーザーディレクトリに従ってディレクトリ構造を共通化したいため導入します

- `usb_modeswitch`

前回記事にも書きましたがモバイルルーターを接続するために入れます。

- `intel-media-driver`
- `ttf-noto-fonts-simple`
- `ttf-twemoji-color`
- `mailcap-mime-types`
- `xdg-utils`

- `pulseaudio`
- `pulseaudio-alsa`

### GUI

- `adwaita-icon-theme`
- `arc-gtk-theme`
- `arc-icon-theme`
- `gsettings-desktop-schemas-git`
- `gtk3-mushrooms`
- `numix-cursor-theme`

- `sway`
	- `swaylock`
	- `waybar`

#### Tools

- `fcitx5-anthy-git`
	- `enchant-pure`

IME

- `light`

ディスプレイの明るさ

- `mako`

通知

- `wl-clipboard`

クリップボード

- `rofi`
- `rofi-dmenu`

ランチャー

- `grim`
	- `slurp`

スクショ

#### App

- `opera`
	- `profile-sync-daemon`

ブラウザ! `profile-sync-daemon` を使って高速化

- `pavucontrol`

音量ミキサー

- `pcmanfm-gtk3`
	- `gvfs`

ファイラー

- `vimiv`
	- `libgexiv2`

画像ビューア

- `xarchiver`
	- `p7zip`
	- `unrar`
	- `unzip`
	- `zip`

展開!

- `deadbeef`

音楽プレイヤー

## Net

- `connman-git`
	- `iwd-git`
- `connman-gtk`

`netctl` でもいいのですが `iwd` を使用したかったので

## Dev

- `zsh`

`zsh` 派なので

- `go`
- `nodejs-lts-dubnium`
	- `yarn`

開発に使用する言語もインストール

- `bat`
- `exa`
- `fd`
- `fzy`
- `ghq-bin`
- `ripgrep`
- `tig`

便利な cli で動くツールたち

- `docker-bin`
- `docker-compose-bin`
- `kind-bin`
- `kubectl-bin`

仮想化関係も入れておきます

- `alacritty`

ターミナル

- `google-chrome-dev`

最新の変更を調査するためと開発ツールが便利なので

- `neovim`
	- `python-neovim`

エディタ!
昔は Vim でした...

- `openssh`

`ssh` しようと思ったら**存在しない**と起こられたことがあるので明示してインストールしてます。

- `yaskkserv`

`eskk.vim` で仕様してます。

## etc.

- `keybase`
- `seahorse-git`

たまーに使うツール
