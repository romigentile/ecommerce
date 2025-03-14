import { SetMetadata } from "@nestjs/common"; //* PARA ASIGNAR METADATOS
import { Role } from "../users/role.enum";

export const Roles = (...roles:Role[]) => SetMetadata("roles", roles)