import 'express-session';

declare module 'express-session' {
  interface SessionData {
    // Add your custom session properties here
    userId: string;
    userEmail: string;
    isLoggedIn: boolean;
    isPersistent: boolean;
  }
}
