import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Pesan } from "./pesan.entity";
import { PesanController } from "./pesan.controller";
import { PesanService } from "./pesan.service";

@Module({
    imports: [TypeOrmModule.forFeature([Pesan])],
    controllers: [PesanController],
    providers: [PesanService]
})
export class PesanModule {}