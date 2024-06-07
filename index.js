const express = require("express");
const puppeteer = require("puppeteer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/analyze", async (req, res) => {
  const { email } = req.body;
  const domain = email.split("@")[1];

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`https://${domain}`);
  const screenshot = await page.screenshot({ encoding: "base64" });

  // Here, send the screenshot to OpenAI's API for analysis
  // const analysis = await analyzeScreenshot(screenshot);

  await browser.close();

  res.json({ analysis: "Fake analysis result for demo purposes" });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});