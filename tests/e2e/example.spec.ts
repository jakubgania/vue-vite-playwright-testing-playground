import { test, expect } from 'playwright/test'

test('has title', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page).toHaveTitle("Vite + Vue + TS");
});

test('check meta tags and title in the <head>', async ({ page }) => {
  await page.goto('http://localhost:5173');
  const title = await page.title();
  expect(title).toBe('Vite + Vue + TS');
  const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
  expect(metaDescription).toBe('Example website');
  const metaKeywords = await page.locator('meta[name="keywords"]').getAttribute('content');
  expect(metaKeywords).toBe('vite, vue, playwright');
  const metaAuthor = await page.locator('meta[name="author"]').getAttribute('content');
  expect(metaAuthor).toBe('John Doe')
})