import { expect, test } from "@playwright/test";

test.describe("WordInput interaction", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should allow typing character by character and advance focus", async ({ page }) => {
    // Initial word length is 5
    const inputs = page.locator('input[id^="pattern-"]');
    await expect(inputs).toHaveCount(5);

    // Focus first input and type 'h'
    await page.locator('#pattern-0').focus();
    await page.keyboard.press('h', { delay: 50 });
    await expect(page.locator('#pattern-1')).toBeFocused();

    await page.keyboard.press('e', { delay: 50 });
    await expect(page.locator('#pattern-2')).toBeFocused();

    await page.keyboard.press('l', { delay: 50 });
    await expect(page.locator('#pattern-3')).toBeFocused();

    await page.keyboard.press('l', { delay: 50 });
    await expect(page.locator('#pattern-4')).toBeFocused();

    await page.keyboard.press('o', { delay: 50 });

    // Verify all inputs have correct values
    for (let i = 0; i < 5; i++) {
      await expect(page.locator(`#pattern-${i}`)).toHaveValue(['h', 'e', 'l', 'l', 'o'][i]);
    }

    // Verify words are loaded (results article should appear)
    await expect(page.locator('article')).toBeVisible();
    await expect(page.locator('article button').first()).toBeVisible();
  });

  test("should handle backspace and move focus back", async ({ page }) => {
    // Type 'hel'
    await page.locator('#pattern-0').focus();
    await page.keyboard.press('h');
    await page.keyboard.press('e');
    await page.keyboard.press('l');
    await expect(page.locator('#pattern-3')).toBeFocused();

    // Press backspace on the focused empty input (index 3)
    await page.keyboard.press('Backspace');
    
    // index 3 was empty, so it should focus AND clear index 2 ('l')
    await expect(page.locator('#pattern-2')).toBeFocused();
    await expect(page.locator('#pattern-2')).toHaveValue('');
    
    // Press backspace again on index 2 (now empty)
    await page.keyboard.press('Backspace');
    // Now it should focus AND clear index 1 ('e')
    await expect(page.locator('#pattern-1')).toBeFocused();
    await expect(page.locator('#pattern-1')).toHaveValue('');

    // Type 'a'
    await page.keyboard.press('a');
    await expect(page.locator('#pattern-2')).toBeFocused();
    await expect(page.locator('#pattern-1')).toHaveValue('a');
  });

  test("should deduplicate advanced filters", async ({ page }) => {
    // Fill the pattern first to show filters
    await page.locator('#pattern-0').fill('h');
    await page.locator('#pattern-1').fill('e');
    await page.locator('#pattern-2').fill('l');
    await page.locator('#pattern-3').fill('l');
    await page.locator('#pattern-4').fill('o');

    // Show filters
    await page.getByLabel('hide advanced filters').click();

    const excludeInput = page.locator('#exclude');
    await excludeInput.fill('aabbcc');
    
    // Should be deduped to 'abc'
    await expect(excludeInput).toHaveValue('abc');
  });
});