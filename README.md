# facebook-messenger-bot

# Facebook Messenger Bot

To develop a facebook messenger bot for respond.io

- NodeJS
- MongoDB
- Express

## Features

- Greeting Message
- Query Resolving
- Email Notification

## Installation

Dillinger requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd facebook-messenger-bot
npm i
npm run dev
or
npm run start
```

env file requirement

```sh
NODE_ENV
PORT
WEBHOOK_ACCESS_TOKEN
APP_SECRET
MONGODB_CONNECTION_STRING
SENDGRID_API_KEY
VERIFIED_SENDER_EMAIL
RECEIVER_EMAIL
```

.env
| KEY | DESCRIPTION |
| ------ | ------ |
| NODE_ENV | production, staging or development |
| PORT | server port |
| WEBHOOK_ACCESS_TOKEN | Facebook Webhook's Token |
| APP_SECRET | Facebook Developer App's Secret |
| MONGODB_CONNECTION_STRING | Mongodb connection string |
| SENDGRID_API_KEY | SendGrid api key |
| VERIFIED_SENDER_EMAIL | Verified sending email set in sendgrid |
| RECEIVER_EMAIL | Email which you want to receive notifications |

How to solve the high volume of write operations in RDS MySQL databases?

- By using caching, such as Redis to store data. This can reduce the number of writes that are frequently needed to the database as the frequently accessed data can be served from the cache instead.
- Use a queuing system to execute the database queries x number of times per minute.
-
