import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import MessageDto from '../dto/message.dto';

let rooms : number[] = [];
let roomId : number = 0;

@Injectable()
export class ChattingService {
    constructor(){}
    
    createRoom(client: Socket) : number {
        const isAlreadyRoom : number = rooms.find(value => value === roomId);
        if(isAlreadyRoom !== undefined){
            ++roomId;
            this.createRoom(client);
            return;
        }
        ++roomId;
        rooms.push(roomId);
        client.join(roomId.toString());
        console.log(`create room ${roomId}`);
        return roomId;
    }

    deleteRoom(client: Socket, deleteRoomId: any) : void { 
        deleteRoomId = parseInt(deleteRoomId);
        rooms = rooms.filter(value => value !== deleteRoomId);
        return;
    }

    joinRoom(client: Socket, joinRoomId: number) : any {
        const room : number = rooms.find(value => value === joinRoomId);
        if(room === undefined || room === null) {
            return {result: false, message: '채팅방 입장에 실패했습니다.'};
        }
        
        client.join(joinRoomId.toString());
        client.to(room.toString()).emit('message', `${client.id}님이 입장하셨습니다.`);
        console.log('join room');
        return {result: true};
    }

    disconnectRoom(client: Socket, disconnectRoomId: number) : void {
        const room : number = rooms.find(value => value === disconnectRoomId);
        if(client.rooms.size > 1) {
            client.leave(room.toString());
        }
        client.to(room.toString()).emit('disconnect', `${client.id}님이 퇴장하셨습니다.`);
        console.log('disconnect room');
        return;
    }

    broadcastMessage(message: MessageDto, client: Socket) : void {
        client.to(message.roomId).emit('message', message.text);
        return;
    }
}
