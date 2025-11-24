# Feature Specification: Authentication & Client Invitations

## Overview
Enable secure authentication for both admins and clients using Google and Apple sign-in. When an admin creates a new client, the system automatically sends an invitation email to allow the client to create their account and access their assigned workouts.

## User Stories

### As an Admin
1. I want to **sign in with my Google account** to access the admin dashboard
2. I want to **sign in with my Apple account** to access the admin dashboard
3. I want to **add a new client with their email address** and have the system automatically send them an invitation
4. I want to **see if a client has accepted their invitation** and logged in for the first time
5. I want to **resend an invitation email** if a client didn't receive it

### As a Client
1. I want to **receive an email invitation** when my trainer adds me to the app
2. I want to **click a link in the email** that takes me to download the app or opens it if already installed
3. I want to **sign in with my Google account** using the invitation link
4. I want to **sign in with my Apple account** using the invitation link
5. I want my **account to be automatically linked** to my trainer's client profile
6. I want to **see my assigned workouts** immediately after signing in

## Core Entities

### User (Authentication)
- ID (Auth provider UID - Firebase/Supabase)
- Email (from OAuth provider)
- Display name (from OAuth provider)
- Profile photo URL (optional, from OAuth provider)
- Role (admin or client)
- Auth provider (google or apple)
- Created at
- Last login at

### Client Invitation
- ID (unique identifier)
- Client ID (reference to Client entity)
- Email (client's email address)
- Invitation code (unique token for linking)
- Status (pending, accepted, expired)
- Sent at (timestamp)
- Accepted at (timestamp, null if not accepted)
- Expires at (timestamp, e.g., 30 days from sent)
- Resend count (number of times invitation was resent)

## Key Workflows

### Admin: Sign In with Google
1. Admin opens app
2. Taps "Sign in with Google" button
3. System opens Google OAuth flow
4. User selects Google account and grants permissions
5. System receives OAuth token and user info
6. System checks if user exists in database:
   - If exists and role is 'admin': Log in successfully
   - If exists and role is 'client': Show error "This account is registered as a client"
   - If not exists: Create new user with role 'admin'
7. Navigate to admin dashboard

### Admin: Sign In with Apple
1. Admin opens app
2. Taps "Sign in with Apple" button
3. System opens Apple OAuth flow
4. User authenticates with Face ID/Touch ID
5. System receives OAuth token and user info
6. System checks if user exists in database:
   - If exists and role is 'admin': Log in successfully
   - If exists and role is 'client': Show error "This account is registered as a client"
   - If not exists: Create new user with role 'admin'
7. Navigate to admin dashboard

### Admin: Create Client and Send Invitation
1. Admin navigates to "Add Client" screen
2. Admin fills out form:
   - Name (required)
   - Email (required - must be valid email format)
   - Phone (optional)
   - Notes (optional)
3. Admin taps "Save" button
4. System validates email format
5. System creates Client record in database
6. System generates unique invitation code
7. System creates ClientInvitation record
8. System triggers cloud function to send invitation email
9. Email is sent to client with:
   - Welcome message
   - Trainer's name
   - App download links (App Store for iOS)
   - Deep link with invitation code (e.g., `pfa://invite?code=ABC123`)
   - Expiration notice (link expires in 30 days)
10. Admin sees confirmation: "Client added and invitation sent to [email]"
11. Client list shows invitation status: "Invitation Sent"

### Client: Receive and Accept Invitation
1. Client receives email with invitation
2. Client clicks "Get Started" button in email
3. Link opens:
   - If app installed: Deep link opens app directly
   - If app not installed: Opens App Store to download app
4. Client downloads and opens app
5. App shows welcome screen: "You've been invited by [Trainer Name]"
6. Client sees two sign-in options:
   - "Continue with Google"
   - "Continue with Apple"
7. Client selects preferred sign-in method
8. System completes OAuth flow
9. System receives OAuth token and user info
10. System checks invitation code from deep link
11. System validates:
    - Invitation exists
    - Invitation not expired
    - Invitation not already accepted
    - Email from OAuth matches invitation email (or allows override)
12. System creates User record with role 'client'
13. System links User ID to Client record
14. System updates ClientInvitation status to 'accepted'
15. Client is logged in and sees their assigned workouts

### Client: Sign In (Subsequent Logins)
1. Client opens app
2. Client selects "Sign in with Google" or "Sign in with Apple"
3. System completes OAuth flow
4. System looks up user by OAuth UID
5. System verifies role is 'client'
6. Client is logged in and sees their workouts

### Admin: Resend Invitation
1. Admin views client detail screen
2. Client shows status: "Invitation Sent (not accepted)"
3. Admin taps "Resend Invitation" button
4. System creates new invitation code
5. System updates ClientInvitation record
6. System sends new invitation email
7. Admin sees confirmation: "Invitation resent to [email]"

## Acceptance Criteria

### Must Have (MVP)
- ✅ Admin can sign in with Google
- ✅ Admin can sign in with Apple
- ✅ Client email field is required when creating a client
- ✅ System automatically sends invitation email when admin creates new client
- ✅ Invitation email contains app download link and unique invitation code
- ✅ Client can sign in with Google using invitation link
- ✅ Client can sign in with Apple using invitation link
- ✅ Client account is automatically linked to client profile upon first login
- ✅ Admin can see invitation status for each client (Pending, Accepted)
- ✅ Client sees their assigned workouts immediately after first login
- ✅ System prevents clients from accessing admin features
- ✅ System prevents admins from accessing client features

### Should Have
- Invitation expiration (30 days)
- Admin can resend invitation email
- Deep linking to open app with invitation code
- Email validation to prevent typos
- Handle case where client email doesn't match OAuth email
- Show last login timestamp for clients
- Show invitation sent timestamp

### Could Have (Future Enhancements)
- SMS invitation option (in addition to email)
- Customizable invitation email templates
- Multi-language invitation emails
- Admin can revoke/cancel invitations
- Client onboarding wizard after first login
- Push notification when client accepts invitation
- Invitation acceptance analytics

## Technical Considerations

### Authentication Provider
- Use **Firebase Authentication** or **Supabase Auth** for OAuth providers
- Both support Google and Apple sign-in out of the box
- Handle token refresh automatically
- Secure token storage on device

### Email Service
- Use **Firebase Cloud Functions** with SendGrid/Mailgun for sending emails
- OR use **Supabase Edge Functions** with Resend/SendGrid
- Email templates stored in cloud functions
- Include unsubscribe option in emails (legal requirement)

### Deep Linking
- Configure iOS Universal Links for deep linking
- URL scheme: `pfa://invite?code={invitationCode}`
- Handle deep link in app when opened
- Parse invitation code from URL
- Gracefully handle expired or invalid codes

### Security
- Invitation codes should be cryptographically random (UUID v4 or similar)
- Validate invitation code server-side before linking account
- Prevent invitation code reuse
- Rate limit invitation email sending to prevent abuse
- Implement HTTPS for all API calls
- Store auth tokens securely using Expo SecureStore

### User Role Management
- Store user role in database (not just in auth claims)
- Check role on app startup and route to appropriate screens
- Admin dashboard vs Client workout view
- Implement role-based access control for all API endpoints

### Error Handling
- Invalid invitation codes
- Expired invitations
- Email sending failures
- OAuth failures
- Network errors during sign-in
- Email already registered with different role

## Email Template Example

```
Subject: You're invited to [Trainer Name]'s Fitness Program!

Hi [Client Name],

[Trainer Name] has invited you to join their fitness program on PFA!

Get started in 3 easy steps:
1. Download the PFA app from the App Store
2. Sign in with your Google or Apple account
3. Start crushing your fitness goals!

[Download App Button - Links to App Store]

[Get Started Button - Deep link with invitation code]

This invitation expires in 30 days.

Questions? Reply to this email to contact your trainer.

---
PFA - Personal Fitness App
```

## Navigation Structure

### Unauthenticated State
- Welcome/Login Screen
  - Sign in with Google button
  - Sign in with Apple button
  - (Optional) Sign in with Email/Password

### Admin Authenticated State
- Bottom Tab Navigation:
  - Clients Tab (default)
  - Workouts Tab
  - Profile/Settings Tab

### Client Authenticated State
- Bottom Tab Navigation:
  - My Workouts Tab (default)
  - History Tab
  - Profile Tab

## Future Considerations
- Add password-based authentication as fallback
- Support for multiple trainers per client
- Trainer invitation/referral system
- White-label app for individual trainers
- Client can switch between multiple trainers
