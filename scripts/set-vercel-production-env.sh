#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

add_prod() {
  vercel env add "$1" production --value "$2" --yes --no-sensitive --force --non-interactive
}

add_prod ADMIN_EMAIL 'admin@catminer.com.br'
add_prod ADMIN_PASSWORD 'd53ce757167a81c50706c0734b5828e2'
add_prod AUTH_SECRET '83b9b2f1337b556c8ada3e0c378ec768217c191239b7c2d7069f0839d26ba075'
add_prod SESSION_SECRET '4471e4d26d2a0853859c9074490fc79262537d2f1e0d7c5d97bd0465d2572184'
add_prod UAIPAG_ENV 'sandbox'
add_prod UAIPAG_MOCK 'true'
add_prod UAIPAG_WEBHOOK_SECRET 'XKKh3ywH3i1wnFbtRYbuYe5z'
add_prod NEXT_PUBLIC_WHATSAPP_NUMBER '5521999999999'
add_prod EMAIL_FROM 'Cat Miner <noreply@catminer.com.br>'

vercel env ls production
