# Sharod Karmoker – Portfolio Website

Pure HTML5 + CSS3 + Vanilla JavaScript. No build step, no libraries.

## Project structure

```
index.html
style.css
script.js
images/
  sharod.png            <- your cut-out photo (REQUIRED, see below)
  portfolio/            <- optional: work-1.jpg ... work-6.jpg
README.md
```

## Before publishing: add your photo

1. Create a folder named `images` next to `index.html`.
2. Save your transparent-background photo as `images/sharod.png` (PNG, ideally under 400 KB; compress with squoosh.app).
3. Optional: put your work samples in `images/portfolio/` as `work-1.jpg` … `work-6.jpg`. Missing images are hidden automatically and the tile keeps its styled card.

Open `index.html` in your browser to test locally.

## Publish on GitHub Pages

1. Create a free account at github.com and click **New repository** (name it e.g. `portfolio`, set Public).
2. Click **uploading an existing file**, drag in `index.html`, `style.css`, `script.js` and the `images` folder, then **Commit changes**.
3. Go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, then **Save**.
4. After 1–2 minutes your site is live at `https://YOUR-USERNAME.github.io/portfolio/`.

## Publish on Netlify

1. Go to app.netlify.com and sign up.
2. Open **Add new site → Deploy manually** (or "Drag and drop").
3. Drag your whole project folder onto the page.
4. Your site is live immediately on a `*.netlify.app` address. Change it under **Site configuration → Change site name**.

## Publish on Vercel

1. Go to vercel.com and sign up (GitHub login is easiest).
2. Push the project to a GitHub repository (steps above, first two points).
3. In Vercel click **Add New → Project**, import the repository.
4. Leave the framework as **Other**, no build command, then **Deploy**.

## Editing your details

All contact details are at the top of `script.js` in the `CONFIG` object, and in the links inside `index.html` (search for `8801707737378`).

## Notes

- Facebook and Instagram messages are **not** delivered automatically (that needs Meta's authorised API and a backend). The site opens your profile and gives the visitor a Copy Message button to paste into Messenger / Direct Messages.
- Email opens the visitor's mail app with everything pre-filled; WhatsApp opens a pre-filled chat.
