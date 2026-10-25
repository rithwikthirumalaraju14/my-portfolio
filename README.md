# Rithwik Thirumalaraju — Portfolio

React/Vite portfolio. Run `npm install` and `npm run dev` to develop locally.

## Set up the contact form (Google Sheets + email)

The portfolio never redirects visitors to an email client when they send a message. Submissions are saved to your Google Sheet; the script emails a notification to `rithwikthirumalaraju@gmail.com`.

1. In the Google account that should own the inbox, create a new Google Sheet. Open **Extensions → Apps Script** from that sheet.
2. Replace the starter `Code.gs` contents with [`contact-form.gs`](contact-form.gs). Save it.
3. In Apps Script, select and run `authorizeServices` once, approving its Google Sheets and Mail permissions.
4. Select **Deploy → New deployment → Web app**. Set **Execute as: Me** and **Who has access: Anyone**, then authorize and copy the URL ending in `/exec`. Never use the `/dev` testing URL on the deployed portfolio.
5. For local development, copy [`.env.example`](.env.example) to `.env.local`, replace the placeholder with your deployed `/exec` URL, and restart Vite. `.env.local` is ignored by Git.
6. Send a test message on the site and check both the **Messages** sheet and your inbox. Changes to Apps Script after deployment require a new deployment version via **Deploy → Manage deployments**.

The endpoint URL is publicly visible to visitors, so it is not a secret. Only the Sheet owner can view stored messages. The browser submits without leaving the site, then checks a short-lived receipt before displaying success; this avoids browser restrictions on reading Apps Script's cross-origin POST response. If the endpoint is missing, the form shows a setup message and visitors can use **Copy address** instead. Make sure the deployed Apps Script contains the `doPost` **and** `doGet` functions in `contact-form.gs` for that receipt check.

## Deploy on Vercel

1. Push the repository to GitHub. Commit `.env.example`, but keep `.env.local` (and any real `.env` files) out of Git.
2. In Vercel, **Add New → Project**, import the GitHub repository, and choose the **Vite** framework preset. The build command is `npm run build` and the output directory is `dist`.
3. In the project's **Settings → Environment Variables**, add `VITE_CONTACT_SCRIPT_URL` with your Apps Script `/exec` URL for **Production** (and **Preview** if you want preview builds to accept real messages). Add it before the first deploy, or redeploy after setting it; Vite embeds environment variables at build time.
4. Test the deployed contact form and check both the Sheet and notification email. When changing the URL later, update the Vercel variable and redeploy.

Vercel stores the configured value outside Git, but **`VITE_` variables are included in the browser JavaScript**. This URL is a public web-app endpoint, not a password. Never put Google account credentials, API keys, or other real secrets in `VITE_` variables or frontend source code; those belong in server-side functions/environment variables instead.
