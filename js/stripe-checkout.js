// Stripe Checkout Integration for GTO Course Platform

// Initialize Stripe with your publishable key
const STRIPE_PUBLISHABLE_KEY = 'pk_live_51T57QRK26A5SJx9ktq0SqlwjBHy8QHVabXtEn42VSUTtns9vPJl9f8OUpjhJqGgdtk8vHOYwdSwWCiU8VWH0XeAF00fni7rY4p';

// Course product ID from Stripe
const COURSE_PRICE_ID = 'price_1T8tHPK26A5SJx9krFDB36ny';

// Stripe Payment Link (redirects to payment-success.html after purchase)
const COURSE_PAYMENT_LINK = 'https://buy.stripe.com/cNi28sfer2GDgvg4OO1ZS07';

// Success page URL (where user lands after payment)
const SUCCESS_URL = window.location.origin + '/payment-success.html';

// Stripe Checkout Handler
const StripeCheckout = {
    // Redirect to Stripe Payment Link (simplest approach)
    redirectToPayment: function() {
        window.location.href = COURSE_PAYMENT_LINK;
    },

    // Create checkout session via API (for more control)
    // Note: This requires a backend endpoint - not available on static hosting
    // Use redirectToPayment for GitHub Pages
    createCheckoutSession: async function(successUrl, cancelUrl) {
        // For static hosting, use the payment link approach
        // This function would need a Cloud Function or backend server
        console.log('Using payment link for static hosting');
        this.redirectToPayment();
    },

    // Handle successful payment (called on success page)
    handleSuccess: async function(sessionId) {
        // Get current user
        const user = firebaseAuth.currentUser;
        if (!user) {
            console.error('No user logged in');
            return { success: false, error: 'Please log in to complete purchase' };
        }

        // Grant access to the user
        try {
            const result = await authSystem.grantAccess(user.uid);
            if (result.success) {
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            }
            return result;
        } catch (error) {
            console.error('Error granting access:', error);
            return { success: false, error: error.message };
        }
    }
};

// Payment success page handler
function initPaymentSuccess() {
    // Check if this is a successful payment redirect
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    
    if (sessionId) {
        // Show success message
        const successMessage = document.getElementById('payment-success');
        if (successMessage) {
            successMessage.style.display = 'block';
        }
        
        // Handle the success
        StripeCheckout.handleSuccess(sessionId);
    }
}

// Gumroad redirect handler
// After Gumroad purchase, redirect to registration with purchase token
function handleGumroadRedirect() {
    const urlParams = new URLSearchParams(window.location.search);
    const gumroadPurchase = urlParams.get('gumroad');
    
    if (gumroadPurchase === 'success') {
        // Mark that this user should be granted access after registration
        sessionStorage.setItem('pendingPurchase', 'true');
        return true;
    }
    return false;
}

// Check for pending purchase after registration
async function checkPendingPurchase(user) {
    const pending = sessionStorage.getItem('pendingPurchase');
    if (pending === 'true') {
        // Grant access
        await authSystem.grantAccess(user.uid);
        sessionStorage.removeItem('pendingPurchase');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check for Gumroad redirect
    handleGumroadRedirect();
    
    // Check for Stripe success
    initPaymentSuccess();
});

// Export for use
window.StripeCheckout = StripeCheckout;