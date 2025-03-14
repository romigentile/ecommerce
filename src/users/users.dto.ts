import { ApiHideProperty, PickType } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength, Validate } from "class-validator";
import { MatchPassword } from "../decorators/matchPassword.decorator";
import { Role } from "./role.enum";

export class UserDto{

    /** 
    * @example TestUser
    */
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    name:string

    /** 
    * Si al momento de crear el usuario se indica "el email ya esta registrado" agregar algo aleatorio antes del @ manteniendo el example.com
    * @example x@example.com
    */
    @IsNotEmpty()
    @IsEmail()
    email:string

    /** 
    * @example aaBBcc123!
    */
    @IsNotEmpty()
    @IsString()
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*])/, {
        message: 'Contraseña demasiado debil'
    })
    @MinLength(8)
    @MaxLength(15)
    password:string

    /** 
    * @example aaBBcc123!
    */
    @IsNotEmpty()
    @Validate(MatchPassword,["password"])
    confirmPassword:string

    /** 
    * @example 1234567891
    */
    @IsNotEmpty()
    @IsNumber()
    phone:number

    /** 
    * @example Ejemplo
    */
    @IsOptional()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    country:string

    /** 
    * @example CalleEjemplo
    */
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address:string

    /** 
    * @example Ejemplo
    */
    @IsOptional()
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    city:string

    @ApiHideProperty()
    @IsOptional()
    isAdmin:Role
}

export class LoginUserDto extends PickType(UserDto, ["email", "password"]) {
}
