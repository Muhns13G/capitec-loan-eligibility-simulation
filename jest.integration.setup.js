const { startTestServer } = require('./src/test-utils/test-server');

module.exports = async function globalSetup() {
  console.log('Starting test server for integration tests...');
  await startTestServer(3001);
  console.log('Test server started successfully on port 3001');
};
