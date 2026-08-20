import { Module } from '@nestjs/common';

import { TournamentsController } from './controllers/tournaments.controller';
import { TournamentsService } from './services/tournaments.service';

@Module({
  controllers: [TournamentsController],
  providers: [TournamentsService],
})
export class TournamentsModule {}
