import { expect, test } from "@playwright/test";

const publicRoutes = [
  "/",
  "/about",
  "/about/vision-mission",
  "/about/leadership",
  "/leadership/pastor-stephen-kabuye",
  "/ministries",
  "/ministries/kingdom-teaching-and-discipleship",
  "/contact",
  "/plan-your-visit",
  "/live",
  "/radio",
  "/radio/schedule",
  "/radio/programmes",
  "/watch",
  "/sermons",
  "/sermons/discovering-purpose",
  "/podcasts",
  "/podcasts/purpose-conversations",
  "/news",
  "/news/welcome-to-the-cpmi-digital-ministry",
  "/events",
  "/events/worship-and-purpose-gathering-preview",
  "/stories",
  "/stories/learning-to-serve-close-to-home",
  "/gallery",
  "/scripture",
  "/devotionals",
  "/devotionals/an-invitation-to-rest-and-purpose",
  "/prayer",
  "/get-involved",
  "/give",
  "/give/campaigns",
  "/give/campaigns/community-care-preview",
  "/give/contribute",
  "/search?q=purpose",
  "/privacy",
  "/terms",
  "/admin/login",
];

test("all configured public entry routes respond without server errors", async ({ request }) => {
  for (const route of publicRoutes) {
    const response = await request.get(route);
    expect(response.status(), `${route} returned ${response.status()}`).toBeLessThan(400);
  }
});

test("unknown dynamic content uses the custom not-found response", async ({ request }) => {
  const response = await request.get("/ministries/not-a-real-ministry");
  expect(response.status()).toBe(404);
  expect(await response.text()).toContain("This path does not lead anywhere yet");
});

test("radio dock is visible before playback and persists across client-side navigation", async ({ page }) => {
  await page.goto("/");
  await page.locator(".cpmi-preloader").waitFor({ state: "detached" });
  const player = page.getByRole("complementary", { name: /persistent cpmi radio player/i });
  await expect(player).toBeVisible();
  await expect(player).toContainText("Kingdom Radio Stream");
  await expect(player).toContainText("Preview");
  await page.getByRole("link", { name: "Discover CPMI" }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(player).toBeVisible();
  await player.getByRole("link", { name: "Open CPMI Radio" }).click();
  await expect(page).toHaveURL(/\/radio$/);
  await expect(player).toBeHidden();
  await expect(page.getByRole("region", { name: /CPMI Radio listening console/i })).toBeVisible();
});

test("mobile navigation exposes destinations without hover", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.locator(".cpmi-preloader").waitFor({ state: "detached" });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.locator(".cpmi-offcanvas")).toHaveClass(/info-open/);
  await page.getByRole("button", { name: /open about menu/i }).click();
  await page.locator(".cpmi-offcanvas").getByRole("link", { name: "Vision & Mission" }).click();
  await expect(page).toHaveURL(/\/about\/vision-mission$/);
});

test("mobile radio dock stays compact and the listen console replaces it", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.locator(".cpmi-preloader").waitFor({ state: "detached" });
  const dock = page.getByRole("complementary", { name: /persistent cpmi radio player/i });
  await expect(dock).toBeVisible();
  await expect(dock.locator(".player-artwork")).toBeVisible();
  await expect(dock).toContainText("CPMI Radio");
  await expect(dock).toContainText("Kingdom Radio Stream");
  await expect(dock.getByRole("button", { name: "Play CPMI radio" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);

  await page.goto("/radio");
  await expect(dock).toBeHidden();
  const console = page.getByRole("region", { name: /CPMI Radio listening console/i });
  await expect(console).toBeVisible();
  await expect(console.getByRole("button", { name: "Play CPMI Radio" })).toBeVisible();
  const box = await console.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.y).toBeLessThan(844);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  for (const route of ["/radio", "/live", "/watch"]) {
    await page.goto(route);
    await page.locator(".cpmi-preloader").waitFor({ state: "detached" });
    await page.locator("footer").scrollIntoViewIfNeeded();
    const back = page.getByRole("link", { name: "Back to player" });
    await expect(back).toBeInViewport();
    await back.click();
    await expect(page.locator("#broadcast-player")).toBeInViewport();
  }
});

test("manual giving cannot advance without verified payment details", async ({ page }) => {
  await page.goto("/give/contribute");
  await page.locator(".cpmi-preloader").waitFor({ state: "detached" });
  await page.getByRole("button", { name: "Continue" }).click();
  await page.getByRole("button", { name: /ZAR 250/i }).click();
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByText("Verified payment instructions are not configured")).toBeVisible();
  await expect(page.getByRole("button", { name: "I have made the transfer" })).toBeDisabled();
});

test("demo-mode contact endpoint never claims a submission was saved", async ({ request }) => {
  const response = await request.post("/api/forms/contact", {
    data: {
      name: "Functional Test",
      email: "test@example.com",
      contactPreference: "EMAIL",
      subject: "Testing demonstration mode",
      message: "This request verifies that unavailable persistence is reported truthfully.",
      consent: true,
      website: "",
    },
  });
  expect(response.status()).toBe(503);
  const body = await response.json();
  expect(body.ok).toBe(false);
  expect(body.message).toContain("No information was saved");
});
