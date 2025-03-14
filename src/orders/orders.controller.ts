import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDto } from './orders.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiTags } from "@nestjs/swagger";

@ApiTags("orders")
@Controller("orders")
@UseGuards(AuthGuard)
export class OrdersController {

    constructor(private readonly ordersService: OrdersService){}
    
    /**
     * Ruta para crear una orden
     * - Ver más en Schema: OrderDto
     */
    @Post()
    addOrder(@Body() order:OrderDto){
        const {userId , products} = order
        return this.ordersService.addOrder(userId, products)
    }

    /**
     * Ruta para obtener una orden por ID 
     * - Debe ingresar un Param ID existente 
     * - Puede obtener el ID desde /users/:id
     */
    @Get(":id")
    getOrder(@Param("id", ParseUUIDPipe) id:string){
        return this.ordersService.getOrder(id)
    }
}
