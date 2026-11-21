# Fulcrum MCAT

Practice that finds your weak MCAT subtopics and keeps quizzing you on them until they stick.

- **Practice** — press Start. Claude writes MCAT-style questions (with graphs, tables and molecule drawings) aimed at what you get wrong.
- **Review** — anything you miss comes back on a schedule, like Anki: soon after a miss, then less often as you get it right.
- **Progress** — every topic on the AAMC content outline, each with its own subtopics and progress bar. Tap any subtopic to quiz just that.
- **Mistakes** — every miss, and why you missed it.

## Use it

1. Open the site.
2. Go to **Settings** and paste a Claude API key from [console.anthropic.com](https://console.anthropic.com/settings/keys).
   The key stays in your browser and is only sent to Anthropic. Questions use API credit on your own Anthropic account.
3. Go to **Practice** and press **Start**.

Your progress is saved in your browser. Use **Settings → Export** to back it up or move it to another computer.

## Chrome helper (optional)

The helper adds a **Send to Fulcrum** button on UWorld, AAMC, Blueprint, Kaplan, Jack Westin and other MCAT sites. Click it after a question (or turn on **Auto-send after each answer**), and the next time Fulcrum is open your misses are saved under the right subtopics and ready to practice.

1. Download this repo (**Code → Download ZIP**) and unzip it.
2. Open `chrome://extensions` and turn on **Developer mode**.
3. Click **Load unpacked** and pick the `extension` folder.

The helper only reads a page when you click the button (or when auto-send is on and an answer is showing). It hands the text to your open Fulcrum tab, which asks Claude which subtopic each question tests. Fulcrum saves the subtopic and a short note, not the question itself.

If you host Fulcrum somewhere other than `github.io`, add your address to the second `matches` list in `extension/manifest.json`.

## Put it on GitHub Pages

1. Create a new repository and upload everything in this folder.
2. In the repo, go to **Settings → Pages**, choose **Deploy from a branch**, pick `main` and `/ (root)`, and save.
3. Your site will be at `https://<your-username>.github.io/<repo-name>/`.

## Notes

- Topics and subtopics follow the AAMC *What's on the MCAT Exam?* content outline.
- Fulcrum is a study tool made by students. It is not affiliated with the AAMC, UWorld or any test-prep company, and its questions are written by AI, so double-check anything that looks off.
