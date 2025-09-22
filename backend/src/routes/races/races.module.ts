import { forwardRef, Module } from '@nestjs/common';
import { RacesController } from './races.controller';
import { RacesService } from './races.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  controllers: [RacesController],
  providers: [RacesService, PrismaService],
  exports: [RacesService],
})
export class RacesModule {}
