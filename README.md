# Introduction

App that allows you to track your expenses on a monthly basis. With this app, you can easily input your monthly expenses, categorize them, and visualize your spending habits.

Check frontend app [here](https://github.com/gentritabazi/monthly-expenses-app-frontend).

## Online App

TBA

## Requirements

NodeJs Version >= 14.x

## Installation

Create `.env` file based on `.env.example`.

Install project packages with `npm install`.

Generate a new `APP_KEY` secret with command `node ace generate:key` and paste value to `.env` file for the `APP_KEY`.

Start the server with command `npm run dev`.

## Fake Data

For development, you can use factories and seeders.

App contains some seeders to populate the database.

Run `node ace db:seed -i` and select seeders you want to run.
