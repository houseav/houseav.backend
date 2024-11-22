import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user; // Ensure user is attached to the request, typically via a strategy like Passport

    // Attach user's roles to the request for further use
    request.userRoles = user.roles;

    return roles.some((role) => user.roles?.includes(role));
  }
}
