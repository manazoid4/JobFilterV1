#!/usr/bin/env python3
"""
JobFilter TITAN - Automated Google Cloud Deployment
"""

import subprocess
import json
import os
from typing import Dict, Any

class JobFilterDeployer:
    def __init__(self, project_id: str = "jobfilter-production", region: str = "europe-west2"):
        self.project_id = project_id
        self.region = region
        self.service_name = "jobfilter"
        
    def enable_apis(self):
        """Enable required Google Cloud APIs"""
        apis = [
            "run.googleapis.com",
            "cloudbuild.googleapis.com",
            "secretmanager.googleapis.com",
            "firestore.googleapis.com",
            "storage-api.googleapis.com",
            "aiplatform.googleapis.com"
        ]
        
        for api in apis:
            subprocess.run([
                "gcloud", "services", "enable", api,
                "--project", self.project_id
            ])
            
    def store_secrets(self, secrets: Dict[str, str]):
        """Store secrets in Secret Manager"""
        for secret_name, secret_value in secrets.items():
            if not secret_value:
                print(f"⚠️ Warning: Secret value for {secret_name} is missing. Skipping.")
                continue
                
            try:
                # Create secret
                subprocess.run([
                    "gcloud", "secrets", "create", secret_name,
                    "--project", self.project_id
                ], capture_output=True)
            except:
                pass  # Secret already exists
            
            # Add version
            process = subprocess.Popen([
                "gcloud", "secrets", "versions", "add", secret_name,
                "--data-file=-",
                "--project", self.project_id
            ], stdin=subprocess.PIPE)
            process.communicate(input=secret_value.encode())
            
    def create_firestore(self):
        """Initialize Firestore database"""
        subprocess.run([
            "gcloud", "firestore", "databases", "create",
            "--region", self.region,
            "--project", self.project_id
        ])
        
    def deploy_service(self):
        """Deploy to Cloud Run"""
        subprocess.run([
            "gcloud", "run", "deploy", self.service_name,
            "--source", ".",
            "--region", self.region,
            "--platform", "managed",
            "--allow-unauthenticated",
            "--min-instances", "1",
            "--max-instances", "100",
            "--memory", "1Gi",
            "--cpu", "2",
            "--timeout", "300",
            "--set-env-vars", "NODE_ENV=production,PORT=8080",
            "--set-secrets",
            "STRIPE_SECRET_KEY=stripe-secret-key:latest,"
            "STRIPE_WEBHOOK_SECRET=stripe-webhook-secret:latest,"
            "GOOGLE_API_KEY=google-api-key:latest,"
            "WHATSAPP_API_TOKEN=whatsapp-api-token:latest,"
            "SESSION_SECRET=session-secret:latest",
            "--project", self.project_id
        ])
        
    def get_service_url(self) -> str:
        """Get deployed service URL"""
        result = subprocess.run([
            "gcloud", "run", "services", "describe", self.service_name,
            "--region", self.region,
            "--project", self.project_id,
            "--format", "value(status.url)"
        ], capture_output=True, text=True)
        
        return result.stdout.strip()
        
    def deploy(self, secrets: Dict[str, str]):
        """Full deployment workflow"""
        print("🚀 Starting JobFilter TITAN deployment...")
        
        print("1️⃣ Enabling APIs...")
        self.enable_apis()
        
        print("2️⃣ Storing secrets...")
        self.store_secrets(secrets)
        
        print("3️⃣ Creating Firestore...")
        self.create_firestore()
        
        print("4️⃣ Deploying to Cloud Run...")
        self.deploy_service()
        
        print("5️⃣ Getting service URL...")
        url = self.get_service_url()
        
        print(f"\n✅ Deployment complete!")
        print(f"🌐 Service URL: {url}")
        print(f"🏥 Health Check: {url}/api/health")
        
        return url

if __name__ == "__main__":
    import secrets as py_secrets
    
    # Configuration
    deployer = JobFilterDeployer(
        project_id="jobfilter-production",
        region="europe-west2"
    )
    
    # Secrets (replace with actual values or use env vars)
    secrets = {
        "stripe-secret-key": os.getenv("STRIPE_SECRET_KEY"),
        "stripe-webhook-secret": os.getenv("STRIPE_WEBHOOK_SECRET"),
        "google-api-key": os.getenv("GOOGLE_API_KEY"),
        "whatsapp-api-token": os.getenv("WHATSAPP_API_TOKEN"),
        "session-secret": os.getenv("SESSION_SECRET", py_secrets.token_hex(32))
    }
    
    # Deploy
    deployer.deploy(secrets)
