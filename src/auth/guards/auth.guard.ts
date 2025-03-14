import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { Role } from "../../users/role.enum";

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private readonly jwtService: JwtService){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> { //* ACCEDE AL CONTEXTO DE EXE DE LA REQUEST

        const request = context.switchToHttp().getRequest() //* USO LA INFO DE LA REQUEST   

        //? ["Bearer", "xxxxx"]
        const token = request.headers.authorization?.split(" ")[1] //* Si nos pasan el token por header

        if(!token) throw new UnauthorizedException("Acceso no autorizado, se requiere token.") 

        try {
            const secret = process.env.JWT_SECRET //* OBTENGO LA CLAVE SECRETA
            const payload = this.jwtService.verify(token, {secret}) //* VERIFICO EL TOKEN CON LA CLAVE SECRETA

            payload.exp = new Date(payload.exp *1000) //* CONVIERTO A MILISEGUNDOS
            payload.iat = new Date(payload.iat *1000)
            payload.roles = payload.isAdmin ? [Role.Admin] : [Role.User]

            request.user = payload

            return true
        } catch (error) {
            throw new UnauthorizedException("Acceso no autorizado. Token inválido.")
        }

    }
}