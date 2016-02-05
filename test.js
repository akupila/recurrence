const expect = require('expect.js');
const recurrence = require('./index');

describe('Date recurrence', () => {
  it('should throw with invalid input', () => {
    expect(recurrence).withArgs('2016-01-01').to.throwException();
  });

  it('should return \'never\' when no diff is available', () => {
    const date = new Date();
    const result = recurrence([date, date]);
    expect(result).to.eql({
      count: 0,
      unit: 'day',
      recurrence: 'never'
    });
  });

  it('should ignore duplicate dates', () => {
    const result = recurrence([
      new Date(2016, 1, 3),
      new Date(2016, 1, 3),
      new Date(2016, 1, 3),
      new Date(2016, 1, 2),
      new Date(2016, 1, 1)
    ]);

    expect(result).to.eql({
      count: 1,
      unit: 'day',
      recurrence: 'daily'
    });
  });

  it('should extract single second', () => {
    const result = recurrence([
      new Date(2016, 1, 1, 10, 0, 1),
      new Date(2016, 1, 1, 10, 0, 0)
    ]);

    expect(result).to.eql({
      count: 1,
      unit: 'second',
      recurrence: 'every second'
    });
  });

  it('should extract multiple seconds', () => {
    const result = recurrence([
      new Date(2016, 1, 1, 10, 0, 10),
      new Date(2016, 1, 1, 10, 0, 0)
    ]);

    expect(result).to.eql({
      count: 10,
      unit: 'second',
      recurrence: 'every 10 seconds'
    });
  });

  it('should extract single minute', () => {
    const result = recurrence([
      new Date(2016, 1, 1, 10, 1),
      new Date(2016, 1, 1, 10, 0)
    ]);

    expect(result).to.eql({
      count: 1,
      unit: 'minute',
      recurrence: 'every minute'
    });
  });

  it('should extract multiple minutes', () => {
    const result = recurrence([
      new Date(2016, 1, 1, 10, 30),
      new Date(2016, 1, 1, 10, 0)
    ]);

    expect(result).to.eql({
      count: 30,
      unit: 'minute',
      recurrence: 'every 30 minutes'
    });
  });

  it('should extract single hour', () => {
    const result = recurrence([
      new Date(2016, 1, 1, 11),
      new Date(2016, 1, 1, 10)
    ]);

    expect(result).to.eql({
      count: 1,
      unit: 'hour',
      recurrence: 'hourly'
    });
  });

  it('should extract multiple hours', () => {
    const result = recurrence([
      new Date(2016, 1, 1, 12),
      new Date(2016, 1, 1, 10)
    ]);

    expect(result).to.eql({
      count: 2,
      unit: 'hour',
      recurrence: 'every 2 hours'
    });
  });

  it('should extract single day', () => {
    const result = recurrence([
      new Date(2016, 1, 3),
      new Date(2016, 1, 2),
      new Date(2016, 1, 1)
    ]);

    expect(result).to.eql({
      count: 1,
      unit: 'day',
      recurrence: 'daily'
    });
  });

  it('should extract multiple days', () => {
    const result = recurrence([
      new Date(2016, 1, 5),
      new Date(2016, 1, 3),
      new Date(2016, 1, 1)
    ]);

    expect(result).to.eql({
      count: 2,
      unit: 'day',
      recurrence: 'every 2 days'
    });
  });

  it('should extract single week', () => {
    const result = recurrence([
      new Date(2016, 1, 15),
      new Date(2016, 1, 8),
      new Date(2016, 1, 1)
    ]);

    expect(result).to.eql({
      count: 1,
      unit: 'week',
      recurrence: 'weekly'
    });
  });

  it('should extract multiple weeks', () => {
    const result = recurrence([
      new Date(2016, 1, 15),
      new Date(2016, 1, 1)
    ]);

    expect(result).to.eql({
      count: 2,
      unit: 'week',
      recurrence: 'every 2 weeks'
    });
  });

  it('should extract single month', () => {
    const result = recurrence([
      new Date(2016, 3, 1),
      new Date(2016, 2, 1),
      new Date(2016, 1, 1)
    ]);

    expect(result).to.eql({
      count: 1,
      unit: 'month',
      recurrence: 'monthly'
    });
  });

  it('should extract multiple months', () => {
    const result = recurrence([
      new Date(2016, 3, 1),
      new Date(2016, 1, 1)
    ]);

    expect(result).to.eql({
      count: 2,
      unit: 'month',
      recurrence: 'every 2 months'
    });
  });

  it('should extract single year', () => {
    const result = recurrence([
      new Date(2016, 1, 1),
      new Date(2015, 1, 1),
      new Date(2014, 1, 1)
    ]);

    expect(result).to.eql({
      count: 1,
      unit: 'year',
      recurrence: 'yearly'
    });
  });

  it('should extract single year', () => {
    const result = recurrence([
      new Date(2016, 1, 1),
      new Date(2014, 1, 1)
    ]);

    expect(result).to.eql({
      count: 2,
      unit: 'year',
      recurrence: 'every 2 years'
    });
  });

  it('should get closest value', () => {
    // dates approx every day
    // dates are at not exactly every day but
    // 'daily' is the closest approximation
    const result = recurrence([
      new Date(2016, 1, 11),
      new Date(2016, 1, 9),
      new Date(2016, 1, 8),
      new Date(2016, 1, 7),
      new Date(2016, 1, 5),
      new Date(2016, 1, 4),
      new Date(2016, 1, 2),
      new Date(2016, 1, 1)
    ]);

    expect(result).to.eql({
      count: 1,
      unit: 'day',
      recurrence: 'daily'
    });
  });

  it('should handle dates out of order', () => {
    // leap years
    const result = recurrence([
      new Date(2016, 1, 29),
      new Date(2008, 1, 29),
      new Date(2012, 1, 29),
      new Date(2004, 1, 29)
    ]);

    expect(result).to.eql({
      count: 4,
      unit: 'year',
      recurrence: 'every 4 years'
    });
  });

  it('should output number as string', () => {
    const opts = {
      numberAsString: true
    };
    expect(recurrence([new Date(2016, 1, 1), new Date(2016, 1, 3)], opts).recurrence)
      .to.equal('every two days');
    expect(recurrence([new Date(2016, 1, 1), new Date(2016, 7, 1)], opts).recurrence)
      .to.equal('every six months');
  });

  it('should throw with strict mode', () => {
    const opts = {
      strict: true
    };

    const invalid = [
      new Date(),
      'not a date'
    ];

    expect(recurrence).withArgs(invalid, opts).to.throwException();
  });

  it('should not throw with loose mode', () => {
    const opts = {
      strict: false
    };

    const invalid = [
      new Date(),
      'not a date'
    ];

    expect(recurrence).withArgs(invalid, opts).to.not.throwException();
  });

  it('should not format single values with noSingleUnits', () => {
    const result = recurrence([
      new Date(2016, 1, 1, 11),
      new Date(2016, 1, 1, 10)
    ], {
      noSingleUnits: true
    });

    expect(result).to.eql({
      count: 1,
      unit: 'hour',
      recurrence: 'every hour' // would otherwise be 'Hourly'
    });
  });
});
