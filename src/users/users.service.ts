import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { UserDto } from "./users.dto";
import { User } from "./users.entity";


@Injectable()
export class UsersService{

    constructor(private readonly usersRepository: UsersRepository){}

    getUser(page:number, limit:number){
        const users = this.usersRepository.getUsers(page, limit)
        return users
    }

    getUserById(id: string){
        return this.usersRepository.getUserById(id)
    }

    createUser(user:any){
        return this.usersRepository.createUser(user)
    }

    updateUser(id:string, changeUser:Partial<User>){
        return this.usersRepository.updateUser(id, changeUser)
    }

    deleteUser(id:string){
        return this.usersRepository.deleteUser(id)
    }
}