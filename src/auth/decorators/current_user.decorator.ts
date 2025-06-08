import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/users/user.entity';

const getCurrentUserByContext = (
  context: ExecutionContext,
): User | undefined => {
  const request = context
    .switchToHttp()
    .getRequest<Request & { user?: User }>();
  return request.user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
