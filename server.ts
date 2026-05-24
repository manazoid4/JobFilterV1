import 'dotenv/config';
import { createApp } from './server/app';

async function startServer() {
  const app = await createApp();
  const port = Number(process.env.PORT || 3000);
  app.listen(port, '0.0.0.0', () => {
    console.log(`JobFilter running on http://localhost:${port}`);
  });
}

startServer().catch((error) => {
  console.error('Server failed:', error);
  process.exit(1);
});
