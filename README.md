# Urdu Black & Gold Wedding Invitation

This is a static website ready for GitHub and Netlify.

## Invitation links

- Barat + Walima: `https://your-site.netlify.app/?invite=both&guest=Ahmed%20Family&max=4`
- Walima only: `https://your-site.netlify.app/?invite=walima&guest=Ahmed%20Family`

`guest` personalises the addressee and WhatsApp reply. `max` limits the combined ladies, gents and children count for Barat.

## Update details

Open `app.js` and edit the `CONFIG` object at the top: names, host, WhatsApp number, dates, venues, map searches and calendar times.

The welcome music is generated in the browser after the visitor taps “Open invitation”, so no copyrighted audio file or autoplay workaround is required.

## Optional section background images

Create an `images` folder and place images inside it. Then add a rule to `styles.css` using the section's existing class:

```css
.hero { --section-bg: url("images/hero.jpg"); --image-shade: .72; }
.events { --section-bg: url("images/events.jpg"); --image-shade: .82; }
.rsvp { --section-bg: url("images/rsvp.jpg"); --image-shade: .86; }
```

`--image-shade` controls the black overlay: a higher value makes text easier to read. File names are case-sensitive on Netlify.

## Publish

Push this folder to a GitHub repository, then import that repository in Netlify. No build command is required and the publish directory is `.`.
