# Account Management

A desktop application to record the details of all third-party accounts you may
have created.

## Why?

It's easy to accumulate slightly more accounts with organisations than you can
remember, eg:

- Bank accounts
- Accounts at online retailers
- Accounts on government systems (eg tax, immigration, student loans)
- Etc

Having a record of where you have accounts and what each account knows about
you (eg the address they have on file for you) helps you in many ways, eg:

- Helping you with financial planning
- Helping you to remember your passwords
- Helping you know what needs changed when you move house
- Helping you working out if you have an account at an organisation affected
  by a security leak

## Installation

This is still in early stages of development. The only way to install it is to
clone this repo, then run `yarn install`.

## Development

- Run tests with `make test`
- Run the hot-reloading React app with `make start`
- Run the electron app with `make start_electron` (depends on having the React
  app also running)

### Origins

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/)
template.

## License

MIT
