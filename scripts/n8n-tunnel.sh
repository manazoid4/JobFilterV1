#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# n8n SSH Reverse Tunnel — expose local n8n to the internet
#
# USAGE:
#   chmod +x scripts/n8n-tunnel.sh
#   ./scripts/n8n-tunnel.sh
#
# REQUIREMENTS:
#   - n8n running locally on port 5678  (npx n8n  OR  n8n start)
#   - A VPS/server you can SSH into
#   - SSH access with public key auth
#
# HOW IT WORKS:
#   This opens a reverse tunnel: traffic hitting VPS:5679 is forwarded to
#   localhost:5678 (your local n8n). Your Vercel env var becomes:
#     N8N_WEBHOOK_URL=http://YOUR_VPS_IP:5679/webhook/YOUR_WORKFLOW_ID
#
# STEPS:
#   1. Run this script on your local machine
#   2. Copy the webhook URL from your n8n workflow trigger node
#   3. Replace "localhost:5678" with "YOUR_VPS_IP:5679" in that URL
#   4. Set N8N_WEBHOOK_URL in Vercel to that public URL
#
# ALTERNATIVE (no VPS): use cloudflare tunnel (free):
#   npx cloudflared tunnel --url http://localhost:5678
# ─────────────────────────────────────────────────────────────────────────────

VPS_USER="${N8N_TUNNEL_USER:-root}"
VPS_HOST="${N8N_TUNNEL_HOST:-}"
VPS_PORT="${N8N_TUNNEL_PORT:-5679}"
LOCAL_PORT="${N8N_LOCAL_PORT:-5678}"

if [ -z "$VPS_HOST" ]; then
  echo ""
  echo "  Set your VPS host first:"
  echo "    export N8N_TUNNEL_HOST=your.vps.ip.or.hostname"
  echo "    export N8N_TUNNEL_USER=root   # or your SSH user"
  echo "    ./scripts/n8n-tunnel.sh"
  echo ""
  echo "  Or use Cloudflare tunnel (no VPS needed):"
  echo "    npx cloudflared tunnel --url http://localhost:5678"
  echo ""
  exit 1
fi

echo "[n8n-tunnel] Opening reverse tunnel..."
echo "  Local:  localhost:${LOCAL_PORT}"
echo "  Public: ${VPS_HOST}:${VPS_PORT}"
echo ""
echo "  Set in Vercel:"
echo "    N8N_WEBHOOK_URL=http://${VPS_HOST}:${VPS_PORT}/webhook/YOUR_WORKFLOW_ID"
echo ""
echo "  Press Ctrl+C to close the tunnel."
echo ""

ssh -N -R "${VPS_PORT}:localhost:${LOCAL_PORT}" \
    -o ServerAliveInterval=30 \
    -o ServerAliveCountMax=3 \
    -o ExitOnForwardFailure=yes \
    "${VPS_USER}@${VPS_HOST}"
