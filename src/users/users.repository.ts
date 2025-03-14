import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { UserDto } from "./users.dto";

@Injectable()
export class UsersRepository {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User> 
    ){}

    async getUsers(page:number, limit:number){

        const start = (page -1) * limit
        const users = await this.usersRepository.find({take: limit, skip: start})

        return users.map(({password, ...userWidtoutPassword})=> userWidtoutPassword) //* LE SACO EL PASSWORD

    }   

    async getUserById(id:string){

        const userById = await this.usersRepository.findOne({where:{id}, relations: {orders: true}})
        if(!userById) throw new NotFoundException(`El usuario con ID: ${id} no existe.`) 

        const {password, ...userWidtoutPassword} = userById

        return userWidtoutPassword
    }

    async createUser(user:Partial<UserDto>): Promise<Partial<User>>{

        const newUser = await this.usersRepository.save(user)
        const {password, confirmPassword, ...userWithoutPassword} = newUser

        return userWithoutPassword
    }

    async updateUser(id:string, changeUser:Partial<User>){

        const findedUser = await this.usersRepository.findOne({where: {id}, relations: {orders:true}})

        if(!findedUser) throw new BadRequestException("El usuario que desea actualizar no existe")

        await this.usersRepository.update(id, changeUser)

        return "El usuario ha sido actualizado con exito"
  
    }

    async deleteUser(id:string){

        const user = await this.usersRepository.findOneBy({id})

        if(!user) throw new NotFoundException("El usuario que desea eliminar no existe")
        const {password, ...userWidtoutPassword} = user

        await this.usersRepository.delete(id)

        return userWidtoutPassword
    }

    async getUserByEmail(email:string):Promise<User>{
        return await this.usersRepository.findOneBy({email: email})
    }

}