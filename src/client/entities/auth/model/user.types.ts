// TODO Move to common/entities/auth/model/user.types.ts
// TODO Move to common/entities/auth/model/user.schema.ts
// TODO Implement validation Middleware https://github.com/scythecult/node-prisma/blob/main/src/middleware/validationMiddlewareBuilder.ts
// TODO Implement server errorMiddleware
// TODO Handle client and server errors
// (think how to connect server error validation messages to react-hook-form)

export type UserData = {
  id: string;
  phone: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isPromoChecked?: boolean;
  isLegalChecked: boolean;
};

export type UserResponse = {
  user: UserData;
};

export type UserSignUpRequest = Omit<UserData, 'id'>;

export type UserSignInRequest = {
  email?: string | undefined;
  phone?: string | undefined;
  password: string;
  isPersistent: boolean;
};

export type UserSignOutRequest = {
  email: string;
};
