---
sidebar_position: 1
---

# Forgejo + Coolify: Auto-Deploy on Push

Set up automatic deployments in Coolify when you push to your Forgejo repository.

## Overview

This guide configures Forgejo webhooks to trigger Coolify deployments automatically whenever you push code. No more manual redeploys!

## Prerequisites

- **Forgejo** instance (self-hosted or managed)
- **Coolify** instance with your application already configured
- Repository with Dockerfile or Nixpacks configuration

## Step 1: Get Coolify Deploy Webhook URL

1. Open your Coolify dashboard
2. Navigate to your **Resource** (application)
3. Go to **Settings** → **Webhooks**
4. Copy the **Deploy Webhook URL**
   - Format: `https://coolify.yourdomain.com/webhooks/forgejo/xxxxx`
   - Or: `http://10.x.x.x:8000/webhooks/source/xxxxx` (for internal IPs)

## Step 2: Configure Forgejo Webhook

1. In Forgejo, go to your repository
2. Click **Settings** → **Webhooks** → **Add Webhook**
3. Select **Forgejo** as the webhook type
4. Fill in the details:
   - **Target URL**: Paste your Coolify webhook URL
   - **HTTP Method**: `POST`
   - **Content Type**: `application/json`
   - **Secret**: Leave empty (or match Coolify's secret if configured)
   - **Trigger On**: Select **Push events**

5. Click **Add Webhook**

## Step 3: The Critical Fix - Allowed Host List

By default, Forgejo blocks webhooks to private/internal IP addresses for security. This prevents Coolify webhooks from working if Coolify is on a private network.

### The Error
You'll see this in Forgejo's webhook delivery logs:
```
Delivery: Post "http://10.x.x.x:8000/webhooks/...": not allowed to dial to '10.x.x.x'
```

### The Solution

Add the `FORGEJO__WEBHOOK__ALLOWED_HOST_LIST` environment variable to your Forgejo deployment:

**Via docker-compose.yml:**
```yaml
services:
  forgejo:
    image: codeberg.org/forgejo/forgejo:latest
    environment:
      - FORGEJO__WEBHOOK__ALLOWED_HOST_LIST=10.0.0.0/8,172.16.0.0/12,192.168.0.0/16,coolify.yourdomain.com
```

**Via .env file:**
```bash
FORGEJO__WEBHOOK__ALLOWED_HOST_LIST=10.0.0.0/8,172.16.0.0/12,192.168.0.0/16,coolify.yourdomain.com
```

**Via Coolify environment variables (if Forgejo runs in Coolify):**
```
Key: FORGEJO__WEBHOOK__ALLOWED_HOST_LIST
Value: 10.0.0.0/8,172.16.0.0/12,192.168.0.0/16,coolify.yourdomain.com
```

### What This Does

The `ALLOWED_HOST_LIST` tells Forgejo which destinations are safe for webhooks:
- `10.0.0.0/8` - Private Class A network
- `172.16.0.0/12` - Private Class B network
- `192.168.0.0/16` - Private Class C network
- Add your Coolify domain if using public DNS

## Step 4: Test the Webhook

### Test Delivery in Forgejo

1. Go to **Settings** → **Webhooks** in your repository
2. Find your webhook and click **Test Delivery**
3. Check the response:
   - **Green** (200 OK): Webhook works!
   - **Red**: Check the error message and troubleshooting below

### Test with Real Push

1. Make a change to your repository
2. Commit and push: `git push origin main`
3. Check Coolify:
   - Go to your resource → **Deployments**
   - A new deployment should start automatically
4. Check the deployment logs to confirm it triggered

## Troubleshooting

### "not allowed to dial" Error

**Cause**: Forgejo's security settings block private IPs  
**Fix**: Add `FORGEJO__WEBHOOK__ALLOWED_HOST_LIST` (see Step 3)

### "404 Not Found" or "401 Unauthorized"

**Cause**: Wrong webhook URL or authentication issue  
**Fix**: 
- Double-check the Coolify webhook URL
- Ensure no extra characters or spaces
- Verify the webhook secret matches (if used)

### Webhook Succeeds but No Deployment

**Cause**: Coolify received the webhook but didn't trigger a deploy  
**Fix**:
- Check Coolify's **Webhook & API** logs
- Verify the branch matches (e.g., pushing `dev` but Coolify set to `main`)
- Ensure auto-deploy is enabled in Coolify resource settings

### Timeout Errors

**Cause**: Forgejo can't reach Coolify  
**Fix**:
- Verify Coolify is running and accessible
- Check firewall rules between Forgejo and Coolify
- Try using the public URL instead of internal IP

## Security Considerations

- **Whitelist only necessary IPs**: Don't use `*` in `ALLOWED_HOST_LIST`
- **Use HTTPS when possible**: If Coolify has a public domain with SSL, use that URL
- **Keep webhook secrets secret**: If using webhook secrets, store them securely
- **Monitor webhook logs**: Regularly check for suspicious activity

## Alternative: Generic Webhook

If the Forgejo-specific webhook doesn't work, use a **Generic Webhook** in Coolify:

1. In Coolify: **Settings** → **Webhooks** → **Generic Webhook**
2. Copy the generic webhook URL
3. In Forgejo: Add webhook with **Gitea** type (generic POST)
4. Set **Content Type**: `application/json`
5. Payload is sent as-is to trigger deployment

## References

- [Forgejo Webhooks Documentation](https://forgejo.org/docs/latest/user/webhooks/)
- [Coolify Webhooks Guide](https://coolify.io/docs/knowledge-base/git-providers/webhooks)
- [Deploy on Push with Forgejo and Coolify](https://www.coryd.dev/posts/2025/deploy-on-push-with-forgejo-and-coolify)

---

**Need help?** Check the webhook delivery logs in Forgejo and deployment logs in Coolify for specific error messages.