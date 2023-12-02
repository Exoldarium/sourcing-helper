import 'express-session';

// add a type for req.session.user 
// declaration merging breaks ts-node as it will not recognize merged types
// running tsc works so i'm using tsc as the default compiler while ts-node is only used for transpiling
declare module 'express-session' {
  interface SessionData {
    user: {
      email: string;
      id: string;
    };
    admin: boolean;
    disabled: boolean;
  }
}