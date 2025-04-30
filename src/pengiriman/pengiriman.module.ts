import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Pengiriman } from "./pengiriman.entity";
import { PengirimanController } from "./pengiriman.controller";
import { PengirimanService } from "./pengiriman.service";

@Module({
  imports: [TypeOrmModule.forFeature([Pengiriman])],
  controllers: [PengirimanController],
  providers: [PengirimanService],
})
export class PengirimanModule {}
