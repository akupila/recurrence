# reoccurance

[![build status](https://travis-ci.org/akupila/reoccurance.svg?branch=master)](https://travis-ci.org/akupila/reoccurance)
[![Coverage Status](https://coveralls.io/repos/github/akupila/reoccurance/badge.svg?branch=master)](https://coveralls.io/github/akupila/reoccurance?branch=master)

Calculates the diff between dates and returns a nicely formatted string.

Turns an array of dates into:

- every 4 days
- monthly
- every 10 hours
- etc

## Installation

```
npm install --save reoccurance
```

## Usage

```js
const reoccurance = require('reoccurance');

const dates = [
  new Date(2016, 1, 1),
  new Date(2016, 1, 2)
  new Date(2016, 1, 3)
];

console.log(reoccurance(dates));
```

Duplicate dates are removed and the order doesn't matter.

## Output

```json
{
  "count": 1,
  "unit": "day/week/month/year",
  "reoccurance": "Daily"
}
```

In the output `reoccurance` is set to something that you could show directly to a user.

Values look like this:

- every 5 seconds
- every 30 minutes
- hourly
- every 8 hours
- daily
- every 3 weeks
- monthly
- yearly
- every 10 years

Of course you can use the `count` and `unit` for your own output, maybe for other languages or otherwise different results.

## Options

You can pass an options object as the second argument.

Defaults:

```json
{
  "numberAsString": false,
  "strict": false,
  "noSingleUnits": false
}
```

Override any of these by passing in an object:

```js
reoccurance(dates, {
  strict: true,
  numberAsString: true
});
```

### numberAsString

Outputs the number as a text:

- true: 'Every four years'
- false: 'Every 4 years'

### strict

Throw an exception if an invalid date is detected. With `strict = false` just ignores the date.

### noSingleUnits

Doesn't format strings as `daily` or `yearly` so it returns `Every second/hour/month/year` etc instead of `daily` or `weekly`

## Example

```js
const reoccurance = require('reoccurance');

const leapyears = [
  new Date(2016, 1, 29),
  new Date(2012, 1, 29)
  new Date(2008, 1, 29)
];

const result = reoccurance(leapyears, {
  numberAsString: true  
});

console.log(`Leap year happens ${result.reoccurance}!`);
// Leap year happens every four years!
```

## Test

```bash
npm run test
```

## Coverage

```bash
npm run cover
```
