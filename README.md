# Saidgaffor & Shirin — Wedding Invitation

Static, multilingual wedding invitation site for GitHub Pages.

**Languages:** Uzbek Cyrillic (default), Kazakh, Russian, English  
**Celebrations:** Bride’s side — 17 Aug 2026 (Sayram) · Groom’s side — 19 Aug 2026 (Shymkent)

## Local preview

Open `index.html` in a browser, or from this folder:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Deploy on GitHub Pages

1. Create a GitHub repository and push this folder.
2. **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: `main` / root (`/`)
3. After the first deploy, the site is at `https://<user>.github.io/<repo>/`.

### Custom domain

1. Replace `yourdomain.com` in the `CNAME` file with your domain.
2. In your DNS provider, add:
   - **Apex domain:** A records to GitHub Pages IPs  
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **or www:** CNAME to `<user>.github.io`
3. In **Settings → Pages**, confirm the custom domain and enable **Enforce HTTPS**.

## What to fill in next

In `i18n.js`, update `events.bride.detail` and `events.groom.detail` for each language once you have:

- venue names / addresses  
- start times  
- optional maps links (can be added in `index.html`)
