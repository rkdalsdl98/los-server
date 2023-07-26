import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { ChattingService } from './chatting/chatting.service';

@Module({
  providers: [
    EventsGateway, 
    ChattingService,
  ]
})
export class EventsModule {}
