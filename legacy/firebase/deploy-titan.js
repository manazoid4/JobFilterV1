#!/usr/bin/env node
/**
 * JobFilter TITAN - Automated Google Cloud Deployment
 */

const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

class JobFilterDeployer {
  constructor(projectId = 'jobfilter-production', region = 'europe-west2') {
    this.projectId = projectId;
    this.region = region;
    this.serviceName = 'jobfilter';
  }

  async runCommand(command) {
    try {
      const { stdout, stderr } = await execPromise(command);
      if (stderr && !stderr.includes('WARNING')) {
        console.error('stderr:', stderr);
      }
      return stdout;
    } catch (error) {
      console.error(`Error executing: ${command}`);
      throw error;
    }
  }

  async enableAPIs() {
    console.log('1️⃣ Enabling APIs...');
    const apis = [
      'run.googleapis.com',
      'cloudbuild.googleapis.com',
      'secretmanager.googleapis.com',
      'firestore.googleapis.com',
      'storage-api.googleapis.com',
      'aiplatform.googleapis.com'
    ];

    for (const api of apis) {
      await this.runCommand(
        `gcloud services enable ${api} --project=${this.projectId}`
      );
    }
  }

  async storeSecret(name, value) {
    try {
      await this.runCommand(
        `echo -n "${value}" | gcloud secrets create ${name} --data-file=- --project=${this.projectId}`
      );
    } catch {
      // Secret exists, update it
      await this.runCommand(
        `echo -n "${value}" | gcloud secrets versions add ${name} --data-file=- --project=${this.projectId}`
      );
    }
  }

  async storeSecrets(secrets) {
    console.log('2️⃣ Storing secrets...');
    for (const [name, value] of Object.entries(secrets)) {
      if (value) {
        await this.storeSecret(name, value);
      } else {
        console.warn(`⚠️ Warning: Secret value for ${name} is missing or undefined. Skipping.`);
      }
    }
  }

  async createFirestore() {
    console.log('3️⃣ Creating Firestore...');
    try {
      await this.runCommand(
        `gcloud firestore databases create --region=${this.region} --project=${this.projectId}`
      );
    } catch {
      console.log('   Firestore database already exists');
    }
  }

  async deployService() {
    console.log('4️⃣ Deploying to Cloud Run...');
    await this.runCommand(`
      gcloud run deploy ${this.serviceName} \
        --source . \
        --region ${this.region} \
        --platform managed \
        --allow-unauthenticated \
        --min-instances 1 \
        --max-instances 100 \
        --memory 1Gi \
        --cpu 2 \
        --timeout 300 \
        --set-env-vars NODE_ENV=production,PORT=8080 \
        --set-secrets \
          STRIPE_SECRET_KEY=stripe-secret-key:latest,\
          STRIPE_WEBHOOK_SECRET=stripe-webhook-secret:latest,\
          GOOGLE_API_KEY=google-api-key:latest,\
          WHATSAPP_API_TOKEN=whatsapp-api-token:latest,\
          SESSION_SECRET=session-secret:latest \
        --project ${this.projectId}
    `);
  }

  async getServiceURL() {
    const url = await this.runCommand(`
      gcloud run services describe ${this.serviceName} \
        --region ${this.region} \
        --project ${this.projectId} \
        --format 'value(status.url)'
    `);
    return url.trim();
  }

  async deploy(secrets) {
    console.log('🚀 Starting JobFilter TITAN deployment...\n');

    await this.enableAPIs();
    await this.storeSecrets(secrets);
    await this.createFirestore();
    await this.deployService();

    const url = await this.getServiceURL();

    console.log('\n✅ Deployment complete!');
    console.log(`🌐 Service URL: ${url}`);
    console.log(`🏥 Health Check: ${url}/api/health\n`);

    return url;
  }
}

// Main execution
(async () => {
  const deployer = new JobFilterDeployer('jobfilter-production', 'europe-west2');

  const secrets = {
    'stripe-secret-key': process.env.STRIPE_SECRET_KEY,
    'stripe-webhook-secret': process.env.STRIPE_WEBHOOK_SECRET,
    'google-api-key': process.env.GOOGLE_API_KEY,
    'whatsapp-api-token': process.env.WHATSAPP_API_TOKEN,
    'session-secret': process.env.SESSION_SECRET || require('crypto').randomBytes(32).toString('base64')
  };

  try {
    await deployer.deploy(secrets);
  } catch (error) {
    console.error('❌ Deployment failed:', error);
    process.exit(1);
  }
})();
