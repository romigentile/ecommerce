import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "../users/users.entity";
import { UsersRepository } from "../users/users.repository";
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService{

    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly jwtService: JwtService){}

    getAuth(): string{
        return "Get auth"
    }

    async signUp(user:Partial<User>){

        const userFinded =  await this.usersRepository.getUserByEmail(user.email)

        if(userFinded) throw new BadRequestException("El email ya se encuentra registrado")

        //* HASHEAMOS LA PASSWORD
        const hashedPassword = await bcrypt.hash(user.password, 10)

        if(!hashedPassword) throw new BadRequestException("No se pudo hashear la contraseña")

        //* GUARDAMOS EL USUARIO
        return await this.usersRepository.createUser({...user, password: hashedPassword}) //* LLAMO AL SERVICIO DE LA BD

    }

    async signIn(user:Partial<User>){

        if(!user.email || !user.password) return "Se requieren los datos faltantes"

        const userFinded = await this.usersRepository.getUserByEmail(user.email)

        if(!userFinded) throw new BadRequestException("Credenciales Inválidas") 

        const matchPassword = await bcrypt.compare(user.password, userFinded.password)

        if(!matchPassword) throw new BadRequestException("Contraseña incorrecta")

        const userPayload = {id: userFinded.id, email: userFinded.email, isAdmin: userFinded.isAdmin}

        const token = this.jwtService.sign(userPayload) //*FIRMA DEL TOKEN

        return {message: "Usuario logueado correctamente", token}
    }
}