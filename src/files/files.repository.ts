import { Injectable } from "@nestjs/common";
import {UploadApiResponse, v2 as cloudinary} from "cloudinary"
import toStream = require("buffer-to-stream") //* ME TRAIGO EL TO-STREAM DE LA LIBRERIA
 
@Injectable()
export class FilesRepository{

    async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse>{
        return new Promise((resolve, reject)=>{
            const upload = cloudinary.uploader.upload_stream(
                {resource_type: "auto"}, //* DETECTA DE FORMA AUTOMATICA EL TIPO DE ARCHIVO
                (error, result) => error ? reject(error): resolve(result) //* MANEJO DE ERRORES PARA LA PROMESA
            )

            toStream(file.buffer).pipe(upload) //* TRANSFORMA EN STREAM

        })
    }
}