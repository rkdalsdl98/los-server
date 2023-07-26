import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Namespace } from 'socket.io';
import { ChattingService } from './chatting/chatting.service';
import MessageDto from './dto/message.dto';
import NotifyDto from './dto/notify.dto';

require('dotenv').config()

const serverip = process.env.SERVER_IP
const serverport = process.env.SERVER_PORT

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: [`http://${serverip}:${serverport}`],
  },
})
export class EventsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  
  constructor(private readonly chattingService : ChattingService){}

  @WebSocketServer() nsp: Namespace;
  private logger: Logger = new Logger('EventsGateway');

  @SubscribeMessage('message')
  handleEvent(@MessageBody() data: MessageDto, @ConnectedSocket() client: Socket) : void {
    return this.chattingService.broadcastMessage(data, client);
  }

  @SubscribeMessage('create-room')
  handleCreateRoom(@ConnectedSocket() client: Socket) : void {
    let res : number = this.chattingService.createRoom(client);
    client.emit('notify', {
        type: 'create-success',
        data: res,
      } as NotifyDto
    );
    return;
  }

  @SubscribeMessage('join-room')
  handleJoinRoom(@MessageBody() roomId: number, @ConnectedSocket() client: Socket) {
    return this.chattingService.joinRoom(client, roomId);
  }

  @SubscribeMessage('leave-room')
  handleLeaveRoom(@MessageBody() rommId: number, @ConnectedSocket() client: Socket) {
    return this.chattingService.disconnectRoom(client, rommId);
  }

  afterInit(client: Socket) {
    this.nsp.adapter.on('delete-room', (room) => {
      this.chattingService.deleteRoom(client, room);
    });
    this.logger.log('채팅 서버 초기화');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`클라이언트 연결 : ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`클라이언트 연결 종료 : ${client.id}`);
  }
}
