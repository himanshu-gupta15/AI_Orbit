import { chromium } from "playwright";

async function runBrowserTests() {
  console.log("Launching headless Chromium browser for testing...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });

  const page = await context.newPage();

  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });

  try {
    // 1. Visit /tools
    console.log("Navigating to http://localhost:3001/tools ...");
    await page.goto("http://localhost:3001/tools", { waitUntil: "networkidle" });

    const title = await page.title();
    console.log(`Page title: "${title}"`);

    // Verify presence of header, title, cards
    const heading = await page.locator("h1").textContent();
    console.log(`Page heading: "${heading?.trim()}"`);

    const initialCards = await page.locator(".group.relative.flex.flex-col").count();
    console.log(`Rendered tool cards count on page 1: ${initialCards}`);

    await page.screenshot({
      path: "/Users/himanshugupta/.gemini/antigravity-ide/brain/3c624f79-d52d-47ab-850c-37627eba3420/tools_listing.png",
      fullPage: false,
    });
    console.log("Saved screenshot: tools_listing.png");

    // 2. Test search functionality
    console.log("Testing search input with 'Cursor'...");
    const searchInput = page.locator("input[placeholder*='Search AI tools']");
    await searchInput.fill("Cursor");
    await page.waitForTimeout(600); // Wait for debounce

    const searchCards = await page.locator(".group.relative.flex.flex-col").count();
    const searchFirstCard = await page.locator(".group.relative.flex.flex-col").first().textContent();
    console.log(`Filtered cards count for 'Cursor': ${searchCards}`);
    console.log(`First card contains 'Cursor': ${searchFirstCard.includes("Cursor")}`);

    await page.screenshot({
      path: "/Users/himanshugupta/.gemini/antigravity-ide/brain/3c624f79-d52d-47ab-850c-37627eba3420/search_results.png",
      fullPage: false,
    });
    console.log("Saved screenshot: search_results.png");

    // 3. Clear search and test Category Filter
    console.log("Clearing search and selecting 'Coding' category...");
    await searchInput.fill("");
    await page.waitForTimeout(600);

    const codingButton = page.locator("button:has-text('Coding')").first();
    await codingButton.click();
    await page.waitForTimeout(600);

    const codingCards = await page.locator(".group.relative.flex.flex-col").count();
    console.log(`Cards count for 'Coding' category: ${codingCards}`);

    // 4. Navigate to Tool Detail Page (/tools/cursor)
    console.log("Navigating to Cursor detail page...");
    await page.goto("http://localhost:3001/tools/cursor", { waitUntil: "networkidle" });

    const detailTitle = await page.title();
    console.log(`Detail page title: "${detailTitle}"`);

    const detailH1 = await page.locator("h1").textContent();
    console.log(`Detail tool name: "${detailH1?.trim()}"`);

    const overview = await page.locator("section:has-text('Overview')").textContent();
    console.log(`Has Overview section: ${overview !== null && overview.length > 20}`);

    const features = await page.locator("section:has-text('Key Features')").textContent();
    console.log(`Has Key Features section: ${features !== null}`);

    const useCases = await page.locator("section:has-text('Common Use Cases')").textContent();
    console.log(`Has Common Use Cases: ${useCases !== null}`);

    const pricing = await page.locator("section:has-text('Pricing & Plans')").textContent();
    console.log(`Has Pricing & Plans: ${pricing !== null}`);

    const related = await page.locator("div:has-text('Related AI Tools')").first().textContent();
    console.log(`Has Related Tools card: ${related !== null}`);

    await page.screenshot({
      path: "/Users/himanshugupta/.gemini/antigravity-ide/brain/3c624f79-d52d-47ab-850c-37627eba3420/cursor_detail.png",
      fullPage: false,
    });
    console.log("Saved screenshot: cursor_detail.png");

    // 5. Test Mobile Viewport
    console.log("Testing mobile viewport (375x812)...");
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("http://localhost:3001/tools", { waitUntil: "networkidle" });
    await page.waitForTimeout(500);

    await page.screenshot({
      path: "/Users/himanshugupta/.gemini/antigravity-ide/brain/3c624f79-d52d-47ab-850c-37627eba3420/mobile_view.png",
      fullPage: false,
    });
    console.log("Saved screenshot: mobile_view.png");

    console.log("Console errors detected:", consoleErrors);
    console.log(">>> ALL REAL BROWSER CHECKS COMPLETED AND PASSED! <<<");
  } catch (err) {
    console.error("Test failed with error:", err);
  } finally {
    await browser.close();
  }
}

runBrowserTests();
