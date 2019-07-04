
const address = 'localhost';

var enviroment = {
  app: 'hightech',
  apikey: {
    key: 'RJLOAK91KD2B25CXPFDP',
    secret: '9N8GYBX0O58PDHZ34K35O9SL4IRLLD3OJW6DDBLNVAGVXWN3H0L6T8YFP9BX07HC07W5X1230DZ40VU3L7TWMU903RFKZJ3VYGXR',
    name: 'homedesk'
  },
  url_gate: 'http://localhost:3044',
  url_transaction: 'http://localhost:3044',
  db: {
    redis: {
      url: 'redis://localhost/',
      retry_strategy: function (options) {
        if (options.error.code === 'ECONNREFUSED') {
          return new Error('The server refused the connection');
        }
        if (options.total_retry_time > 1000 * 60 * 60) {
          return new Error('Retry time exhausted');
        }
        if (options.times_connected > 10) {
          return undefined;
        }
        return Math.max(options.attempt * 100, 3000);
      }
    },
  },
  sites: {
    admin: {
      name: 'admin',
      description: 'Api para la administración de usuarios',
      port: 3070,
      host: address,
      cb: `http://${address}:3070`
    },
  }
};

module.exports = enviroment;
