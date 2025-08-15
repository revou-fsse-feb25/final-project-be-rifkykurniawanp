import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Define your own User type or import it from your user module
type UserType = {
  id?: string;
  email?: string;
  // add other properties as needed
};

export const User = createParamDecorator(
  (data: keyof UserType | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if (data) {
      return request.user?.[data];
    }

    return request.user;
  },
);
