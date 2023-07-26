import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { TeamModule } from './team/team.module';

@Module({
  imports: [EventsModule, TeamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
