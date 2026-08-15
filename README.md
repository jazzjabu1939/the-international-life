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

At baggage claim, the normal Continue action remains locked until the student identifies the backpack marked with the UMass patch. The next arrivals-hall scene asks the student to locate the information desk, ask natural-language questions, and choose bus, shuttle, or taxi. A visible three-route fallback ensures the experience never depends on a conversational response. The A$50 wallet and transport cost carry into the transit scene.

At the vendor, choosing either decoy cassette deliberately blocks progression; select **VIRTUAL KYOTO** to enter Kelsey's console scene and the final Virtual Kyoto threshold.

The final invitation links to `course.html`, the first implementation of the reusable city-syllabus destination. Its Kyoto content is provisional: it establishes the visual and information architecture while specific assigned readings, films, dates, and verified program links are finalized.
