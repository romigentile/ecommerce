import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../../users/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private readonly reflector: Reflector){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const requireRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ])

    const request = context.switchToHttp().getRequest()

    const user = request.user //* SE GUARDA ACA EL PAYLOAD Y EL ROL TAMBIEN

    const hasRole = () => requireRoles.some((role) => {
      return user?.roles?.includes(role)
    })

    const valid = user && user.roles && hasRole()

    if(!valid) throw new ForbiddenException('No tiene permisos para acceder a esta ruta')

    return valid;
  }
}
