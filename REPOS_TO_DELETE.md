# Repos Causing Auto-Deployment Issues

## THE GOOD ONES (KEEP THESE - THEY WORK)
✅ **studio** - carb-clean-truck-check (SF Giants colors - orange/black) - Bay Area to San Jose
✅ **John Deere green one** - mobile OVI testing (Stockton, etc.)

## THE BAD ONES (DELETE/ARCHIVE THESE)
These keep auto-deploying OLD code with WRONG pricing and locations:

❌ **Mobile-CARB-Compliance-app** 
- Has wrong pricing: OBD $75, OVI $250
- Has wrong locations: Roseville, Fairfield, Hayward
- STATUS: Archive this repo
- DISCONNECT from Cloudflare/Vercel

❌ **mobile-carb-testing-ca-1.7-2pm**
- Old test version
- STATUS: Archive this repo

❌ **121925-2-studio**
- Old version
- STATUS: Archive if not being used

❌ **ctc-app-clean**
- Old version
- STATUS: Archive if not being used

❌ **CARB-APPLE-V3.0** 
- Already archived ✓

❌ **Mobile-carb-app**
- Already archived ✓

❌ **1126-UPGRADES**
- Already archived ✓

## PROBLEM
mobilecarbsmoketest.com keeps reverting because one of the BAD repos is connected to Cloudflare/Vercel and auto-deploying every time code changes.

## SOLUTION
1. Find which bad repo is connected to mobilecarbsmoketest.com in Cloudflare
2. Disconnect it OR archive the repo
3. Point mobilecarbsmoketest.com to the GOOD repo (studio) instead
4. Fix pricing in good repo: OBD $119, OVI $219

## WHAT TO TURN OFF IN CLOUDFLARE
Go to: https://dash.cloudflare.com → Workers & Pages

Look for projects connected to:
- Mobile-CARB-Compliance-app
- mobile-carb-testing-ca-1.7-2pm  
- 121925-2-studio
- ctc-app-clean

**DISCONNECT THEM ALL** or **PAUSE BUILD & DEPLOYMENT**
