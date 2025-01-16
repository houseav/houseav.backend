import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Retrieve roles metadata from the route or controller
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles || roles.length === 0) {
      return true; // If no roles are specified, allow access
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // Check if the user exists and has a role
    if (!user || !user.fkRoleId?.name) {
      throw new UnauthorizedException('User not authenticated');
    }

    const hasRole = roles.includes(user.fkRoleId.name);
    if (!hasRole) {
      throw new ForbiddenException('You do not have the required permissions');
    }

    return true;
  }
}
