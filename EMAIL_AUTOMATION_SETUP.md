# Silver Snap-Tool Email Automation Setup

## What This Does

Automatically processes test result emails from Silver Snap-Tool and adds them to your Google Calendar with 17-week recurring events.

## Features

✅ **Auto-import OBD test results** from confirmation@ca-hdim.ra-automotive.net
✅ **Parse VIN, date, time, Pass/Fail** from email body
✅ **Add to Google Calendar** automatically
✅ **17-week recurring events** (commercial truck 180-day testing requirement)
✅ **Match to existing appointments** by time slot
✅ **Backfill last 5 months** of historical emails

## Email Format Supported

From: `Silver Snap-Tool <confirmation@ca-hdim.ra-automotive.net>`
Subject: `Review test result for VIN for eVIN 1XPBD49X9LD667021`

Body contains:
- eVIN (17-character VIN)
- Date/Time (04/21/2026, 3:10 PM Pacific Daylight Time)
- Result (Pass or Fail)

## How It Works

### Every 10 Minutes:
1. Check Gmail for new Silver Snap-Tool emails
2. Parse VIN, timestamp, and result
3. Search calendar for matching appointment (±2 hours)
4. If found: Update existing event with test result ✅
5. If not found: Create new event with 17-week recurrence

### Recurring Events:
- Creates event every 17 weeks (119 days)
- Sets reminder 1 week before next test due
- Color codes: Green = Pass, Red = Fail

## Setup Instructions

### 1. Enable Gmail API Access

1. Go to https://console.cloud.google.com
2. Create new project: "CARB Email Automation"
3. Enable Gmail API
4. Create OAuth credentials
5. Download credentials.json

### 2. Enable Google Calendar API

1. Same project, enable Google Calendar API
2. Create API key
3. Save the API key

### 3. Create Gmail App Password

1. Go to https://myaccount.google.com/security
2. Enable 2-Factor Authentication (required)
3. Generate App Password
4. Copy the 16-character password

### 4. Add Secrets to GitHub

Go to: Repository → Settings → Secrets → Actions

Add these secrets:
```
GMAIL_USER=bgillis99@gmail.com
GMAIL_APP_PASSWORD=your_16_char_app_password
GOOGLE_CALENDAR_API_KEY=your_calendar_api_key
```

### 5. Run Backfill (One-Time)

To process last 5 months of emails:
1. Go to GitHub → Actions
2. Select "Silver Snap-Tool Email Automation"
3. Click "Run workflow"

This will:
- Scan last 5 months of Silver Snap-Tool emails
- Add all OBD tests to calendar
- Create 17-week recurring events for each

## Manual Testing

Test with a single email:
```bash
npm install
npm run test:email-parser
```

## Gmail Filter (Optional)

Create a Gmail filter to label these emails:
- From: confirmation@ca-hdim.ra-automotive.net
- Subject: "Review test result"
- Apply label: "Silver Snap-Tool"

## Calendar Event Format

**Title:** `OBD Test - 1XPBD49X9LD667021 - ✅`

**Description:**
```
VIN: 1XPBD49X9LD667021
Test Result: Pass
Source: Silver Snap-Tool

Next test due: 08/17/2026
(17 weeks / 119 days from this test)
```

**Recurrence:** Every 119 days (17 weeks)
**Reminders:** 
- Email 1 week before
- Popup 1 day before

## Troubleshooting

**No emails being processed?**
- Check Gmail App Password is correct
- Verify Gmail API is enabled
- Check GitHub Actions logs

**Events not appearing on calendar?**
- Verify Google Calendar API key
- Check calendar permissions
- Ensure calendar ID is correct

**Wrong time zone?**
- Parser handles "Pacific Daylight Time"
- Adjust in `silver-snap-tool-parser.ts` if needed

## Next Steps

After this is working, we can add:
- SMS notifications when test results arrive
- Automatic invoice generation
- CRM sync (customer name lookup by VIN)
- Slack notifications for test results
