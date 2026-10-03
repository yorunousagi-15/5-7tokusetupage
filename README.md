# midorino5-7 class homepage / v4

「一人一人の個性が輝く最高のクラス」を中心に、勉強・給食・遊びのメリハリ、ギャラリー、ニュースPDFを扱えるようにした版です。

## PDFニュースの追加方法

GitHub Pagesは静的サイトなので、サイト上のボタンからPDFをサーバーへ保存することはできません。
その代わり、GitHubのリポジトリにPDFを追加し、`news-data.js` に1件追加するとニュースとして表示できます。

1. PDFファイルを `index.html` や `news.html` と同じ場所にアップロードします。
2. `news-data.js` の `CLASS_NEWS` に次のようなデータを追加します。

```js
{
  date: "2026-10-03",
  category: "行事 / お知らせ",
  title: "学習発表会のお知らせ",
  description: "日時や持ち物などをまとめています。",
  pdf: "gakusyu-happyo.pdf"
}
```

3. GitHub Pagesへ反映すると、トップページのNEWS欄と `news.html` の両方に表示されます。

ZIP直下でそのままGitHub Pagesに置けます。
