const express = require("express");
const puppeteer = require("puppeteer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/analyze", async (req, res) => {
  console.log("Received a request");
  try {
    const { email } = req.body;
    console.log("Email:", email);
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }
    const domain = email.split("@")[1];
    console.log("Domain:", domain);
    if (!domain) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(`https://${domain}`);

    console.log("Page loaded successfully");
    const screenshot = await page.screenshot({ encoding: "base64" });
    await browser.close();
    console.log("Screenshot taken and browser closed");
    res.json({ analysis: "Fake analysis result for demo purposes" });
  } catch (error) {
    console.error("Error during page analysis:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = app;
