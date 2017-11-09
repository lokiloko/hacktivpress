# Server API of HacktivPress

## Description

This is a simple blogging apps created with express.js MongoDB and Vue.js

## Usage

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm start

```

## API Endpoint of HacktivPress

### List of auth routes

|Routes|Method|Description|Required Param|
|-------|------|-------|-------|
|/api/auth/login|POST|Auth to login|<ul><li>[x] username (string) </li><li>[x] password (string)</li></ul>|
|/api/auth/register|POST|Register new user|<ul><li>[x]username</li><li>[x]password</li></ul>|

### List of article Routes

|Routes|Method|Description|Required Param|
|-------|------|-------|-------|
|/api/articles|GET|Read all articles data|-|
|/api/articles/:id|GET|Read one article data|<li>[x]id</li>|
|/api/articles/author/:author|GET|Read all article data by author|<li>[x]author</li>|
|/api/articles/category/:category|GET|Read all article data by category|<li>[x]category</li>|
|/api/articles|POST|Create one article data|<li>[x]title</li><li>[x]content</li><li>[x]category</li><li>[x]author</li>|
|/api/articles/id|PUT|Update one article data|<li>[x]id</li><li>[ ]title</li><li>[ ]content</li><li>[ ]category</li><li>[ ]author</li>|
|/api/articles/:id|DELETE|Delete one article data|<li>[x]id</li>|
