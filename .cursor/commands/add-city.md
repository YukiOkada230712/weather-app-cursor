---
description: 天気ダッシュボードに新しい都市を追加する
---

以下の都市を天気ダッシュボードに追加してください：
都市名：{{city_name}}
緯度：{{latitude}}
経度：{{longitude}}

追加時の要件：
- CityButton（atoms）を使う
- 都市の型定義（City interface）を更新する
- CitySelector に新しい都市を追加する
- __tests__/ に対応するテストを追加する
- コミットメッセージは「feat: {{city_name}}を追加」とする