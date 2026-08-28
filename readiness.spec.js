const { test, expect } = require('@playwright/test');

test('Kyoto course introduction hands Virtual Kyoto to the instructor-operated globe honestly', async ({ page }) => {
  await page.goto('http://127.0.0.1:4173/course.html');
  await expect(page.getByRole('heading', { name: /Kelsey puts on the glasses and gloves/i })).toBeVisible();
  await expect(page.getByText(/Virtual Kyoto opens in class/i)).toBeVisible();
  await expect(page.getByText(/Students do not need an account, API key, or installation/i)).toBeVisible();
  await expect(page.getByText(/one thing the globe lets you observe/i)).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

async function reachVendor(page, mode = 'taxi') {
  await page.getByRole('button', { name: /begin arrival/i }).click();
  await page.getByRole('button', { name: /small red ribbon/i }).click();
  await page.getByRole('button', { name: /enter main arrivals/i }).click();
  await page.getByRole('button', { name: 'Open the airport information desk' }).click();
  await page.getByRole('button', { name: new RegExp(mode, 'i') }).click();
  await page.getByRole('button', { name: new RegExp(`take the ${mode}`, 'i') }).click();
  await page.getByRole('button', { name: /arrive at the apartment/i }).click();
  await page.getByRole('button', { name: /read your brother's note/i }).click();
  await page.getByRole('button', { name: /walk to the mall/i }).click();
  await page.getByRole('button', { name: /enter the free trade zone/i }).click();
  await page.getByRole('button', { name: /approach the table/i }).click();
}

async function expectNoHorizontalOverflow(page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflow).toBe(false);
}

for (const { viewport, tape, tapeShort } of [
  { viewport: { width: 1440, height: 900 }, tape: 'VIRTUAL KYOTO', tapeShort: 'KYOTO' },
  { viewport: { width: 1440, height: 900 }, tape: 'VIRTUAL TAIPEI', tapeShort: 'TAIPEI' },
  { viewport: { width: 390, height: 844 }, tape: 'VIRTUAL KYOTO', tapeShort: 'KYOTO' },
  { viewport: { width: 390, height: 844 }, tape: 'VIRTUAL TAIPEI', tapeShort: 'TAIPEI' }
]) {
  test(`student route ${viewport.width}x${viewport.height} buys ${tape}`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize(viewport);
    await page.goto('http://127.0.0.1:4173');
    await expectNoHorizontalOverflow(page);
    await page.getByRole('button', { name: /begin arrival/i }).click();
    await expect(page.getByText(/scan the panorama/i)).toBeVisible();
    await expect(page.locator('.scene--airport .environment')).toHaveCSS('background-image', /darwin-baggage-carousel\.webp/);
    await expect(page.locator('.decoy-hotspot')).toHaveCount(3);
    await page.getByRole('button', { name: /looks familiar/i }).click();
    await expect(page.getByText(/no red ribbon/i)).toBeVisible();
    await page.getByRole('button', { name: /remember the check-in/i }).click();
    await expect(page.getByText(/little red ribbon/i)).toBeVisible();
    await page.locator('.bag-hotspot').click();
    await expect(page.getByText('COLLECTED', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: /enter main arrivals/i })).toBeVisible();
    await page.getByRole('button', { name: /enter main arrivals/i }).click();
    await page.getByRole('button', { name: 'Open the airport information desk' }).click();
    await page.getByRole('button', { name: /take a free city map/i }).click();
    await expect(page.getByText('CITY MAP', { exact: true })).toBeVisible();

    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('dialog', { name: 'How can I help?' })).toBeVisible();
    await page.getByLabel('Ask a question').fill('What is the fastest way to my brother’s apartment?');
    await page.getByRole('button', { name: 'ASK' }).click();
    await expect(page.getByText(/taxi is the direct route/i)).toBeVisible();
    await page.getByRole('button', { name: /taxi/i }).click();
    await expect(page.getByText('A$22', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: /take the taxi/i }).click();
    await expect(page.getByRole('heading', { name: /read the city/i })).toBeVisible();
    await expect(page.locator('.scene--transit .environment')).toHaveCSS('background-image', /darwin-transit-window\.webp/);
    await expect(page.getByText(/free city map lies open/i)).toBeVisible();
    await expect(page.getByText(/fare leaves A\$22/i)).toBeVisible();

    await page.getByRole('button', { name: /arrive at the apartment/i }).click();
    await expect(page.getByRole('heading', { name: /brother's place/i })).toBeVisible();
    await expect(page.getByText(/sound: muffled through floor/i)).toBeVisible();
    await page.getByRole('button', { name: /show me my brother/i }).click();
    await expect(page.getByText(/select read note/i)).toBeVisible();
    await expect(page.locator('.note-hotspot')).toBeFocused();
    await expectNoHorizontalOverflow(page);
    expect(await page.locator('#game').evaluate(element => [element.scrollLeft, element.scrollTop])).toEqual([0, 0]);
    await page.getByRole('button', { name: /inspect the anonymous console/i }).click();
    await expect(page.getByText(/empty cassette slot/i)).toBeVisible();
    await page.getByRole('button', { name: /put in the earplugs/i }).click();
    await expect(page.getByText(/music disappears/i)).toBeVisible();
    await expect(page.getByText(/sound: muted \/ earplugs/i)).toBeVisible();
    await page.getByRole('button', { name: /house keys and go to the bar/i }).click();
    await expect(page.getByRole('heading', { name: /downstairs/i })).toBeVisible();
    await expect(page.getByText(/same music/i)).toBeVisible();
    await expect(page.getByText(/sound: bar \/ music \+ voices/i)).toBeVisible();
    await page.getByRole('button', { name: /sit at the bar and talk/i }).click();
    await expect(page.getByRole('dialog', { name: /what’ll ya have/i })).toBeVisible();
    await expect(page.getByText(/how ya goin/i)).toBeVisible();
    await page.getByLabel(/talk to the bartender/i).fill('Is the music always this loud?');
    await page.getByRole('button', { name: 'SAY' }).click();
    await expect(page.getByText(/always this loud on saturday/i)).toBeVisible();
    await page.getByRole('button', { name: /leave the bar conversation/i }).click();
    await page.getByRole('button', { name: /return upstairs/i }).click();
    await expect(page.getByRole('heading', { name: /brother's place/i })).toBeVisible();
    await expect(page.getByText(/sound: muted \/ earplugs/i)).toBeVisible();
    await page.getByRole('button', { name: /read your brother's note/i }).click();
    await expect(page.getByRole('button', { name: /walk to the mall/i })).toBeEnabled();
    await expect(page.getByText('A$22', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: /walk to the mall/i }).click();
    await expect(page.getByText('WALK TO THE MALL', { exact: true })).toBeVisible();
    expect(await page.locator('#game').evaluate(element => [element.scrollLeft, element.scrollTop])).toEqual([0, 0]);
    await page.getByRole('button', { name: /enter the free trade zone/i }).click();
    await expect(page.getByText("GIBSON'S STORY BEGINS HERE")).toBeVisible();
    await page.getByRole('button', { name: /approach the table/i }).click();
    await expectNoHorizontalOverflow(page);
    await page.getByRole('button', { name: new RegExp(`^${tape},`, 'i') }).click();
    await expect(page.locator('#observation')).toContainText(/whole city in there/i);
    await page.getByRole('button', { name: new RegExp(`buy ${tape}`, 'i') }).click();
    await expect(page.getByText('A$2', { exact: true })).toBeVisible();
    await expect(page.getByText(tapeShort, { exact: true })).toBeVisible();
    await expect(page.getByText(new RegExp(`${tape} goes into your bag`, 'i'))).toBeVisible();
    await page.getByRole('button', { name: new RegExp(`return with ${tape}`, 'i') }).click();
    await expect(page.getByText('WHOLE CITY IN THERE', { exact: true }).first()).toBeVisible();
    await expect(page.getByText(new RegExp(`slot ${tape} into the machine`, 'i'))).toBeVisible();
    await page.getByRole('button', { name: new RegExp(`enter ${tape}`, 'i') }).click();
    await expect(page.getByText('WHOLE CITY IN THERE', { exact: true }).first()).toBeVisible();
    if (tape === 'VIRTUAL TAIPEI') {
      await expect(page.getByRole('heading', { name: /taipei signal/i })).toBeVisible();
      await expect(page.getByText(/this is the taipei branch/i)).toBeVisible();
    }
    await page.getByRole('button', { name: new RegExp(`open the ${tapeShort} course plan`, 'i') }).click();
    await expect(page.getByRole('dialog', { name: 'Five tapes are waiting.' })).toBeVisible();
    await expect(page.getByText(`SELECTED CASSETTE / ${tape}`, { exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: new RegExp(`enter the ${tapeShort} city syllabus`, 'i') })).toBeVisible();
    await page.getByRole('link', { name: new RegExp(`enter the ${tapeShort} city syllabus`, 'i') }).click();
    await expect(page).toHaveURL(tapeShort === 'KYOTO' ? /course\.html$/ : /taipei\.html$/);
    await expect(page.getByRole('heading', { name: tapeShort, exact: true })).toBeVisible();
    await expect(page.getByText(`SELECTED BRANCH · ${tape}`, { exact: true })).toBeVisible();
    await expect(page.getByText('01 / CITY QUESTION', { exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: /four encounters with the city/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /build a real pathway/i })).toBeVisible();
    await expect(page.getByText(tapeShort === 'KYOTO' ? '06 / MAKE THE NEXT TAPE' : '05 / MAKE THE NEXT TAPE', { exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Sixth Tape is the final assignment/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /return to the international life home page/i }).first()).toBeVisible();
    await expectNoHorizontalOverflow(page);
    expect(errors).toEqual([]);
  });
}

test('reduced motion and keyboard safeguards', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('http://127.0.0.1:4173');
  expect(await page.locator('.grain').evaluate(el => getComputedStyle(el).display)).toBe('none');
  await page.keyboard.press('ArrowRight');
  await page.locator('.bag-hotspot').focus();
  await page.keyboard.press('Enter');
  await page.keyboard.press('ArrowRight');
  await page.getByRole('button', { name: 'Open the airport information desk' }).focus();
  await page.keyboard.press('Enter');
  await page.getByLabel('Ask a question').fill('taxi?');
  await page.keyboard.press('ArrowLeft');
  await expect(page.locator('#information-desk')).toBeVisible();
  await expect(page.getByLabel('Ask a question')).toHaveValue('taxi?');
});

test('cassette choice and purchase are keyboard operable without double charging', async ({ page }) => {
  await page.goto('http://127.0.0.1:4173');
  await reachVendor(page, 'bus');
  const taipeiTape = page.getByRole('button', { name: /^VIRTUAL TAIPEI,/i });
  await taipeiTape.focus();
  await page.keyboard.press('Enter');
  await expect(taipeiTape).toHaveAttribute('aria-pressed', 'true');
  const buy = page.getByRole('button', { name: /buy virtual taipei/i });
  await buy.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByText('A$26', { exact: true })).toBeVisible();
  await expect(page.getByText('TAIPEI', { exact: true })).toBeVisible();
  const purchasedTape = page.getByRole('button', { name: /^VIRTUAL TAIPEI,/i });
  await expect(purchasedTape).toBeDisabled();
  await page.getByRole('button', { name: /return with virtual taipei/i }).focus();
  await page.keyboard.press('Enter');
  await page.getByRole('button', { name: /enter virtual taipei/i }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: /taipei signal/i })).toBeVisible();
  await page.getByRole('button', { name: /open the taipei course plan/i }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('dialog', { name: 'Five tapes are waiting.' })).toBeVisible();
  await expect(page.getByText('SELECTED CASSETTE / VIRTUAL TAIPEI', { exact: true })).toBeVisible();
  await page.getByRole('link', { name: /enter the taipei city syllabus/i }).focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/taipei\.html$/);
  await expect(page.getByText('SELECTED BRANCH · VIRTUAL TAIPEI', { exact: true })).toBeVisible();
});

for (const route of [
  { mode: 'bus', balance: 'A$46', consequence: /one change and a final walk/i },
  { mode: 'shuttle', balance: 'A$38', consequence: /turns toward the Esplanade/i }
]) {
  test(`${route.mode} fare remains consequential through apartment arrival`, async ({ page }) => {
    await page.goto('http://127.0.0.1:4173');
    await page.getByRole('button', { name: /begin arrival/i }).click();
    await page.getByRole('button', { name: /small red ribbon/i }).click();
    await page.getByRole('button', { name: /enter main arrivals/i }).click();
    await page.getByRole('button', { name: 'Open the airport information desk' }).click();
    await page.getByRole('button', { name: new RegExp(route.mode, 'i') }).click();
    await expect(page.getByText(route.balance, { exact: true })).toBeVisible();
    await page.getByRole('button', { name: new RegExp(`take the ${route.mode}`, 'i') }).click();
    await expect(page.getByText(route.consequence)).toBeVisible();
    await page.getByRole('button', { name: /arrive at the apartment/i }).click();
    await expect(page.getByRole('heading', { name: /brother's place/i })).toBeVisible();
    await expect(page.getByText(route.balance, { exact: true })).toBeVisible();
  });
}

test('supporting dialogs expose their visible headings as accessible names', async ({ page }) => {
  await page.goto('http://127.0.0.1:4173');
  await page.getByRole('button', { name: 'Read the story' }).click();
    await expect(page.getByRole('dialog', { name: 'The International Life' })).toBeVisible();
  await page.getByRole('button', { name: 'Close story transcript' }).click();
  await page.getByRole('button', { name: 'Sources & credits' }).click();
  await expect(page.getByRole('dialog', { name: 'What is imagined, and what is Gibson?' })).toBeVisible();
});

test('baggage state and visited chapters survive backtracking', async ({ page }) => {
  await page.goto('http://127.0.0.1:4173');
  await page.getByRole('button', { name: /begin arrival/i }).click();
  await page.getByRole('button', { name: /small red ribbon/i }).click();
  await page.getByRole('button', { name: /enter main arrivals/i }).click();

  await page.getByRole('button', { name: /go to scene: darwin international airport/i }).click();
  await expect(page.getByText('COLLECTED', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: /enter main arrivals/i })).toBeEnabled();

  const arrivalsChapter = page.getByRole('button', { name: /go to scene: darwin airport \/ main arrivals/i });
  await expect(arrivalsChapter).toBeEnabled();
  await arrivalsChapter.click();
  await expect(page.getByRole('button', { name: 'Open the airport information desk' })).toBeVisible();
});
