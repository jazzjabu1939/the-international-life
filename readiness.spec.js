const { test, expect } = require('@playwright/test');

for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  test(`student route ${viewport.width}x${viewport.height}`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize(viewport);
    await page.goto('http://127.0.0.1:4173');
    await page.getByRole('button', { name: /begin arrival/i }).click();
    await expect(page.getByText(/scan the panorama/i)).toBeVisible();
    await expect(page.locator('.scene--airport .environment')).toHaveCSS('background-image', /darwin-baggage-carousel\.webp/);
    await expect(page.locator('.decoy-hotspot')).toHaveCount(3);
    await page.getByRole('button', { name: /inspect dark suitcase/i }).click();
    await expect(page.getByText(/not yours/i)).toBeVisible();
    await page.locator('.bag-hotspot').click();
    await expect(page.getByText('COLLECTED', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: /enter main arrivals/i })).toBeVisible();
    await page.getByRole('button', { name: /enter main arrivals/i }).click();
    await page.getByRole('button', { name: 'Open the airport information desk' }).click();

    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('dialog', { name: 'How can I help?' })).toBeVisible();
    await page.getByLabel('Ask a question').fill('What is the fastest way to my brother’s apartment?');
    await page.getByRole('button', { name: 'ASK' }).click();
    await expect(page.getByText(/taxi is the direct route/i)).toBeVisible();
    await page.getByRole('button', { name: /taxi/i }).click();
    await expect(page.getByText('A$22', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: /take the taxi/i }).click();
    await expect(page.getByText(/fare leaves A\$22/i)).toBeVisible();

    await page.getByRole('button', { name: /arrive at the apartment/i }).click();
    await expect(page.getByRole('heading', { name: /brother's place/i })).toBeVisible();
    expect(await page.locator('#game').evaluate(element => [element.scrollLeft, element.scrollTop])).toEqual([0, 0]);
    await page.getByRole('button', { name: /inspect the anonymous console/i }).click();
    await expect(page.getByText(/empty cassette slot/i)).toBeVisible();
    await page.getByRole('button', { name: /take the earplugs/i }).click();
    await expect(page.getByText(/bass still reaches the bedframe/i)).toBeVisible();
    await page.getByRole('button', { name: /read your brother's note/i }).click();
    await expect(page.getByRole('button', { name: /walk to the mall/i })).toBeEnabled();
    await expect(page.getByText('A$22', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: /walk to the mall/i }).click();
    await expect(page.getByText('WALK TO THE MALL', { exact: true })).toBeVisible();
    expect(await page.locator('#game').evaluate(element => [element.scrollLeft, element.scrollTop])).toEqual([0, 0]);
    await page.getByRole('button', { name: /enter the free trade zone/i }).click();
    await expect(page.getByText("GIBSON'S STORY BEGINS HERE")).toBeVisible();
    await page.getByRole('button', { name: /approach the table/i }).click();
    await page.getByRole('button', { name: 'VIRTUAL KYOTO', exact: true }).click();
    await page.getByRole('button', { name: /buy the selected tape/i }).click();
    await expect(page.getByText('WHOLE CITY IN THERE', { exact: true }).first()).toBeVisible();
    await page.getByRole('button', { name: /enter virtual kyoto/i }).click();
    await expect(page.getByText('WHOLE CITY IN THERE', { exact: true }).first()).toBeVisible();
    await page.getByRole('button', { name: /open the city syllabus/i }).click();
    await expect(page.getByRole('dialog', { name: 'Five tapes are waiting.' })).toBeVisible();
    await page.getByRole('link', { name: /enter the city syllabus/i }).click();
    await expect(page).toHaveURL(/course\.html$/);
    await expect(page.getByRole('heading', { name: 'KYOTO', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: /return to the international life home page/i }).first()).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(overflow).toBe(false);
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

for (const route of [
  { mode: 'bus', balance: 'A$46', consequence: /one change and a final walk/i },
  { mode: 'shuttle', balance: 'A$38', consequence: /turns toward the Esplanade/i }
]) {
  test(`${route.mode} fare remains consequential through apartment arrival`, async ({ page }) => {
    await page.goto('http://127.0.0.1:4173');
    await page.getByRole('button', { name: /begin arrival/i }).click();
    await page.getByRole('button', { name: /collect the tan leather duffel/i }).click();
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
  await page.getByRole('button', { name: /collect the tan leather duffel/i }).click();
  await page.getByRole('button', { name: /enter main arrivals/i }).click();

  await page.getByRole('button', { name: /go to scene: darwin international airport/i }).click();
  await expect(page.getByText('COLLECTED', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: /enter main arrivals/i })).toBeEnabled();

  const arrivalsChapter = page.getByRole('button', { name: /go to scene: darwin airport \/ main arrivals/i });
  await expect(arrivalsChapter).toBeEnabled();
  await arrivalsChapter.click();
  await expect(page.getByRole('button', { name: 'Open the airport information desk' })).toBeVisible();
});
