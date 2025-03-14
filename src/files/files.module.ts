import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { CloudinaryConfig} from '../config/cloudinary';
import { FilesRepository } from './files.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/products.entity';

@Module({    
    imports: [TypeOrmModule.forFeature([Product])],
    controllers: [FilesController],
    providers: [FilesService, CloudinaryConfig, FilesRepository]
})
export class FilesModule {
}
