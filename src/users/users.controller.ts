import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Put, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { AuthGuard } from "../auth/guards/auth.guard";
import { UserDto } from "./users.dto";
import { Roles } from "../decorators/roles.decorator";
import { Role } from "./role.enum";
import { RolesGuard } from "../auth/guards/roles.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { User } from "./users.entity";

@ApiTags("users")
@Controller("users")
export class UsersController{

    constructor(private readonly usersService:UsersService){}

    /**
     * Ruta para obtener el listado de todos los usuarios 
     * - Se requiere Token de acceso y permiso de administrador
     * - Puede obtener el token desde /signin
     * - page: pagina que se muestra, default: 1 - limit: qué cantidad de productos puedo ver por pagina, default: 5
     */
    @Get()
    @ApiBearerAuth()
    @Roles(Role.Admin) //* DEFINO EL ROL QUE VA A TENER PARA ACCEDER A ESA RUTA
    @UseGuards(AuthGuard, RolesGuard)
    getUsers(@Query("page") page:number =1, @Query("limit") limit:number =5){
            if(page && limit) return this.usersService.getUser(page,limit)

        return this.usersService.getUser(page,limit)
    }
    
    /**
     * Ruta para obtener un usuario por su ID 
     * - Debe ingresar un Param ID existente
     * - Puede obtenerlo desde /users 
     * - Se requiere Token de acceso
     * - Puede obtener el token desde /signin
     */
    @Get(":id")
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    getUserById(@Param("id", ParseUUIDPipe) id:string){
        return this.usersService.getUserById(id)
    }

    /**
     * Ruta para actualizar un usuario por su ID 
     * - Debe ingresar un Param ID existente
     * - Puede obtenerlo desde /users 
     * - Se requiere Token de acceso
     * - Puede obtener el token desde /signin
     */
    @Put(":id")
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    updateUser(@Param("id", ParseUUIDPipe) id:string, @Body() changeUser:Partial<User>){
        return this.usersService.updateUser(id, changeUser)
    }

    /**
     * Ruta para eliminar un usuario por su ID 
     * - Debe ingresar un Param ID existente
     * - Puede obtenerlo desde /users 
     * - Se requiere Token de acceso
     * - Puede obtener el token desde /signin
     */
    @Delete(":id")
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    deleteUser(@Param("id", ParseUUIDPipe) id:string){
        return this.usersService.deleteUser(id)
    }

}