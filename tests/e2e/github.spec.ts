import { test, expect, request } from 'playwright/test'

test('GitHub user search with mocking', async ({page}) => {
  await page.route('https://api.github.com/users/jakubgania', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        login: 'jakubgania',
        name: 'Jakub Gania',
        avatar_url: 'https://avatars.githubusercontent.com/u/21696393?v=4',
        bio: 'web.cloud.tech',
        blog: 'jakubgania.io',
        twitter_username: 'jakubgania',
        location: 'Dortmund, Germany',
        followers: 66,
        following: 126,
        public_repos: 31,
        html_url: 'https://github.com/jakubgania'
      })
    });

    await page.route('https://api.github.com/users/jakubgania/followers?per_page=8', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            login: 'mocked-followers-1',
            avatar_url: 'https://example.com/avatar1.png',
            html_url: 'https://github.com/mocked-follower-1'
          }
        ])
      })
    })
  })

  await page.goto('http://localhost:5173/github');
  await page.fill('input.text-input', 'jakubgania');
  await page.click('button');
  await page.waitForTimeout(2000);
  await page.waitForSelector('h2');
  await page.waitForTimeout(2000);
  await expect(page.locator('.item h2').first()).toHaveText('jakubgania');
  await page.waitForTimeout(2000);

  // await expect(page.locator('h2').first()).toHaveText('jakubgania');
  // await expect(page.locator('h2')).toHaveText('jakubgania');
})