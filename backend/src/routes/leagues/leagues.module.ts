import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { LeaguesController } from './league.controller';
import { LeaguesService } from './leagues.service';

@Module({
  imports: [PrismaModule, forwardRef(() => AuthModule)],
  controllers: [LeaguesController],
  providers: [LeaguesService],
  exports: [LeaguesService],
})
export class LeaguesModule {}
