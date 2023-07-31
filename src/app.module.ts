import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { TeamModule } from './team/team.module';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [EventsModule, TeamModule, NotifyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
