# The International Life interface

## Review locally

From any directory on this Mac:

```bash
python3 -m http.server 8765 --directory /Users/Jazz/.openclaw/workspace/teaching/international-life/interface
```

Then open <http://127.0.0.1:8765/>.

The experience is static HTML/CSS/JavaScript and requires no build step. `index.html` can also be opened directly for a quick review, but the local server is the preferred test path.

## Validate the checkpoint

Install the browser-test dependency once, start the local server above, then run:

```bash
cd teaching/international-life/interface
npm install
node --check game.js
npm test
```

The tests use the installed Brave browser and cover the complete route at desktop and phone sizes, keyboard and reduced-motion safeguards, accessible dialog names, page errors, and horizontal overflow.

## Controls

- Continue button or Right Arrow: advance
- Left Arrow: return to the previous scene
- Numbered rail: revisit any scene already reached
- Look closer: reveal the scene's observation
- Read the story: open the accessible transcript
- Sources & credits: review the imagined/adapted source boundary

At baggage claim, the normal Continue action remains locked until the student identifies the worn tan leather duffel near the center of the restored panorama. The next arrivals-hall scene asks the student to locate the information desk, ask natural-language questions, and choose bus, shuttle, or taxi to the brother's apartment. A visible three-route fallback ensures the experience never depends on a conversational response. Taxi is the marked story route, while every choice deducts its fare from the A$50 wallet and carries the resulting balance forward.

At the brother's apartment above the bar, an original procedural soundtrack links two spaces on one continuous timeline. The bar combines a late-1980s-inspired kick, bass line, hi-hat, room noise, and indistinct crowd murmur. Upstairs, the same sound is quieter and heavily filtered through the floor. Putting in the earplugs mutes the bedroom; taking the house keys opens an optional visit to the bar below. At the bar, a bounded conversational bartender accepts typed questions and offers visible conversation starters; it runs locally so the static experience never depends on an external AI service. The student can also inspect the console, wired glasses, and gloves, but the cassette slot is empty. Reading the brother's note unlocks the separate walk-to-mall transition and changes the destination to the Darwin Free Trade Zone.

At the vendor, **VIRTUAL KYOTO** and **VIRTUAL TAIPEI** are equally real A$20 purchases. Selecting a handmade cassette reveals its physical label, buying it deducts from the same transport wallet, and the persistent tape inventory follows the student back to the console. The purchase locks the branch, so backtracking cannot swap tapes or charge the wallet twice. “Whole city in there” remains the vendor's refrain and returns at the console and city threshold.

Both cassette branches now cross a city-specific threshold and reach a provisional course destination built from the same city-syllabus template. Virtual Kyoto continues to `course.html`; Virtual Taipei continues to `taipei.html`. Each path names the selected cassette at the threshold invitation and again on the destination page, then presents a city question, six-part learning route, four encounters, resources/pathways, and a next-tape action.
