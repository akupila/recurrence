const _ = require('lodash');

module.exports = function(dates, options) {
  if (!Array.isArray(dates)) {
    throw new TypeError('Dates must be an array');
  }

  options = Object.assign({}, {
    numberAsString: false,
    strict: false,
    noSingleUnits: false
  }, options);

  dates = _
    // Remove duplicate dates
    .uniqBy(dates.filter(date => {
      // Check if date is a date
      if (date instanceof Date) {
        return true;
      }
      // not a date!
      if (options.strict) {
        throw new TypeError(`${typeof date} is not a date`);
      } else {
        return false;
      }
    }), date => date.getTime())
    // Sort by date descending
    .sort((date1, date2) => date2.getTime() - date1.getTime());

  if (dates.length <= 1) {
    // no recurrence
    return {
      count: 0,
      unit: 'day',
      recurrence: 'never'
    };
  }

  // -----------------------------------------------------

  var tmp;
  var cumulative = 0;
  dates.forEach(date => {
    var now = date.getTime() / 1000;
    if (tmp) {
      var delta = tmp - now;
      cumulative += delta;
    }
    tmp = now;
  });

  const seconds = Math.round(cumulative / (dates.length - 1));
  var count = seconds;

  const units = [{
    count: 1,
    name: 'second',
    single: 'every second'
  }, {
    count: 60,
    name: 'minute',
    single: 'every minute'
  }, {
    count: 60,
    name: 'hour'
  }, {
    count: 24,
    name: 'day',
    single: 'daily'
  }, {
    count: 7,
    name: 'week'
  }, {
    count: 4,
    name: 'month'
  }, {
    count: 12,
    name: 'year'
  }, {
    count: 1000,
    name: 'ignore'
  }];

  var i = 0;
  var divider = 1;
  const n = units.length;
  while (count >= units[i + 1].count && i < n - 2) {
    i++;
    divider *= units[i].count;
    count = Math.floor(seconds / divider);
  }

  count = Math.round(count);

  function formatNumber(nr) {
    if (!options.numberAsString) {
      return nr;
    }
    return ['one','two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven'][nr - 1];
  }

  const unit = units[i].name;
  var recurrence;
  if (count === 1) {
    if (!options.noSingleUnits) {
      recurrence = `${units[i].single || unit + 'ly'}`;
    } else {
      recurrence = `every ${unit}`;
    }
  } else {
    recurrence = `every ${formatNumber(count)} ${unit}s`;
  }

  return {
    count: count,
    unit: unit,
    recurrence: recurrence
  };
}
