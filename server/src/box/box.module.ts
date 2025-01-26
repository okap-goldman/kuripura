import { Module } from '@nestjs/common';
import { WasabiService } from './box.service';

@Module({
  providers: [WasabiService],
  exports: [WasabiService],
})
export class BoxModule {} 