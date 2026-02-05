/**
 * API Load Testing Script
 *
 * Performs load testing on API endpoints
 * Usage: npm run test:load
 */

const http = require('http');

const TARGET_URL = process.env.TARGET_URL || 'http://localhost:3000';
const CONCURRENT_REQUESTS = parseInt(process.env.CONCURRENT || '10', 10);
const TOTAL_REQUESTS = parseInt(process.env.TOTAL_REQUESTS || '100', 10);

async function makeRequest(path, method = 'GET', body = null) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const url = new URL(path, TARGET_URL);

    const options = {
      hostname: url.hostname,
      port: url.port || 80,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          duration: Date.now() - start,
          success: res.statusCode === 200,
        });
      });
    });

    req.on('error', reject);

    if (body) {
      req.write(JSON.stringify(body));
    }

    req.end();
  });
}

async function runLoadTest() {
  console.log(`Starting load test...`);
  console.log(`Target: ${TARGET_URL}`);
  console.log(`Concurrent: ${CONCURRENT_REQUESTS}`);
  console.log(`Total Requests: ${TOTAL_REQUESTS}`);
  console.log('');

  const results = [];
  const errors = [];
  let completed = 0;

  for (let i = 0; i < TOTAL_REQUESTS; i += CONCURRENT_REQUESTS) {
    const batchSize = Math.min(CONCURRENT_REQUESTS, TOTAL_REQUESTS - i);
    const batch = Array(batchSize)
      .fill(null)
      .map(async () => {
        try {
          const result = await makeRequest('/api/loans/products');
          results.push(result);
          completed++;
          if (completed % 10 === 0) {
            process.stdout.write(`Progress: ${completed}/${TOTAL_REQUESTS}\r`);
          }
          return result;
        } catch (error) {
          errors.push(error);
          completed++;
          return { success: false, error: error.message };
        }
      });

    await Promise.all(batch);
  }

  console.log(`\n\nLoad Test Results:`);
  console.log(`==================`);

  const successful = results.filter((r) => r.success).length;
  const failed = TOTAL_REQUESTS - successful;

  console.log(`Total Requests: ${TOTAL_REQUESTS}`);
  console.log(`Successful: ${successful} (${((successful / TOTAL_REQUESTS) * 100).toFixed(1)}%)`);
  console.log(`Failed: ${failed} (${((failed / TOTAL_REQUESTS) * 100).toFixed(1)}%)`);

  if (successful > 0) {
    const durations = results.filter((r) => r.success).map((r) => r.duration);
    const avgDuration = durations.reduce((a, b) => a + b, 0) / durations.length;
    const minDuration = Math.min(...durations);
    const maxDuration = Math.max(...durations);

    console.log(`\nResponse Times:`);
    console.log(`  Average: ${avgDuration.toFixed(2)}ms`);
    console.log(`  Min: ${minDuration}ms`);
    console.log(`  Max: ${maxDuration}ms`);
  }

  if (errors.length > 0) {
    console.log(`\nErrors:`);
    errors.slice(0, 5).forEach((err, i) => {
      console.log(`  ${i + 1}. ${err.message}`);
    });
    if (errors.length > 5) {
      console.log(`  ... and ${errors.length - 5} more`);
    }
  }

  console.log('');

  if (successful / TOTAL_REQUESTS < 0.95) {
    console.log('❌ Load test FAILED: Success rate below 95%');
    process.exit(1);
  } else {
    console.log('✅ Load test PASSED');
    process.exit(0);
  }
}

runLoadTest().catch((err) => {
  console.error('Load test error:', err);
  process.exit(1);
});
