import { RoomType } from "./roomType.model";
/*
Represents a room object that has an identifier, name, and the type of room it is (single bed, 4-person room, etc).
*/
export class Room {
    roomId: number; 
    name: string;                   
    type: RoomType;                             
}