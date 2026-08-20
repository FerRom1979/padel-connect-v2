import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { jwtConfig } from './config';
import { CitiesModule } from './cities/cities.module';
import { MatchesModule } from './matches/matches.module';
import { ClubsModule } from './clubs/clubs.module';
import { TournamentsModule } from './tournaments/tournaments.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [jwtConfig] }),
    PrismaModule,
    UsersModule,
    AuthModule,
    CitiesModule,
    MatchesModule,
    ClubsModule,
    TournamentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
