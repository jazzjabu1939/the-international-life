const { test, expect } = require('@playwright/test');

for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  test(`student route ${viewport.width}x${viewport.height}`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.setViewportSize(viewport);
    await page.goto('http://127.0.0.1:4173');
    await page.getByRole('button', { name: /begin arrival/i }).click();
    await expect(page.getByText(/click the luggage to inspect it/i)).toBeVisible();
    await page.getByRole('button', { name: /inspect black roller bag/i }).click();
    await expect(page.getByText(/not yours/i)).toBeVisible();
    await page.locator('.bag-hotspot').click();
    await expect(page.getByText('COLLECTED', { exact: true })).toBeVisible();
    await expect(page.getByRole('button', { name: /enter main arrivals/i })).toBeVisible();
    await page.getByRole('button', { name: /enter main arrivals/i }).click();
    await page.getByRole('button', { name: 'Open the airport information desk' }).click();

    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('dialog', { name: 'How can I help?' })).toBeVisible();
    await page.getByLabel('Ask a question').fill('What is the cheapest safe way to the hostel?');
    await page.getByRole('button', { name: 'ASK' }).click();
    await expect(page.getByText(/public bus is A\$4/i)).toBeVisible();
    await page.getByRole('button', { name: /shuttle/i }).click();
    await expect(page.getByText('A$38', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: /take the shuttle/i }).click();
    await expect(page.getByText(/you have A\$38 left/i)).toBeVisible();

    await page.getByRole('button', { name: /continue/i }).click();
    await page.getByRole('button', { name: /two weeks later/i }).click();
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
  await page.getByRole('button', { name: /collect the backpack/i }).click();
  await page.getByRole('button', { name: /enter main arrivals/i }).click();

  await page.getByRole('button', { name: /go to scene: darwin international airport/i }).click();
  await expect(page.getByText('COLLECTED', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: /enter main arrivals/i })).toBeEnabled();

  const arrivalsChapter = page.getByRole('button', { name: /go to scene: darwin airport \/ main arrivals/i });
  await expect(arrivalsChapter).toBeEnabled();
  await arrivalsChapter.click();
  await expect(page.getByRole('button', { name: 'Open the airport information desk' })).toBeVisible();
});
