const { stopTestServer } = require('./src/test-utils/test-server');

module.exports = async function globalTeardown() {
  console.log('Stopping test server...');
  await stopTestServer();
  console.log('Test server stopped');
};
