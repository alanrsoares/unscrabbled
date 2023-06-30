import { expect, test } from "@playwright/test";

const WORD_LENGTH = 5;

test("index page renders with default word length", async ({ page }) => {
  await page.goto("/");

  // do the same but using playwright's expect
  expect(await page.textContent("label")).toBe(
    `Enter word pattern with ${WORD_LENGTH} letters`
  );
});
