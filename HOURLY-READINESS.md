# Virtual Kyoto — Hourly Student-Readiness Log

## Readiness gate

The interface is ready only when a first-year student can complete the route without explanation or rescue on desktop and phone-sized screens. Every review checks affordances, interaction fallbacks, wallet state, story/source fidelity, keyboard access, reduced motion, page errors, overflow, and the transition into the Kyoto city syllabus.

Two consecutive complete passes are required before the hourly loop may stop.

## Reviews

### 2026-08-14 14:10 EDT — Baseline

- **Verdict:** Usable route established; not yet declared classroom-ready.
- **Evidence:** Automated full-route test passed from boot through UMass backpack, information-desk question, shuttle choice, A$12 deduction, A$38 remaining, Virtual Kyoto, and Kyoto city syllabus.
- **Changed:** Added the airport decision loop and generated arrivals-hall artwork.
- **Next weakness:** Perform a complete phone-sized interaction and overflow audit, then improve the highest-impact unclear affordance.

### 2026-08-14 15:32 EDT — Complete pass 1 of 2

- **Verdict:** A first-year student can complete the current route without explanation or rescue on desktop and phone; this is the first consecutive complete readiness pass, so the hourly review continues.
- **Evidence:** Full student route passed at 1440×900 and 390×844: UMass backpack, information desk, typed cheapest-route question, shuttle selection, A$50−A$12=A$38 consequence, imagined-prologue/Gibson boundary, vendor–cassette–console sequence, repeated “Whole city in there,” and entry into the Kyoto city syllabus. Page-error capture and horizontal-overflow assertions were clean at both sizes; the keyboard/reduced-motion test also passed.
- **Changed:** Moved the backpack and information-desk hotspots out of the background stacking context so the phone story panel no longer intercepts taps; added explicit accessible names; suppressed global arrow navigation while a dialog or text field is active. Added a repeatable Playwright readiness regression using the installed Brave browser.
- **Test result:** `node --check game.js` passed; Playwright readiness suite: 3/3 passed.
- **Next weakness:** Give each dialog an explicit accessible name (`aria-labelledby`) so screen-reader users hear its purpose immediately.

### 2026-08-14 16:32 EDT — Complete pass 2 of 2

- **Verdict:** A first-year student can complete the route without explanation or rescue on desktop and phone. This is the second consecutive complete readiness pass; recurring cron `79e30a97-ab84-403f-a8be-2bb78e3a3612` was removed.
- **Evidence:** Full student route passed at 1440×900 and 390×844, covering the UMass backpack, discoverable information desk, typed-question fallback, A$50−A$12=A$38 transport consequence, imagined-prologue/Gibson boundary, Kelsey–vendor–cassette–console sequence, repeated “Whole city in there,” and entry into the Kyoto city syllabus. Page-error capture and horizontal-overflow assertions were clean; keyboard and reduced-motion safeguards passed.
- **Changed:** Gave the story transcript, source credits, course invitation, and information-desk dialogs accessible names tied to their visible headings; added regression assertions for all four names.
- **Test result:** `node --check game.js` passed; Playwright readiness suite: 4/4 passed.
- **Next weakness:** If refinement resumes, improve the baggage-hall illustration while preserving the now-proven backpack hotspot and mobile tap target.

### 2026-08-15 12:34 EDT — Consequential tape branch checkpoint

- **Verdict:** The cassette purchase is now a real two-city branch; city destinations are not yet both complete.
- **Evidence:** Virtual Kyoto passed the full route at 1440×900 and Virtual Taipei passed at 390×844. Both deduct A$20 from the shared wallet, enter persistent tape inventory, preserve “Whole city in there,” return to the selected-tape console, and resolve to the matching threshold. Page-error and horizontal-overflow assertions were clean.
- **Keyboard:** A role-based keyboard pass selected and bought Taipei with Enter, verified the bus-route balance changed from A$46 to A$26 exactly once, entered the matching threshold, and verified Arrow Right does not pass the disabled unfinished-course boundary.
- **Boundary:** Kyoto links to the existing provisional course plan. Taipei stops at an explicitly unfinished city threshold; it is not represented as a completed course world.
- **Test result:** `node --check game.js` passed; Playwright readiness suite: 8/8 passed.
- **Next weakness:** Build coherent Kyoto and Taipei threshold/course pages from the common city template before claiming phase-one destination completion.

### 2026-08-15 14:34 EDT — Both city thresholds connected

- **Verdict:** Kyoto and Taipei now both cross from the purchased cassette into a coherent city-specific course destination.
- **Branch evidence:** Kyoto retains its existing `course.html` destination. Taipei now reaches `taipei.html`, which reuses the common city-syllabus layout and `course.css` while supplying a Taipei question, encounters, resources/pathways, and next action.
- **State evidence:** The selected branch is named in the HUD tape/destination fields, threshold copy, course-invitation kicker and link, and destination-page marker. The existing purchase lock still prevents swapping tapes or paying twice.
- **Responsive routes:** The complete Kyoto route passed at 1440×900; the complete Taipei route passed at 390×844. Both continued through the course invitation and asserted the matching URL, city heading, branch marker, content sections, clean page-error capture, and no horizontal overflow.
- **Keyboard:** The Taipei bus path preserved A$26 after the one-time cassette charge, opened the course invitation by keyboard, and entered the Taipei page with Enter.
- **Test result:** `node --check game.js` passed; Playwright readiness suite: 8/8 passed.
- **Honest boundary:** Course destinations are coherent provisional plans. Saved progress, field notes, bounded guides, and Sixth Tape automation remain later work.
