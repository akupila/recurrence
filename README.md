# recurrence

[![build status](https://travis-ci.org/akupila/recurrence.svg?branch=master)](https://travis-ci.org/akupila/recurrence)
[![Coverage Status](https://coveralls.io/repos/github/akupila/recurrence/badge.svg?branch=master)](https://coveralls.io/github/akupila/recurrence?branch=master)

Calculates the diff between dates and returns a nicely formatted string.

Turns an array of dates into:

- every 4 days
- monthly
- every 10 hours
- etc

## Installation

```
npm install --save recurrence
```

## Usage

```js
const recurrence = require('recurrence');

const dates = [
  new Date(2016, 1, 1),
  new Date(2016, 1, 2),
  new Date(2016, 1, 3),
  new Date(2016, 1, 4),
  new Date(2016, 1, 6)
];

console.log(recurrence(dates));
// { count: 1, unit: 'day', recurrence: 'daily' }
```

Duplicate dates are removed and the order doesn't matter.

The result will be something that should make sense to a human. 
For instance in the example above the last item is not 1 day later but the events are approximately 1 day apart.

## Output

```json
{
  "count": 1,
  "unit": "day/week/month/year",
  "recurrence": "Daily"
}
```

In the output `recurrence` is set to something that you could show directly to a user.

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
recurrence(dates, {
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
const recurrence = require('recurrence');

const leapyears = [
  new Date(2016, 1, 29),
  new Date(2012, 1, 29),
  new Date(2008, 1, 29)
];

const result = recurrence(leapyears, {
  numberAsString: true  
});

console.log(`Leap year happens ${result.recurrence}!`);
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
