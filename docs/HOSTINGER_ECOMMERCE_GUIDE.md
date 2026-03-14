# Teas & C's E-commerce - Hostinger Deployment Guide

This guide will help you deploy your simplified e-commerce website to Hostinger shared hosting.

## 🎯 What You're Deploying

A complete e-commerce ordering system that works on any shared hosting:
- ✅ **Customer ordering website** (QR scanning, cart, checkout)
- ✅ **Admin dashboard** (order management, statistics)
- ✅ **Email notifications** (via EmailJS)
- ✅ **Mobile responsive** (works on all devices)
- ✅ **No server required** (pure HTML/CSS/JavaScript)

## 📁 Files to Upload

Upload these files to your Hostinger `public_html` folder:

```
public_html/
├── index.html              (Main customer site)
├── ecommerce-index.html    (Alternative main file)
├── ecommerce-admin.html    (Admin dashboard)
├── success.html            (Order success page)
├── cancel.html             (Order cancelled page)
├── images/                 (Product category images)
│   ├── hot-drinks.png
│   ├── cold-drinks.png
│   ├── tea.png
│   ├── matcha.png
│   └── special.png
├── Brand/                  (Logo files)
│   └── Teasandcs Logo White.png
└── EMAIL_SETUP_GUIDE.md    (Email setup instructions)
```

## 🚀 Step-by-Step Deployment

### Step 1: Prepare Your Files

1. **Choose your main file:**
   - Use `index.html` (original PWA version)
   - OR use `ecommerce-index.html` (simplified e-commerce version)

2. **Rename files if needed:**
   - If using `ecommerce-index.html`, rename it to `index.html`
   - If using `ecommerce-admin.html`, rename it to `admin.html`

### Step 2: Upload to Hostinger

**Option A: File Manager (Recommended)**
1. Log into your Hostinger control panel
2. Go to **File Manager**
3. Navigate to `public_html`
4. Upload all files and folders
5. Extract any ZIP files if needed

**Option B: FTP Client**
1. Use FileZilla or similar FTP client
2. Connect to your Hostinger server
3. Upload files to `public_html` directory

### Step 3: Configure Email Notifications

1. **Set up EmailJS** (see `EMAIL_SETUP_GUIDE.md`)
2. **Update configuration** in your main HTML file:

```javascript
const CONFIG = {
    STRIPE_PUBLISHABLE_KEY: 'pk_test_your_stripe_key',
    EMAILJS_SERVICE_ID: 'service_abc123',        // Your Service ID
    EMAILJS_TEMPLATE_ID: 'order_notification',   // Your Template ID
    EMAILJS_PUBLIC_KEY: 'user_xyz789'            // Your Public Key
};
```

### Step 4: Test Your Website

1. **Visit your domain:** `https://yourdomain.com`
2. **Test customer flow:**
   - Scan QR code (or enter chair number manually)
   - Add items to cart
   - Complete checkout
3. **Test admin dashboard:** `https://yourdomain.com/admin.html`
   - Login: username: `admin`, password: `teas2024`
   - Add manual orders
   - Manage order status

## 🔧 Configuration Options

### Option 1: EmailJS Notifications (Recommended)

**Pros:**
- Automatic email notifications
- Professional appearance
- Easy to set up

**Setup:**
1. Create EmailJS account (free)
2. Connect your email
3. Create email template
4. Update configuration in HTML

### Option 2: Manual Order Entry

**Pros:**
- No external services needed
- Simple setup
- No monthly costs

**How it works:**
1. Customer places order
2. Order appears on success page
3. Admin manually adds order to dashboard
4. Admin manages order status

## 📱 Features Overview

### Customer Website (`index.html`)

**Features:**
- QR code scanning for chair numbers
- Manual chair number entry (fallback)
- Product catalog with categories
- Shopping cart functionality
- Checkout process
- Order confirmation
- Mobile responsive design

**Categories:**
- Hot Drinks (Coffee & Tea)
- Cold Drinks (Iced Beverages)
- Everyday Teas (Loose Leaf)
- Matcha Teas (Traditional)
- Coffee (Espresso Based)
- Specialties (Unique Drinks)

### Admin Dashboard (`admin.html`)

**Features:**
- Secure login system
- Order management (view, complete, delete)
- Manual order entry
- Statistics overview
- Order notifications
- Mobile responsive design

**Login Credentials:**
- Username: `admin`
- Password: `teas2024`

**Admin Sections:**
- Overview (statistics)
- Orders (management)
- Add Order (manual entry)

## 🎨 Customization

### Update Branding

1. **Logo:** Replace `Brand/Teasandcs Logo White.png`
2. **Colors:** Update CSS color variables
3. **Text:** Edit titles and descriptions

### Add Products

Edit the products array in your HTML file:

```javascript
const products = [
    {
        id: 1,
        name: 'Your Product Name',
        category: 'hot-drinks',
        regularPrice: 2.50,
        largePrice: 3.50,
        type: 'coffee',
        description: 'Your product description'
    }
    // Add more products...
];
```

### Update Categories

Modify the menu grid in your HTML:

```html
<div class="menu-item" onclick="showCategory('your-category')">
    <img src="images/your-category.png" alt="Your Category">
    <h3>Your Category</h3>
    <p>Category Description</p>
</div>
```

## 🔒 Security Notes

### Admin Security

**Change default credentials:**
```javascript
const ADMIN_CREDENTIALS = {
    username: 'your_secure_username',
    password: 'your_secure_password'
};
```

### EmailJS Security

- Never expose private keys
- Only use public keys in frontend code
- EmailJS handles authentication securely

## 📊 Analytics (Optional)

Add Google Analytics to track orders:

```html
<!-- Add to <head> section -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🚨 Troubleshooting

### Common Issues:

**1. "Page not loading"**
- Check file permissions (644 for files, 755 for folders)
- Verify files are in `public_html` directory
- Clear browser cache

**2. "Images not showing"**
- Check image file paths
- Verify image files are uploaded
- Check file permissions

**3. "Email not sending"**
- Verify EmailJS configuration
- Check browser console for errors
- Test EmailJS setup separately

**4. "Admin login not working"**
- Check username/password
- Verify admin credentials in HTML
- Clear browser localStorage

### Debug Mode:

Enable console logging:

```javascript
// Add to your HTML file
console.log('Debug mode enabled');
console.log('Current configuration:', CONFIG);
```

## 📞 Support

### File Structure Check:

Your `public_html` should look like this:
```
public_html/
├── index.html
├── admin.html
├── success.html
├── cancel.html
├── images/
├── Brand/
└── (other files)
```

### Testing Checklist:

- [ ] Main website loads
- [ ] QR scanner works (or manual input)
- [ ] Products display correctly
- [ ] Cart functionality works
- [ ] Checkout process completes
- [ ] Success page shows
- [ ] Admin dashboard loads
- [ ] Admin login works
- [ ] Email notifications work (if configured)

## 🎉 Success!

Once deployed, your e-commerce website will be:
- ✅ **Fully functional** on Hostinger
- ✅ **Mobile responsive** for all devices
- ✅ **Easy to manage** with admin dashboard
- ✅ **Professional appearance** for customers
- ✅ **No monthly server costs** (just hosting)

**Your website URL:** `https://yourdomain.com`
**Admin URL:** `https://yourdomain.com/admin.html`

---

**Need help?** Check the troubleshooting section or contact support.
