import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("files")
@Controller('files')
export class FilesController {

    constructor(private readonly filesService: FilesService){}

    /**
     * Ruta de actualizacion de imagen para producto 
     * - Debe ingresar un Param ID de producto existente del tipo UUID 
     * - Se requiere Token de autorizacion para acceder 
     * - Puede obtener el token desde /signin
     * - Copie el Token que le brinda users/:id donde ID es su ID de usuario generado en /singup
     */
    @Post("uploadImage/:id")
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor("file"))
    async uploadImage(@Param("id") productsId: string, @UploadedFile(new ParseFilePipe({
        validators: [
            new MaxFileSizeValidator({maxSize: 200000, message: "El archivo es demasiado grande"}),
            new FileTypeValidator({fileType: /.(jpg|jpeg|png|webp|gif|svg)$/})
        ]
    })) file: Express.Multer.File){
        return await this.filesService.uploadImage(file, productsId)
    }
}
