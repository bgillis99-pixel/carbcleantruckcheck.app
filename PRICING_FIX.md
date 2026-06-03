# Pricing Fix for mobilecarbsmoketest.com

## Issue
The pricing keeps reverting to incorrect values after manual fixes in Cloudflare.

## Root Cause
The source code in `Mobile-CARB-Compliance-app` repository contains the wrong prices, which get redeployed automatically.

## Current (Wrong) Pricing
- OBD: $75 ❌
- OVI/Smoke Opacity: $250 ❌

## Correct Pricing
- OBD: $119 ✅
- OVI/Smoke Opacity: $219 ✅

## File to Fix
**Repository:** `bgillis99-pixel/Mobile-CARB-Compliance-app`
**File:** `prompts/mila.ts`

### Current Code (Line ~4-5):
```typescript
- Pricing: OBD $75 | Smoke Opacity (OVI/J1667) $250 | RV/Motorhome $300
```

### Fixed Code:
```typescript
- Pricing: OBD $119 | Smoke Opacity (OVI/J1667) $219 | RV/Motorhome $300
```

### Additional Fix Needed
Search the entire `Mobile-CARB-Compliance-app` repository for any other instances of:
- `$75` or `75` (for OBD pricing)
- `$250` or `250` (for OVI pricing)

And update them to:
- `$119` or `119` (for OBD)
- `$219` or `219` (for OVI)

## Next Steps
1. Grant access to `Mobile-CARB-Compliance-app` repository
2. I'll search and fix ALL pricing references
3. Commit and push the fix
4. Automatic deployment will update mobilecarbsmoketest.com
5. Pricing will stay correct permanently

## Why It Keeps Reverting
Your Cloudflare/Vercel is configured to auto-deploy from GitHub. When you manually fix the price in Cloudflare, the next GitHub push overwrites it with the old code. We need to fix the SOURCE in GitHub.
