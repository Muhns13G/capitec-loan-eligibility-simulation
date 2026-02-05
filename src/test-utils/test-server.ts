/**
 * @jest-environment node
 */

/**
 * Test server utilities for API integration tests
 * Enables tests to run in CI/CD without requiring a running dev server
 */

import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';

let server: ReturnType<typeof createServer> | null = null;

/**
 * Starts a test server on the specified port
 * @param port - The port number to run the server on (default: 3001)
 * @returns Promise that resolves when server is ready
 */
export async function startTestServer(port: number = 3001): Promise<void> {
  // Ensure we're in test mode to disable rate limiting
  (process.env as Record<string, string>).NODE_ENV = 'test';

  const app = next({ dev: false });
  const handle = app.getRequestHandler();
  await app.prepare();
  server = createServer((req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  return new Promise((resolve, reject) => {
    server!.listen(port, () => {
      console.log(`> Test server ready on http://localhost:${port}`);
      resolve();
    });
    server!.on('error', reject);
  });
}

/**
 * Stops the test server
 * @returns Promise that resolves when server is stopped
 */
export async function stopTestServer(): Promise<void> {
  if (server) {
    await new Promise<void>((resolve) => {
      server!.close(() => resolve());
    });
    server = null;
    console.log('> Test server stopped');
  }
}

/**
 * Base URL for the test server
 */
export const TEST_SERVER_URL = 'http://localhost:3001';
