import { chromium } from "playwright";
import path from "path";

const ARTIFACTS_DIR = "/Users/himanshugupta/.gemini/antigravity-ide/brain/3c624f79-d52d-47ab-850c-37627eba3420";
const BASE_URL = "http://localhost:3001";

async function run() {
  console.log("Starting Playwright E2E verification...");
  const browser = await chromium.launch({
    headless: true,
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  // 1. Visit Homepage
  console.log("1. Visiting Homepage...");
  await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, "e2e_home.png") });

  // 2. Visit /tools
  console.log("2. Navigating to /tools...");
  await page.goto(`${BASE_URL}/tools`, { waitUntil: "networkidle" });
  await page.waitForSelector("h1:has-text('AI Tools')");
  console.log("Tools listing loaded successfully.");

  // 3. Visit /login
  console.log("3. Visiting /login...");
  await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, "e2e_login_page.png") });

  // Fill credentials and submit
  console.log("4. Logging in as demo@aiorbit.club...");
  await page.fill("input[type='email']", "demo@aiorbit.club");
  await page.fill("input[type='password']", "Password123!");
  await page.click("button[type='submit']");

  // Wait for redirect to /tools
  await page.waitForURL("**/tools", { timeout: 10000 });
  await page.waitForTimeout(1000);
  console.log("Logged in successfully. Redirected to /tools.");
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, "e2e_logged_in_tools.png") });

  // 4. Visit tool detail page /tools/cursor
  console.log("5. Navigating to /tools/cursor...");
  await page.goto(`${BASE_URL}/tools/cursor`, { waitUntil: "networkidle" });
  await page.waitForSelector("h1:has-text('Cursor')");
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, "e2e_tool_detail.png") });

  // 5. Check Saved Tools at /saved
  console.log("6. Visiting /saved...");
  await page.goto(`${BASE_URL}/saved`, { waitUntil: "networkidle" });
  await page.waitForSelector("h1:has-text('Saved AI Tools')");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, "e2e_saved_tools.png") });

  // 6. Test Submit Tool Modal
  console.log("7. Testing Submit Tool Modal via /tools?action=submit...");
  await page.goto(`${BASE_URL}/tools?action=submit`, { waitUntil: "networkidle" });
  await page.waitForSelector("text='Submit an AI Tool'");
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, "e2e_submit_modal.png") });

  console.log("All E2E tests completed and screenshots captured successfully!");
  await browser.close();
}

run().catch((err) => {
  console.error("Test error:", err);
  process.exit(1);
});
