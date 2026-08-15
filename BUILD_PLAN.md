# Virtual Kyoto — Vertical Slice Build Plan

**Checkpoint:** August 14, 2026 — nine-scene narrative route, playable airport decision loop, and first Kyoto city-syllabus destination implemented.

## Outcome

A shareable browser experience that turns the opening of *The International Life* into a short first-person travel game. The first playable route runs from an imagined late-1980s Darwin arrival to the scene Gibson actually wrote: Kelsey's second week in Australia, the unlicensed vendor, and the virtual-Kyoto cassette.

## Source boundary

- **Imagined prologue:** airport arrival, baggage claim, taxi, brother's condominium.
- **Adapted from William Gibson:** the Darwin Free Trade Zone mall, vendor, cassette, and entry into virtual Kyoto.
- The interface will label this boundary discreetly in the credits and instructor notes.

## Vertical slice

1. Boot/title screen
2. Darwin baggage claim: identify and collect the UMass backpack
3. Main arrivals hall: locate the information desk
4. Ask about the hostel; compare bus, shuttle, and taxi against an A$50 wallet
5. Transport transition with the chosen route and remaining cash
6. “Second week in Australia” mall exploration
7. Vendor dialogue and cassette choice
8. Kelsey's anonymous console, glasses, and gloves
9. Virtual Kyoto threshold and course invitation
10. Kyoto city syllabus

## Technical approach

- Static HTML/CSS/JavaScript; no installation or login for students
- Progressive enhancement: keyboard/mouse, touch, and reduced-motion modes
- Original generated environment art with light parallax and cinematic transitions
- Optional Three.js exploration after the interaction grammar is proven
- Deployable to GitHub Pages or any ordinary static host

## Weekend definition of done

- [x] Complete navigation and reusable scene system
- [x] One polished playable route
- [x] Responsive desktop and phone layouts
- [x] Accessible non-game path with equivalent content
- [x] Source/fiction credits
- [ ] Shareable hosted preview

## Implemented interaction grammar

- Nine scenes: boot, baggage claim, main arrivals, transit, condominium, mall, vendor, console, and Virtual Kyoto
- Forward progression by button or Right Arrow; return to visited scenes with the chapter rail or Left Arrow
- A scene-specific "Look closer" observation layer
- A cassette-selection moment at the vendor; the route does not advance until Virtual Kyoto is selected
- A final course invitation that names the five tapes and the student's Sixth Tape
- Accessible transcript dialog, keyboard navigation, reduced-motion support, and explicit source/fiction credits
- Four optimized original background illustrations: late-1980s Darwin dusk, the anonymous licensed mall, the unlicensed cassette vendor, and the Virtual Kyoto threshold (`assets/`, about 900 KB combined)
- A responsive Kyoto city-syllabus page with the six-part learning-abroad cycle, a four-encounter Kyoto plan, resource links, and the Sixth Tape invitation
- “Whole city in there” used as the vendor's promise, console-scene refrain, and Kyoto threshold
- A bounded airport help interaction that recognizes questions about the hostel, cost, speed, safety, bus, shuttle, and taxi, with transport cards as a no-failure fallback
- Persistent airport state: UMass backpack inventory, A$50 starting wallet, route cost, and remaining balance

## Verification record — August 14

- `node --check interface/game.js` — pass
- Local HTTP load — pass
- Automated full-route traversal — pass on 1440×900 and 390×844 viewports
- JavaScript page-error capture — no errors
- Horizontal-overflow check — pass at both viewports
- Visual inspection — boot and Virtual Kyoto endpoints reviewed at original screenshot resolution
- Generated-background HTTP loads and post-integration desktop/mobile visual checks — pass
- Final regression after four-background art pass: keyboard-only full route, decoy-tape block, Virtual Kyoto selection, transcript, credits, reduced-motion mode, missing-request capture, page-error capture, and overflow checks — pass at 1440×900 and 390×844
- Lighthouse after audit fixes: Performance 99, Accessibility 100, Best Practices 100, SEO 100; no failed binary audits

## Saturday checkpoint — August 15

- Clean local-server rerun — pass
- `node --check game.js` — pass
- Playwright readiness suite — 5/5 pass (desktop route, phone route, keyboard/reduced motion, accessible dialog names, baggage-state/backtracking persistence)
- Baggage-claim checkpoint rerun — correct/decoy bag interactions, persistent backpack inventory, and forward return to visited chapters verified; chapter-rail progress regression repaired
- Test harness repaired for reproducibility: `@playwright/test` is declared in `package.json`; setup and validation commands are documented in `README.md`
- Review status: ready for local inspection; hosted preview remains the only unchecked weekend definition-of-done item
- Content caveat: the Kyoto city syllabus is a working destination architecture, not a finalized reading/program guide

## Next refinement lane

1. Replace the current CSS baggage hall with a richer illustrated scene while keeping the functional UMass-bag hotspot clear and accessible.
2. Decide whether the bounded local attendant is sufficient for class or should be backed by a dedicated server-side agent; never expose an API key in this static client.
3. Replace the provisional console geometry with art that feels like late-1980s near-future domestic hardware without naming a brand or over-explaining Gibson's technology.
4. Verify and deepen the Kyoto readings, films, study-abroad pathways, and Japan-specific academic resources.
5. Extract the Kyoto page into a reusable city-template content structure before building Taipei, Manila, Stockholm, and Auckland–Otago.
6. Add sound only where it carries place or story: airport belt, Darwin night, mall ambience, cassette click, the vendor's refrain, and Kyoto threshold.
7. Decide whether the prototype should be hosted independently or embedded in the eventual course site.
