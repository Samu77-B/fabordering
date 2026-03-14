# EmailJS Setup Guide for Teas & C's E-commerce

This guide will help you set up EmailJS to send order notifications to your admin email.

## 📧 What is EmailJS?

EmailJS allows you to send emails directly from your website without a backend server. Perfect for Hostinger hosting!

## 🚀 Quick Setup (5 minutes)

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click **"Sign Up"** (free account)
3. Verify your email address

### Step 2: Add Email Service

1. In your EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended)
   - **Outlook/Hotmail**
   - **Yahoo**
   - **Custom SMTP**

### Step 3: Connect Your Email

**For Gmail:**
1. Select **"Gmail"**
2. Click **"Connect Account"**
3. Sign in to your Gmail account
4. Grant permissions to EmailJS

**For Other Providers:**
1. Follow the provider-specific instructions
2. Enter your email credentials

### Step 4: Create Email Template

1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Use this template:

**Template ID:** `order_notification`

**Subject:** `New Order #{{order_id}} from Chair {{chair_number}}`

**Content:**
```
🛎️ NEW ORDER RECEIVED

Order Details:
- Order ID: {{order_id}}
- Chair Number: Chair {{chair_number}}
- Total Amount: £{{total}}
- Time: {{timestamp}}

Order Items:
{{items}}

---
Teas & C's Ordering System
```

### Step 5: Get Your Keys

1. Go to **"Account"** → **"General"**
2. Copy these values:
   - **Service ID** (e.g., `service_abc123`)
   - **Template ID** (e.g., `order_notification`)
   - **Public Key** (e.g., `user_xyz789`)

### Step 6: Update Your Website

Update the configuration in `ecommerce-index.html`:

```javascript
const CONFIG = {
    STRIPE_PUBLISHABLE_KEY: 'pk_test_your_stripe_key',
    EMAILJS_SERVICE_ID: 'service_abc123',        // Your Service ID
    EMAILJS_TEMPLATE_ID: 'order_notification',   // Your Template ID
    EMAILJS_PUBLIC_KEY: 'user_xyz789'            // Your Public Key
};
```

## 🧪 Testing Your Setup

### Test Email Function

Add this to your browser console on your website:

```javascript
// Test email function
async function testEmail() {
    try {
        await emailjs.send(
            'service_abc123',        // Your Service ID
            'order_notification',    // Your Template ID
            {
                order_id: 'TEST123',
                chair_number: '3',
                total: '12.50',
                items: 'Flat White (Regular) - £2.72\nEarl Grey (Large) - £4.00',
                timestamp: new Date().toLocaleString()
            }
        );
        console.log('Test email sent successfully!');
    } catch (error) {
        console.error('Error sending test email:', error);
    }
}

// Run the test
testEmail();
```

## 📱 How It Works

### Customer Places Order:
1. Customer fills cart and clicks "Checkout"
2. Website creates order data
3. EmailJS sends email to admin
4. Customer sees success page

### Admin Receives Email:
1. Email arrives in admin inbox
2. Admin can manually add order to dashboard
3. Admin manages order status

## 🔧 Advanced Configuration

### Multiple Recipients

To send to multiple email addresses:

1. In EmailJS dashboard, go to your service
2. Add additional email addresses
3. All emails will receive notifications

### Custom Email Templates

You can create multiple templates for different scenarios:

- `order_notification` - New orders
- `order_completed` - Order ready
- `order_cancelled` - Cancelled orders

### Email Styling

You can use HTML in your email templates:

```html
<h2 style="color: #6B7A5A;">🛎️ New Order Received</h2>
<table style="width: 100%; border-collapse: collapse;">
    <tr>
        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Order ID:</strong></td>
        <td style="padding: 10px; border: 1px solid #ddd;">{{order_id}}</td>
    </tr>
    <tr>
        <td style="padding: 10px; border: 1px solid #ddd;"><strong>Chair:</strong></td>
        <td style="padding: 10px; border: 1px solid #ddd;">Chair {{chair_number}}</td>
    </tr>
</table>
```

## 🚨 Troubleshooting

### Common Issues:

**1. "Email not sending"**
- Check your Service ID, Template ID, and Public Key
- Verify your email service is connected
- Check browser console for errors

**2. "Template not found"**
- Make sure Template ID matches exactly
- Check template is published (not draft)

**3. "Service not found"**
- Verify Service ID is correct
- Make sure service is active

**4. "Rate limit exceeded"**
- Free accounts have limits (200 emails/month)
- Upgrade to paid plan for more emails

### Debug Mode:

Add this to see detailed error messages:

```javascript
// Enable debug mode
emailjs.init('your_public_key', {
    debug: true
});
```

## 💰 Pricing

**Free Plan:**
- 200 emails/month
- Basic templates
- Standard support

**Paid Plans:**
- Starting at $15/month
- 1,000+ emails/month
- Advanced features
- Priority support

## 🔒 Security Notes

- Never expose your Private Key in frontend code
- Only use Public Key in website code
- EmailJS handles authentication securely
- No server-side code required

## 📞 Support

If you need help:
1. Check EmailJS documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
2. Contact EmailJS support
3. Check browser console for error messages

---

**Your email notifications will be working in minutes!** 🎉
