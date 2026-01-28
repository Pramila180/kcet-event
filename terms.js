// KCET Events - Terms and Conditions
// This file contains the terms and conditions for event managers

const TERMS_AND_CONDITIONS = `KCET College Events Platform - Terms and Conditions

1. ELIGIBILITY
• Only KCET students and staff with valid @kamarajengg.edu.in email addresses are authorized to create and manage events
• Users must be the legitimate owners of the email address used for registration
• Administration reserves the right to verify email authenticity

2. EVENT MANAGEMENT RESPONSIBILITIES
• Event creators are solely responsible for the accuracy and appropriateness of event information
• All events must be KCET-related and beneficial to the student community
• False, misleading, or inappropriate content is strictly prohibited
• Event creators must ensure they have proper authorization for the events they post

3. CONTENT GUIDELINES
• Events must comply with KCET institutional policies and values
• No commercial, political, or discriminatory content allowed
• Event images and descriptions must be professional and appropriate
• Copyrighted materials must not be used without proper permission

4. PRIVACY AND DATA USAGE
• User email addresses are used solely for authentication and identification
• Personal information will not be shared with third parties
• Event data is stored securely and used only for platform functionality
• Users can request data removal by contacting administration

5. ACCOUNTABILITY
• Event creators are accountable for the events they post
• Misuse of the platform may result in access revocation
• KCET administration reserves the right to remove inappropriate content
• Legal compliance with all applicable laws is required

6. PLATFORM USAGE
• The platform is provided as-is for KCET community benefit
• Technical issues should be reported to the development team
• Users must not attempt to compromise platform security or functionality

7. MODIFICATIONS
• These terms may be updated periodically
• Users will be notified of significant changes
• Continued use constitutes acceptance of updated terms

By using this platform, you agree to these terms and conditions.
For questions or concerns, contact KCET administration.

Last Updated: January 2026`;

// Function to display terms and conditions
function showTermsAndConditions() {
    const termsWindow = window.open('', '_blank', 'width=800,height=600,scrollbars=yes');
    termsWindow.document.write(`
        <html>
        <head>
            <title>KCET Events - Terms and Conditions</title>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
                h1 { color: #2d3748; border-bottom: 2px solid #667eea; padding-bottom: 10px; }
                h2 { color: #4a5568; margin-top: 20px; }
                ul { margin: 10px 0; padding-left: 20px; }
                li { margin: 5px 0; }
                .highlight { background: #f7fafc; padding: 10px; border-left: 4px solid #667eea; margin: 10px 0; }
            </style>
        </head>
        <body>
            <pre style="white-space: pre-wrap; font-family: Arial, sans-serif;">${TERMS_AND_CONDITIONS}</pre>
            <div style="margin-top: 30px; text-align: center;">
                <button onclick="window.close()" style="padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">Close</button>
            </div>
        </body>
        </html>
    `);
}

// Function to accept terms and conditions
function acceptTermsAndConditions() {
    const accepted = confirm('By clicking OK, you agree to the KCET Events Platform Terms and Conditions:\n\n• You are authorized to use your @kamarajengg.edu.in email\n• You will post only appropriate KCET-related events\n• You are responsible for the content you create\n• You comply with all institutional policies\n\nClick OK to accept and continue, or Cancel to exit.');
    
    if (!accepted) {
        localStorage.removeItem('kcetCurrentUser');
        window.location.href = 'index.html';
        return false;
    }
    
    return true;
}
