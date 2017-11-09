# Server API of HacktivPress

## Description

This is a simple blogging apps created with express.js MongoDB and Vue.js

## Usage

``` bash
# install dependencies
npm install

# create a .env file like example.env.js

# serve with hot reload at localhost:3000
npm start

```

## API Endpoint of HacktivPress

### List of auth routes

|Routes|Method|Description|Required Param|
|-------|------|-------|-------|
|/api/auth/login|POST|Auth to login|<ul><li>[x] username </li><li>[x] password </li></ul>|
|/api/auth/register|POST|Register new user|<ul><li>[x] username</li><li>[x] password</li></ul>|

### List of article Routes

|Routes|Method|Description|Required Param|
|-------|------|-------|-------|
|/api/articles|GET|Read all articles data|-|
|/api/articles/:id|GET|Read one article data|<ul><li>[x] id</li></ul>|
|/api/articles/author/:author|GET|Read all article data by author|<ul><li>[x] author</li></ul>|
|/api/articles/category/:category|GET|Read all article data by category|<ul><li>[x] category</li></ul>|
|/api/articles|POST|Create one article data|<ul><li>[x] title</li><li>[x] content</li><li>[x] category</li><li>[x] author *jwttoken</li></ul>|
|/api/articles/:id|PUT|Update one article data|<ul><li>[x] id</li><li>[ ] title</li><li>[ ] content</li><li>[ ] category</li><li>[ ] author *jwttoken</li></ul>|
|/api/articles/:id|DELETE|Delete one article data|<ul><li>[x] id</li></ul>|
