# midorino5-7 class homepage

静的HTML/CSS/JavaScriptで動く学級ホームページです。

## 写真を追加する
1. 写真ファイル（jpg/png/webpなど）をこのフォルダに追加
2. `gallery-data.js` の `CLASS_GALLERY` に1件追加
3. GitHub Pagesへアップロード

例:
```js
{
  image: "ensoku.jpg",
  title: "遠足の日",
  description: "みんなで出かけた日の一枚。"
}
```

## PDFニュースを追加する
1. PDFファイルをこのフォルダに追加
2. `news-data.js` の `CLASS_NEWS` に1件追加
3. GitHub Pagesへアップロード

例:
```js
{
  date: "2026-10-03",
  category: "行事 / お知らせ",
  title: "学習発表会のお知らせ",
  description: "日時や持ち物などをまとめています。",
  pdf: "gakusyu-happyo.pdf"
}
```


## 写真が表示される仕組み
最初のテスト写真は gallery.html にも直接書いてあるので、gallery-data.js や JavaScript が何らかの理由で読み込めなくても写真自体は表示されます。追加写真は gallery-data.js に登録して、画像ファイルをルートに置いてください。
