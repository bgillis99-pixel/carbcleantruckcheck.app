/**
 * Silver Snap-Tool Email Parser
 * Automatically processes OBD test result emails and adds them to calendar
 */

interface TestResult {
  vin: string;
  eVIN: string;
  date: string;
  time: string;
  result: 'Pass' | 'Fail';
  timestamp: Date;
  customerName?: string;
}

/**
 * Parse Silver Snap-Tool email content
 * Example: "Review test result for VIN for eVIN 1XPBD49X9LD667021"
 */
export function parseTestResultEmail(emailBody: string, emailSubject: string): TestResult | null {
  // Extract eVIN from subject or body
  const vinMatch = emailBody.match(/eVIN\s+([A-Z0-9]{17})/i) ||
                   emailSubject.match(/eVIN\s+([A-Z0-9]{17})/i);

  if (!vinMatch) return null;

  // Extract date/time: "04/21/2026, 3:10 PM Pacific Daylight Time"
  const dateTimeMatch = emailBody.match(/(\d{2}\/\d{2}\/\d{4}),\s+(\d{1,2}:\d{2}\s+[AP]M)/);

  // Extract result: "Pass" or "Fail"
  const resultMatch = emailBody.match(/test result is (Pass|Fail)/i);

  if (!dateTimeMatch || !resultMatch) return null;

  const [_, dateStr, timeStr] = dateTimeMatch;
  const result = resultMatch[1] as 'Pass' | 'Fail';

  return {
    vin: vinMatch[1],
    eVIN: vinMatch[1],
    date: dateStr,
    time: timeStr,
    result,
    timestamp: new Date(`${dateStr} ${timeStr}`),
  };
}

/**
 * Create recurring calendar event for 17-week (119 days) intervals
 * Commercial trucks require testing every 180 days (about 17 weeks)
 */
export function createRecurringEvent(testResult: TestResult) {
  const nextTestDate = new Date(testResult.timestamp);
  nextTestDate.setDate(nextTestDate.getDate() + 119); // 17 weeks = 119 days

  return {
    title: `OBD Test - ${testResult.eVIN} - ${testResult.result === 'Pass' ? '✅' : '❌'}`,
    start: testResult.timestamp,
    end: new Date(testResult.timestamp.getTime() + 60 * 60 * 1000), // 1 hour duration
    description: `
      VIN: ${testResult.eVIN}
      Test Result: ${testResult.result}
      Source: Silver Snap-Tool

      Next test due: ${nextTestDate.toLocaleDateString()}
      (17 weeks / 119 days from this test)
    `,
    recurrence: {
      frequency: 'DAILY',
      interval: 119, // Every 119 days (17 weeks)
      count: 10, // Create next 10 occurrences (about 5 years)
    },
    reminders: [
      { method: 'email', minutes: 7 * 24 * 60 }, // 1 week before
      { method: 'popup', minutes: 24 * 60 }, // 1 day before
    ],
  };
}

/**
 * Search calendar for matching appointment in same time slot (±2 hours)
 */
export function findMatchingAppointment(testResult: TestResult, existingEvents: any[]) {
  const testTime = testResult.timestamp.getTime();
  const twoHours = 2 * 60 * 60 * 1000;

  return existingEvents.find(event => {
    const eventTime = new Date(event.start).getTime();
    const timeDiff = Math.abs(eventTime - testTime);

    // Match if within 2 hours and contains VIN
    return timeDiff <= twoHours &&
           (event.description?.includes(testResult.eVIN) ||
            event.title?.includes(testResult.eVIN));
  });
}

/**
 * Process historical emails (go back 5 months)
 */
export function processHistoricalEmails(emails: any[], startDate: Date = new Date()) {
  const fiveMonthsAgo = new Date(startDate);
  fiveMonthsAgo.setMonth(fiveMonthsAgo.getMonth() - 5);

  const results: TestResult[] = [];

  for (const email of emails) {
    const emailDate = new Date(email.receivedAt);

    // Only process emails from last 5 months
    if (emailDate < fiveMonthsAgo) continue;

    const result = parseTestResultEmail(email.body, email.subject);
    if (result) {
      results.push(result);
    }
  }

  return results;
}

/**
 * Main automation function
 * Called when new Silver Snap-Tool email arrives
 */
export async function handleTestResultEmail(email: any, calendarAPI: any) {
  console.log('📧 New Silver Snap-Tool email received');

  // Parse the email
  const testResult = parseTestResultEmail(email.body, email.subject);

  if (!testResult) {
    console.warn('⚠️ Could not parse test result from email');
    return;
  }

  console.log(`✅ Parsed test: VIN ${testResult.eVIN} - ${testResult.result}`);

  // Check if appointment already exists
  const existingEvents = await calendarAPI.getEvents({
    timeMin: new Date(testResult.timestamp.getTime() - 2 * 60 * 60 * 1000),
    timeMax: new Date(testResult.timestamp.getTime() + 2 * 60 * 60 * 1000),
  });

  const match = findMatchingAppointment(testResult, existingEvents);

  if (match) {
    // Update existing appointment with test result
    await calendarAPI.updateEvent(match.id, {
      description: `${match.description}\n\nTest Result: ${testResult.result} ✅\nVIN: ${testResult.eVIN}`,
      colorId: testResult.result === 'Pass' ? '10' : '11', // Green for Pass, Red for Fail
    });
    console.log(`📅 Updated existing appointment: ${match.title}`);
  } else {
    // Create new calendar event with 17-week recurrence
    const event = createRecurringEvent(testResult);
    await calendarAPI.createEvent(event);
    console.log(`📅 Created new recurring event for VIN ${testResult.eVIN}`);
  }

  return testResult;
}
