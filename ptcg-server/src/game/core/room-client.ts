import { User } from "../../storage";

export type RoomResponse<R> = (message: string, data: R) => void;

export type RoomClientCallback<T, R> = (data: T, response?: RoomResponse<R>) => void

export interface RoomClientListener<T, R> {
  message: string;
  callback: RoomClientCallback<T, R>;
};

export interface RoomEmitter {
  emit: <T, R>(client: RoomClient, message: string, data: T, response?: RoomResponse<R>) => void;
}

export class RoomClient {

  public user: User | undefined;
  public listeners: RoomClientListener<any, any>[] = [];
  public emitter: RoomEmitter;

  constructor(emitter: RoomEmitter, user?: User) {
    this.emitter = emitter;
    this.user = user;
  }

  public on<T, R>(message: string, callback: RoomClientCallback<T, R>) {
    const listener = {message, callback};
    this.listeners.push(listener);
  }

  public emit<T, R>(message: string, data: T, response?: RoomResponse<R>) {
    this.emitter.emit(this, message, data, response);
  }

}
