# Chat-space DB設計

## userテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false|
|mail|string|null: false, unique: true|
|password|string|null: false|

### Association
- has_many :comments
- has_many :user_groups
- has_many :groups, through: :user_groups

## commentテーブル
|Column|Type|Options|
|------|----|-------|
|text|text||
|image|string||
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## groupテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :comments
- has_many :user_groups
- has_many :users, through: :user_groups

## user_groupテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
