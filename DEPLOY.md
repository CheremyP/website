# Deployment & Security Runbook

## Deployment Architecture
ARTEFCL is deployed on a Hetzner Ubuntu 24.04 server using **Dokploy**.

- **Image Source:** GitHub Container Registry (`ghcr.io`)
- **Staging Trigger:** Pushes to the `staging` branch.
- **Production Trigger:** Pushes to the `main` branch.

## Secrets Rotation Runbook

If an API key (e.g., Resend, Sentry, PostHog) is compromised, follow these exact steps to rotate it in under 5 minutes:

### 1. Generate New Key
1. Log into the respective service (Resend, Sentry, etc.).
2. Generate a new API key.
3. Verify the new key has the correct restrictive scopes (e.g., domain-specific sending only).

### 2. Update Dokploy Environment
1. Log into the Dokploy Admin UI.
2. Navigate to the `artfcl` project.
3. Select the environment (Staging or Production).
4. Go to the **Environment** tab.
5. Replace the compromised value with the new key.
6. Click **Save**.

### 3. Deploy and Verify
1. In Dokploy, click **Deploy** to forcefully restart the container with the new environment variables.
2. Monitor the deployment logs to ensure the container boots successfully.
3. Perform a quick smoke test (e.g., submit a test contact form) to verify the new key is actively working.

### 4. Revoke Old Key
1. Return to the external service dashboard (Resend, Sentry).
2. Permanently delete/revoke the compromised key.

