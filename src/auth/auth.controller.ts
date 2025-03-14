import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto, UserDto } from "../users/users.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("auth")
export class AuthController{

    constructor(private readonly authService: AuthService){}

    /**
     *  Ruta de registro de usuario
     * - En modo TestUser, si devuelve error al realizar el registro, agregue numeros aleatorios antes del @ manteniendo el example.com
     * - Ver más en Schema: UserDto
     */
    @Post("signup")
    signUp(@Body() user: UserDto){
        return this.authService.signUp(user)
    }

    /**
     * Ruta de logeo de usuario 
     * - Me devuelve el Token que se precisa para ingresar a algunas de las rutas que precisan autorizacion de Token
     * - Ver más en Schema: LoginUserDto
     */
    @Post("signin")
    signIn(@Body() user:LoginUserDto){
        return this.authService.signIn(user)
    }

}