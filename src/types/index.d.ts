import 'express-session';

// add a type for req.session.user as the express session types don't recognize this for some reason
// adding extra files breaks ts-node as it will not recognize new types
// running tsc works so i'm using tsc as the default compiler while ts-node is only transpiling
declare module 'express-session' {
  interface SessionData {
    user: {
      email: string;
      id: string;
    };
  }
}