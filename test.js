const expect = require('expect.js');
const reoccurance = require('./index');

describe('Date reoccurance', () => {
  it('should throw with invalid input', () => {
    expect(reoccurance).withArgs('2016-01-01').to.throwException();
  });

  it('should return \'never\' when no diff is available', () => {
    const date = new Date();
    const result = reoccurance([date, date]);
    expect(result).to.eql({
      count: 0,
      unit: 'day',
      reoccurance: 'never'
    });
  });

  it('should ignore duplicate dates', () => {
    const result = reoccurance([
      new Date(2016, 1, 3),
      new Date(2016, 1, 3),
      new Date(2016, 1, 3),
      new Date(2016, 1, 2),
      new Date(2016, 1, 1)
    ]);

    expect(result).to.eql({
      count: 1,
      unit: 'day',
      reoccurance: 'daily'
    });
  });

  it('should extract single second', () => {
    const result = reoccurance([
      new Date(2016, 1, 1, 10, 0, 1),
      new Date(2016, 1, 1, 10, 0, 0)
    ]);

    expect(result).to.eql({
      count: 1,
      unit: 'second',
      reoccurance: 'every second'
    });
  });

  it('should extract multiple seconds', () => {
    const result = reoccurance([
      new Date(2016, 1, 1, 10, 0, 10),
      new Date(2016, 1, 1, 10, 0, 0)
    ]);

    expect(result).to.eql({
      count: 10,
      unit: 'second',
      reoccurance: 'every 10 seconds'
    });
  });

  it('should extract single minute', () => {
    const result = reoccurance([
      new Date(2016, 1, 1, 10, 1),
      new Date(2016, 1, 1, 10, 0)
    ]);

    expect(result).to.eql({
      count: 1,
      unit: 'minute',
      reoccurance: 'every minute'
    });
  });

  it('should extract multiple minutes', () => {
    const result = reoccurance([
      new Date(2016, 1, 1, 10, 30),
      new Date(2016, 1, 1, 10, 0)
    ]);

    expect(result).to.eql({
      count: 30,
      unit: 'minute',
      reoccurance: 'every 30 minutes'
    });
  });

  it('should extract single hour', () => {
    const result = reoccurance([
      new Date(2016, 1, 1, 11),
      new Date(2016, 1, 1, 10)
    ]);

    expect(result).to.eql({
      count: 1,
      unit: 'hour',
      reoccurance: 'hourly'
    });
  });

  it('should extract multiple hours', () => {
    const result = reoccurance([
      new Date(2016, 1, 1, 12),
      new Date(2016, 1, 1, 10)
    ]);

    expect(result).to.eql({
      count: 2,
      unit: 'hour',
      reoccurance: 'every 2 hours'
    });
  });

  it('should extract single day', () => {
    const result = reoccurance([
      new Date(2016, 1, 3),
      new Date(2016, 1, 2),
      new Date(2016, 1, 1)
    ]);

    expect(result).to.eql({
      count: 1,
      unit: 'day',
      reoccurance: 'daily'
    });
  });

  it('should extract multiple days', () => {
    const result = reoccurance([
      new Date(2016, 1, 5),
      new Date(2016, 1, 3),
      new Date(2016, 1, 1)
    ]);

    expect(result).to.eql({
      count: 2,
      unit: 'day',
      reoccurance: 'every 2 days'
    });
  });

  it('should extract single week', () => {
    const result = reoccurance([
      new Date(2016, 1, 15),
      new Date(2016, 1, 8),
      new Date(2016, 1, 1)
    ]);

    expect(result).to.eql({
      count: 1,
      unit: 'week',
      reoccurance: 'weekly'
    });
  });

  it('should extract multiple weeks', () => {
    const result = reoccurance([
      new Date(2016, 1, 15),
      new Date(2016, 1, 1)
    ]);

    expect(result).to.eql({
      count: 2,
      unit: 'week',
      reoccurance: 'every 2 weeks'
    });
  });

  it('should extract single month', () => {
    const result = reoccurance([
      new Date(2016, 3, 1),
      new Date(2016, 2, 1),
      new Date(2016, 1, 1)
    ]);

    expect(result).to.eql({
      count: 1,
      unit: 'month',
      reoccurance: 'monthly'
    });
  });

  it('should extract multiple months', () => {
    const result = reoccurance([
      new Date(2016, 3, 1),
      new Date(2016, 1, 1)
    ]);

    expect(result).to.eql({
      count: 2,
      unit: 'month',
      reoccurance: 'every 2 months'
    });
  });

  it('should extract single year', () => {
    const result = reoccurance([
      new Date(2016, 1, 1),
      new Date(2015, 1, 1),
      new Date(2014, 1, 1)
    ]);

    expect(result).to.eql({
      count: 1,
      unit: 'year',
      reoccurance: 'yearly'
    });
  });

  it('should extract single year', () => {
    const result = reoccurance([
      new Date(2016, 1, 1),
      new Date(2014, 1, 1)
    ]);

    expect(result).to.eql({
      count: 2,
      unit: 'year',
      reoccurance: 'every 2 years'
    });
  });

  it('should get closest value', () => {
    // dates approx every day
    // dates are at not exactly every day but
    // 'daily' is the closest approximation
    const result = reoccurance([
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
      reoccurance: 'daily'
    });
  });

  it('should handle dates out of order', () => {
    // leap years
    const result = reoccurance([
      new Date(2016, 1, 29),
      new Date(2008, 1, 29),
      new Date(2012, 1, 29),
      new Date(2004, 1, 29)
    ]);

    expect(result).to.eql({
      count: 4,
      unit: 'year',
      reoccurance: 'every 4 years'
    });
  });

  it('should output number as string', () => {
    const opts = {
      numberAsString: true
    };
    expect(reoccurance([new Date(2016, 1, 1), new Date(2016, 1, 3)], opts).reoccurance)
      .to.equal('every two days');
    expect(reoccurance([new Date(2016, 1, 1), new Date(2016, 7, 1)], opts).reoccurance)
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

    expect(reoccurance).withArgs(invalid, opts).to.throwException();
  });

  it('should not throw with loose mode', () => {
    const opts = {
      strict: false
    };

    const invalid = [
      new Date(),
      'not a date'
    ];

    expect(reoccurance).withArgs(invalid, opts).to.not.throwException();
  });

  it('should not format single values with noSingleUnits', () => {
    const result = reoccurance([
      new Date(2016, 1, 1, 11),
      new Date(2016, 1, 1, 10)
    ], {
      noSingleUnits: true
    });

    expect(result).to.eql({
      count: 1,
      unit: 'hour',
      reoccurance: 'every hour' // would otherwise be 'Hourly'
    });
  });
});
