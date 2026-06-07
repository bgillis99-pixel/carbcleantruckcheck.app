# Automated Cron Jobs Setup

## What This Does
This GitHub Actions workflow automates your CARB business operations so they run **automatically** without you needing to manually trigger them.

## Automated Jobs

### 1. Daily CRM Sync
- **Runs:** Every day at 8 AM Pacific
- **Purpose:** Syncs customer data, test requests, and notifications with your CRM
- **Calendar:** Automatically adds jobs to your calendar
- **No action needed:** Runs in the background while you're driving

### 2. Weekly Reconciliation  
- **Runs:** Every Monday at 9 AM Pacific
- **Purpose:** Generates reconciliation reports for the week
- **Output:** Summary of jobs, payments, and CRM status
- **Review in meetings:** Check the report when you have time

## How It Works

1. **Scheduled automatically** via GitHub Actions cron
2. **Runs in the cloud** - no local setup needed
3. **Calendar integration** - jobs appear on your calendar automatically
4. **Notifications** - You'll get a summary when complete
5. **View results** - Check the GitHub Actions tab anytime

## Next Steps to Complete Setup

### 1. Enable GitHub Actions
```bash
# This workflow is already configured
# Just push to GitHub and it will activate
```

### 2. Add CRM Integration
You need to add:
- CRM API credentials (stored as GitHub Secrets)
- Google Calendar API key (for calendar sync)
- Slack webhook (optional - for notifications)

### 3. Configure Secrets
In GitHub repo settings → Secrets → Actions, add:
```
CRM_API_KEY=your_crm_api_key
GOOGLE_CALENDAR_API_KEY=your_calendar_key
SLACK_WEBHOOK_URL=your_slack_webhook (optional)
```

## Benefits

✅ **No manual work** - Runs automatically on schedule
✅ **Calendar visibility** - See jobs without copying/pasting
✅ **Background processing** - Works while you're driving
✅ **Weekly reports** - Review reconciliation in meetings
✅ **Reliable** - Never forget to run a job

## Testing

Run manually anytime:
1. Go to GitHub → Actions tab
2. Select "Automated CARB Business Operations"
3. Click "Run workflow"

## What CRM Are You Using?

To complete the integration, I need to know:
- What CRM system? (Salesforce, HubSpot, custom, etc.)
- What calendar? (Google Calendar, Outlook, etc.)
- What notification method? (Slack, email, SMS?)

Once you tell me, I'll add the specific integration code!
