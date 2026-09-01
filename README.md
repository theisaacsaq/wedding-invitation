# Premium Interactive Wedding Invitation

## Publish on Netlify
1. Upload this folder to GitHub or drag the folder into Netlify Drop.
2. No build command is needed.
3. Replace `YOUR-DOMAIN.netlify.app` in `index.html` with your real domain after Netlify assigns it.

## Customize
Search these files for:
- `Ayesha` and `Hamza` — couple names
- `2026-12-19T19:00:00` — countdown date/time
- Event names, dates, venues, map URLs in `index.html`
- `923001234567` in `script.js` — destination WhatsApp number (country code, no +)

## Music
`ambient-wedding-loop.wav` is an original generated ambient instrumental included with the site. Mobile browsers block automatic audio until a user interacts, so the opening "Open Invitation" button intentionally starts the music. The floating music button mutes/unmutes it.

## RSVP
The form uses Netlify Forms. After deploying, submissions appear in your Netlify project under Forms.

## WhatsApp preview
After you know your final public URL, update `og:url` and `og:image` in `index.html`. `og-preview.jpg` should remain publicly accessible at your domain root.
