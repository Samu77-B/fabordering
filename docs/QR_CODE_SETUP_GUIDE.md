# QR Code Setup Guide

## Overview

Your PWA now supports **single QR codes** that both open the app AND automatically set the chair number. This eliminates the need for two separate QR codes!

## How It Works

Each chair can have a single QR code that contains a URL with a chair parameter. When customers scan it:
1. The app opens automatically (or prompts to install if not already installed)
2. The chair number is automatically set
3. Customers can immediately start ordering

## Setting Up QR Codes

### Step 1: Choose Your Deployment Location

You can deploy your PWA in a subdirectory to keep it organized and separate from your main website. This is perfectly fine and actually a good practice!

**Recommended folder names:**
- `/ordering` - Clear and descriptive
- `/pwa` - Simple and direct
- `/order` - Short and to the point

**Example structure:**
```
public_html/
├── index.html (your main website)
├── about.html
├── menu.html
└── ordering/          ← Your PWA folder
    ├── index.html
    ├── manifest.json
    ├── sw.js
    ├── config.js
    └── ... (other PWA files)
```

### Step 2: Create QR Codes for Each Chair

Once you've deployed your PWA to a folder (e.g., `/ordering`), create 8 unique QR codes using URL parameters:

**If your PWA is in `/ordering` folder:**

**Chair 1:**
```
https://teasandcs.com/ordering/?chair=1
```

**Chair 2:**
```
https://teasandcs.com/ordering/?chair=2
```

**Chair 3:**
```
https://teasandcs.com/ordering/?chair=3
```

**Chair 4:**
```
https://teasandcs.com/ordering/?chair=4
```

**Chair 5:**
```
https://teasandcs.com/ordering/?chair=5
```

**Chair 6:**
```
https://teasandcs.com/ordering/?chair=6
```

**Chair 7:**
```
https://teasandcs.com/ordering/?chair=7
```

**Chair 8:**
```
https://teasandcs.com/ordering/?chair=8
```

**If you prefer a different folder name (e.g., `/pwa`):**
- `https://teasandcs.com/pwa/?chair=1`
- `https://teasandcs.com/pwa/?chair=2`
- etc.

### ⚠️ Important: Single Deployment Only

**You do NOT need to:**
- ❌ Create separate folders (`/chair01`, `/chair02`, etc.)
- ❌ Upload the PWA 8 times
- ❌ Maintain 8 different copies of your app

**You only need to:**
- ✅ Deploy your PWA once to ONE folder (e.g., `/ordering`)
- ✅ Create 8 different QR codes with different `?chair=` parameters
- ✅ The same app handles all 8 chairs automatically

### Deployment Options

**Option 1: Subdirectory (Recommended for Organization)**
- Deploy PWA to: `https://teasandcs.com/ordering/`
- QR codes: `https://teasandcs.com/ordering/?chair=1`, `?chair=2`, etc.
- ✅ Keeps your main website files separate
- ✅ Clean organization
- ✅ Easy to manage

**Option 2: Root Directory**
- Deploy PWA to: `https://teasandcs.com/`
- QR codes: `https://teasandcs.com/?chair=1`, `?chair=2`, etc.
- ✅ Shorter URLs
- ⚠️ Files mixed with main website

**Best Practice:** Use a subdirectory like `/ordering` to keep your PWA organized and separate from your main website files.

### Step 3: Deploy to Subdirectory

When deploying to a subdirectory (e.g., `/ordering`):

1. **Upload all PWA files** to your chosen folder:
   ```
   public_html/
   └── ordering/
       ├── index.html
       ├── manifest.json
       ├── sw.js
       ├── config.js
       ├── admin.html
       ├── images/
       ├── Brand/
       └── ... (all other PWA files)
   ```

2. **The app is already configured** to work in subdirectories:
   - ✅ Manifest uses relative paths
   - ✅ Service worker uses relative paths
   - ✅ All asset references are relative
   - ✅ URL parameters work the same way

3. **Test your deployment:**
   - Visit: `https://teasandcs.com/ordering/`
   - Test with chair parameter: `https://teasandcs.com/ordering/?chair=1`
   - Verify the chair number is set automatically

### Step 3: Generate QR Codes

You can use any QR code generator. Here are some options:

1. **Online QR Code Generators:**
   - [QR Code Generator](https://www.qr-code-generator.com/)
   - [QRCode Monkey](https://www.qrcode-monkey.com/)
   - [Google Charts QR Code API](https://developers.google.com/chart/infographics/docs/qr_codes)

2. **Command Line (if you have Node.js):**
   ```bash
   npm install qrcode
   ```
   Then create a script to generate all 8 QR codes.

3. **Mobile Apps:**
   - Many QR code generator apps available on iOS/Android

### Step 4: Print and Place QR Codes

Print each QR code and place it:
- On or near each chair
- In a visible location
- Protected from damage (consider laminating)

## QR Code Format Options

The app accepts chair numbers in several formats:

### Option 1: URL Parameter (Recommended)
```
https://your-domain.com/?chair=1
https://your-domain.com/?chair=2
```
**This is the best option** - opens app AND sets chair automatically.

### Option 2: Plain Text
```
chair 1
chair1
1
```
If customers scan a QR code with just text, the app will still detect and set the chair number.

### Option 3: Full URL with Path
```
https://your-domain.com/index.html?chair=1
```
Also works perfectly.

## Testing Your QR Codes

1. **Test on Mobile Device:**
   - Use your phone's camera to scan each QR code
   - Verify the app opens (or prompts to install)
   - Check that the correct chair number is displayed

2. **Test Different Scenarios:**
   - First-time visitor (app not installed)
   - Returning visitor (app already installed)
   - Different mobile browsers (Safari, Chrome, etc.)

## Customer Experience Flow

1. Customer sits in Chair 3
2. Customer scans QR code on their chair
3. App opens automatically
4. Chair number is already set to "Chair Three"
5. Customer browses menu and adds items to cart
6. Customer checks out
7. Order is sent to cafe with "Chair Three" location
8. Cafe delivers drink to Chair 3

## Benefits

✅ **Single QR Code** - No need for two separate codes  
✅ **Automatic Setup** - Chair number set instantly  
✅ **Better UX** - Seamless customer experience  
✅ **Fewer Errors** - No manual chair entry needed  
✅ **Faster Ordering** - Customers can start ordering immediately  

## Troubleshooting

### QR Code Doesn't Set Chair Number
- Verify the URL format: `?chair=1` (not `?chair=chair1` or `?chair=one`)
- Check that the chair number is between 1-8
- Ensure the URL is your actual deployed app URL

### App Doesn't Open
- Verify the URL in the QR code matches your deployed app
- Check that the PWA manifest is properly configured
- Test the URL directly in a browser first

### Chair Number Shows Wrong Value
- Double-check the QR code contains the correct chair number
- Clear browser cache and try again
- Verify the URL parameter format

## Advanced: Custom QR Code Design

You can customize QR codes with:
- Your logo in the center
- Brand colors
- Chair number text below the code
- Instructions text

Example layout:
```
┌─────────────────┐
│   [QR CODE]     │
│   with logo     │
└─────────────────┘
    Chair 3
Scan to order drinks
```

## Support

If you need help setting up QR codes or encounter any issues, check:
- The app console for error messages
- Browser compatibility (modern browsers required)
- Network connectivity

