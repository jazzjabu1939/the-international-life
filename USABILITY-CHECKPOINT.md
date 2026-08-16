# Human usability checkpoint — August 15, 2026, 4:30 PM EDT

## Method

The route was rendered in Brave at 1440×900 and 390×844. I read the visible screen and inspected pixel screenshots at every major state: title, baggage, arrivals, information desk, transport, apartment, bar, mall walk, mall, vendor, purchase, console, city threshold, course invitation, and city destination. Automated roles were used to reproduce each branch consistently, but the findings below came from the rendered screens rather than selector output alone.

Visual evidence is in [`evidence/2026-08-15-usability/`](evidence/2026-08-15-usability/). The desktop and phone contact sheets show the complete first pass. `phone-07-condo-fixed.png` and `phone-17-course-door-fixed.png` show the corrected high-impact phone states; `phone-07-condo-after.png` preserves the intermediate state that exposed the remaining pointer overlap.

## High-impact fixes

1. **Inert-looking primary actions now guide the student.** At baggage claim and in the apartment, the main action no longer looks clickable while doing nothing. It now reveals a plain-language instruction, moves focus to the required object, and gives that object a visible pulse. This works with pointer and keyboard input and respects reduced motion.
2. **Apartment controls no longer collide on phones.** A conflicting `top`/`bottom` rule had stretched the console hotspot into a tall transparent panel. It obscured the main action and crowded the note, keys, and earplugs. The phone layout is now an explicit two-by-two control grid with no interception or overlap.
3. **The city-syllabus link is visible when the course dialog opens.** On phones, the only onward action had been below an unmarked internal scroll. The link now appears immediately after the invitation copy, before the five-tape list.

## Verification

- `node --check game.js`: passed.
- Playwright: **10/10 passed**.
- Full Kyoto route: passed at 1440×900 and 390×844.
- Full Taipei route: passed at 1440×900 and 390×844.
- Keyboard cassette purchase and city entry: passed, including the one-time charge lock.
- Main-action guidance: passed with focus transfer to the leather duffel and brother's note.
- Reduced motion: passed; grain and all animations are suppressed.
- Supporting dialog names: passed.
- Bus, shuttle, and taxi consequences: passed.
- JavaScript page errors: none across the full routes.
- Horizontal overflow: none at the title, interaction route checkpoints, or either destination page.

## Remaining gaps

- This checkpoint used desktop Brave emulation for the phone viewport, not a physical iPhone or Android device. Touch target behavior, browser chrome, safe-area insets, and dynamic address-bar resizing remain device checks.
- Keyboard operation was verified, but a full screen-reader announcement pass was not performed.
- The procedural apartment/bar audio state was verified through controls and visible status text; headphone audibility, balance, and comfort were not judged in this headless run.
- Saved progress, field notes, bounded guides, and Sixth Tape automation remain intentionally outside phase one.

