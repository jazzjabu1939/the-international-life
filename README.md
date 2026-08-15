# Virtual Kyoto interface

## Review locally

From the workspace root:

```bash
python3 -m http.server 8765 --directory teaching/international-life/interface
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

At the brother's apartment above the bar, the same original synthetic bass pattern links two spaces. Putting in the earplugs mutes the bedroom; taking the house keys opens an optional visit to the bar below, where the music continues at full volume. The student can also inspect the console, wired glasses, and gloves, but the cassette slot is empty. Reading the brother's note unlocks the separate walk-to-mall transition and changes the destination to the Darwin Free Trade Zone.

At the vendor, choosing either decoy cassette deliberately blocks progression; select **VIRTUAL KYOTO** to enter Kelsey's console scene and the final Virtual Kyoto threshold.

The final invitation links to `course.html`, the first implementation of the reusable city-syllabus destination. Its Kyoto content is provisional: it establishes the visual and information architecture while specific assigned readings, films, dates, and verified program links are finalized.
