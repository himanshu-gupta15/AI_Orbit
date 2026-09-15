import { chromium } from "playwright";

async function testNavbarTransitions() {
  console.log("Testing Navbar transitions between Business AI and Developer...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });

  const page = await context.newPage();

  try {
    // 1. Start at /tools
    await page.goto("http://localhost:3001/tools", { waitUntil: "networkidle" });
    console.log("Loaded /tools");

    // 2. Click Business AI in navbar
    console.log("Clicking 'Business AI' in navbar...");
    await page.click("nav a:has-text('Business AI')");
    await page.waitForTimeout(600);

    const businessUrl = page.url();
    console.log(`URL after clicking Business AI: ${businessUrl}`);

    const businessCards = await page.locator(".group.relative.flex.flex-col").count();
    console.log(`Business AI cards rendered: ${businessCards}`);

    // Verify Business AI active indicator
    const hasBusinessUnderline = await page.locator("nav a:has-text('Business AI') span").count();
    console.log(`Business AI has active indicator: ${hasBusinessUnderline > 0}`);

    // 3. Now click Developer in navbar
    console.log("Clicking 'Developer' in navbar...");
    await page.click("nav a:has-text('Developer')");
    await page.waitForTimeout(600);

    const devUrl = page.url();
    console.log(`URL after clicking Developer: ${devUrl}`);

    const devCards = await page.locator(".group.relative.flex.flex-col").count();
    console.log(`Developer cards rendered: ${devCards}`);

    // Verify Developer active indicator
    const hasDevUnderline = await page.locator("nav a:has-text('Developer') span").count();
    console.log(`Developer has active indicator: ${hasDevUnderline > 0}`);

    if (devCards > 0 && businessCards > 0) {
      console.log(">>> SUCCESS: Navbar transitions between Business AI and Developer work perfectly! <<<");
    } else {
      console.error("Failed: No cards rendered for one of the categories.");
    }
  } catch (err) {
    console.error("Test failed with error:", err);
  } finally {
    await browser.close();
  }
}

testNavbarTransitions();
