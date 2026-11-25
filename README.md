# Triage MCAT

Triage your MCAT prep: find the subtopics you miss, treat them first, and keep checking until they’re stable.

- **Today** — a projected score trajectory (with a likely range, your practice tests and your target), live vitals for accuracy, retention, coverage and streak, and a daily plan.
- **Practice** — quick questions, MCAT-style passage sets with figures, or timed exam mode with highlighting, cross-outs and flags. Every set is aimed at your weakest subtopics.
- **Flashcards** — spaced repetition (Again / Hard / Good / Easy). A card is added automatically for every idea you miss, and you can make full decks for any subtopic.
- **Library** — the whole AAMC outline. Each subtopic has a study guide (key ideas, equations, a worked example, MCAT traps), your own notes, your misses and its cards.
- **Analytics and Mistake log** — section projections, an activity calendar, mastery by discipline, practice-test history, and every miss with why it happened.

Press **⌘K** (or **/**) anywhere to jump to a subtopic or action.

## Use it

1. Open the site.
2. Go to **Settings** and paste a Claude API key from [console.anthropic.com](https://console.anthropic.com/settings/keys).
   The key stays in your browser and is only sent to Anthropic. Questions use API credit on your own Anthropic account.
3. Go to **Practice** and press **Start**.

Your progress is saved in your browser. Use **Settings → Export** to back it up or move it to another computer.

## Chrome helper (optional)

The helper adds a **Send to Triage** button on UWorld, AAMC, Blueprint, Kaplan, Jack Westin and other MCAT sites. Click it after a question (or turn on **Auto-send after each answer**), and the next time Triage is open your misses are saved under the right subtopics and ready to practice.

1. Download this repo (**Code → Download ZIP**) and unzip it.
2. Open `chrome://extensions` and turn on **Developer mode**.
3. Click **Load unpacked** and pick the `extension` folder.

The helper only reads a page when you click the button (or when auto-send is on and an answer is showing). It hands the text to your open Triage tab, which asks Claude which subtopic each question tests. Triage saves the subtopic and a short note, not the question itself.

If you host Triage somewhere other than `github.io`, add your address to the second `matches` list in `extension/manifest.json`.

## Put it on GitHub Pages

1. Create a new repository and upload everything in this folder.
2. In the repo, go to **Settings → Pages**, choose **Deploy from a branch**, pick `main` and `/ (root)`, and save.
3. Your site will be at `https://<your-username>.github.io/<repo-name>/`.

## Notes

- Topics and subtopics follow the AAMC *What's on the MCAT Exam?* content outline.
- Triage is a study tool made by students. It is not affiliated with the AAMC, UWorld or any test-prep company, and its questions are written by AI, so double-check anything that looks off.
