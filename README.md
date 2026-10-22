# vercellitellmtest

Vercel OIDC → 自社 LiteLLM（`:8000`）の疎通確認用の一時プロジェクトです。

## 事前準備

1. Vercel でこのリポジトリをプロジェクトとして用意する（または CLI 初回でリンク）
2. プロジェクト Settings → Security → OIDC Issuer Mode を **Team** にする
3. Project ID（`prj_...`）をサーバーの `trusted-teams.json` に追加し、verifier を restart
4. Vercel Environment Variables に設定:
   - `LITELLM_API_KEY` … LiteLLM の Virtual Key
   - `LITELLM_BASE_URL` … 例 `https://3.115.107.157:8000`（任意）

## デプロイ

### Windows（cmd）

```bat
cd vercellitellmtest
scripts\deploy.cmd
scripts\deploy.cmd prod
```

### macOS / Linux / Git Bash

```bash
cd vercellitellmtest
chmod +x scripts/deploy.sh
./scripts/deploy.sh
./scripts/deploy.sh prod
```

初回はブラウザで Vercel ログイン・チーム／プロジェクト選択が出ることがあります。

## 疎通確認

デプロイ後:

```text
https://<デプロイURL>/api/oidc-litellm-test
```

`ok: true` と LiteLLM の models っぽい JSON が返れば成功です。
