const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/analyze', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const domain = email.split('@')[1];
    if (!domain) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.goto(`https://${domain}`);
    const screenshot = await page.screenshot({ encoding: 'base64' });

    // Here, send the screenshot to OpenAI's API for analysis
    // const analysis = await analyzeScreenshot(screenshot);

    await browser.close();
    res.json({ analysis: 'Fake analysis result for demo purposes' });
  } catch (error) {
    console.error("Error during page analysis:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = app;