# 5-7

クラス用ホームページです。

## 写真を追加する

1. 写真ファイルをこのフォルダ（GitHubのリポジトリのルート）に入れる。
2. `gallery-data.js` の `photos` に1件追加する。

```js
{
  image: 'ensoku.jpg',
  title: '遠足の日',
  description: 'みんなで楽しく過ごしました。'
}
```

## ニュース・PDFを追加する

1. PDFや写真をリポジトリのルートに入れる。
2. `news-data.js` の `news` に1件追加する。

PDFだけなら `pdf`、写真付きなら `image` も書く。

```js
{
  date: '2026-10-10',
  category: '行事',
  title: '校外学習のお知らせ',
  description: '持ち物などをまとめています。',
  pdf: 'kougai.pdf'
}
```

写真付きニュース:

```js
{
  date: '2026-10-12',
  category: 'クラスの様子',
  title: '今日の5-7',
  description: 'みんなで楽しく活動しました。',
  image: 'today.jpg'
}
```

## ファイル

- `index.html` トップページ
- `news.html` ニュースページ
- `gallery.html` ギャラリー
- `news-data.js` ニュース・PDF追加用
- `gallery-data.js` 写真追加用
- `style.css` デザイン
- `script.js` 動きと一覧表示
