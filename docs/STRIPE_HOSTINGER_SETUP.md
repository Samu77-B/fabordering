# Stripe Payment Setup for Hostinger

## 🎯 Complete Setup Guide for Test Mode

This guide will help you set up Stripe payments in **TEST MODE** so your client can try simulated payments.

---

## Step 1: Get Your Stripe Test Keys

### 1.1 Log into Stripe
1. Go to https://dashboard.stripe.com/
2. Log in with your Stripe account
3. Make sure you're in **TEST MODE** (toggle at the top should say "Test mode")

### 1.2 Get Your API Keys
1. Click on **"Developers"** in the left menu
2. Click on **"API keys"**
3. You'll see two keys:
   - **Publishable key** (starts with `pk_test_...`) - Already in your config.js ✅
   - **Secret key** (starts with `sk_test_...`) - Click "Reveal test key" to see it

### 1.3 Copy Your Secret Key
**IMPORTANT:** Copy the entire Secret key (starts with `sk_test_...`)

---

## Step 2: Update the Payment Backend

### 2.1 Edit api/create-payment-intent.php
1. Open `api/create-payment-intent.php`
2. Find line 12:
```php
$stripeSecretKey = 'sk_test_YOUR_SECRET_KEY_HERE';
```
3. Replace `sk_test_YOUR_SECRET_KEY_HERE` with your actual secret key:
```php
$stripeSecretKey = 'sk_test_51S2tRgHi3ZrT6W1H...'; // Your actual key
```

### 2.2 Upload to Hostinger
Upload `api/create-payment-intent.php` to:
```
public_html/ndo-fabhair/api/create-payment-intent.php
```

---

## Step 3: Test the Payment System

### 3.1 Use Stripe Test Cards
When testing payments, use these test card numbers:

**✅ Successful Payment:**
- Card number: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., `12/34`)
- CVC: Any 3 digits (e.g., `123`)
- ZIP: Any 5 digits (e.g., `12345`)

**❌ Declined Payment:**
- Card number: `4000 0000 0000 0002`
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

**🔐 Authentication Required (3D Secure):**
- Card number: `4000 0025 0000 3155`
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

### 3.2 Test Payment Flow
1. Go to your website: `https://teasandcs.com/ndo-fabhair/`
2. Add items to cart
3. Proceed to checkout
4. Enter test card details
5. Submit payment
6. ✅ Payment should succeed!

---

## Step 4: Verify in Stripe Dashboard

### 4.1 Check Test Payments
1. Go to Stripe Dashboard
2. Make sure you're in **TEST MODE**
3. Click **"Payments"** in the left menu
4. You should see your test payments listed

### 4.2 What You'll See
- Payment amount
- Status (Succeeded, Failed, etc.)
- Card last 4 digits
- Date/time
- Metadata

---

## Step 5: Enable Stripe in Your Website

Your website is already configured with the Stripe publishable key, but let's verify:

### 5.1 Check config.js
Your `config.js` already has:
```javascript
STRIPE_PUBLISHABLE_KEY: 'pk_test_51S2tRgHi3ZrT6W1HNaJGNbcgHrYd0RTCkFIC9KGUZWE0shYjzUXM93TFTdwEwhLWBKbgpOjuVuKqNzllQL1VJW9M00ou8Z3fMC'
```
✅ This is correct!

---

## 🎉 You're All Set!

Your client can now test payments using the test card numbers above.

### ✅ Test Mode Benefits:
- No real money is charged
- Unlimited testing
- Full Stripe features available
- Safe for client demos

### 🚫 What Won't Work in Test Mode:
- Real card numbers (they will be declined)
- Real bank transfers
- Actual money movement

---

## 🔄 Moving to Live Mode (Later)

When you're ready to accept real payments:

1. **Switch to Live Mode** in Stripe Dashboard
2. **Get Live API Keys:**
   - `pk_live_...` (Publishable key)
   - `sk_live_...` (Secret key)
3. **Update your config:**
   - Replace `pk_test_` with `pk_live_` in config.js
   - Replace `sk_test_` with `sk_live_` in create-payment-intent.php
4. **Complete Stripe account verification** (required for live mode)

---

## 🆘 Troubleshooting

### Issue: "Payment failed"
- ✅ Check you're using test card `4242 4242 4242 4242`
- ✅ Check secret key is correct in create-payment-intent.php
- ✅ Check browser console for errors

### Issue: "No such PaymentIntent"
- ✅ Clear browser cache
- ✅ Re-upload create-payment-intent.php
- ✅ Check API URL in config.js

### Issue: Stripe blocked my domain
- ✅ Hostinger domains are fine (unlike Vercel)
- ✅ Make sure you're using https://teasandcs.com
- ✅ Contact Stripe support if issues persist

---

## 📞 Need Help?

Check the browser console (F12) for detailed error messages.

All test payments will appear in your Stripe Dashboard under "Payments" (make sure Test Mode is ON).

---

**Good luck! 🚀**
