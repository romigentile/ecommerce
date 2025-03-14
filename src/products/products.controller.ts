import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { AuthGuard } from "../auth/guards/auth.guard";
import { Roles } from "../decorators/roles.decorator";
import { Role } from "../users/role.enum";
import { RolesGuard } from "../auth/guards/roles.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { ProductDto } from "./products.dto";

@ApiTags("products")
@Controller("products")
export class ProductsController{

    constructor(private readonly productsService: ProductsService){}

    /**
     * Ruta para obtener todos los productos cargados
     * - page: pagina que se muestra, default: 1 - limit: qué cantidad de productos puedo ver por pagina, default: 5
     */
    @Get()
    getProducts(@Query("page") page:number=1, @Query("limit") limit:number=5){
        if(page && limit) return this.productsService.getProduct(page, limit)

        return this.productsService.getProduct(page, limit)
    }

    /**
     * Ruta para obtener un producto por su ID 
     * - Debe ingresar un Param ID existente 
     * - Puede obtenerlo desde /products
     */
    @Get(":id")
    getProductById(@Param("id", ParseUUIDPipe) id:string){
        return this.productsService.getProductById(id)
    }

    /**
     * Ruta para crear un producto
     * - Si crea un producto y se le indica que ya existe, modifique el nombre agregando numeros aleatorios, manteniendo la extructura TestProduct.
     */
    @Post()
    async createProduct(@Body() product:ProductDto){
        return this.productsService.createProduct(product)
    }

    /**
     * Ruta para actualizar un producto 
     * - Debe ingresar un Param ID existente 
     * - Puede obtenerlo desde /products
     * - Se requiere Token de acceso y Rol de administrador
     * - Puede obtener el token desde /signin
     */
    @Put(":id")
    @ApiBearerAuth()
    @Roles(Role.Admin) //* DEFINO EL ROL QUE VA A TENER PARA ACCEDER A ESA RUTA
    @UseGuards(AuthGuard, RolesGuard)
    async updateProduct(@Param("id", ParseUUIDPipe) id:string, @Body() product:ProductDto){
        return this.productsService.updateProduct(id, product)
    }

    /**
     * Ruta para eliminar un producto 
     * - Debe ingresar un Param ID existente 
     * - Puede obtenerlo desde /products
     */
    @Delete(":id")
    deleteUser(@Param("id", ParseUUIDPipe) id:string){
        return this.productsService.deleteProduct(id)
    }

}