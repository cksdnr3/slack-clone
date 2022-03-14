import io from 'socket.io-client';
import { useCallback } from 'react';

type UserSocketReturns = [SocketIOClient.Socket | undefined, () => void];

const defaultUrl = 'http://localhost:8080';
const sockets: { [key: string]: SocketIOClient.Socket } = {};

const useSocket = (workspace?: string): UserSocketReturns => {
  const disconnect = useCallback(() => {
    if (workspace) {
      sockets[workspace].disconnect();
      delete sockets[workspace];
    }
  }, [workspace]);

  if (!workspace) return [undefined, disconnect];

  sockets[workspace] = io.connect(`${defaultUrl}/ws-${workspace}`); // socket 연결

  return [sockets[workspace], disconnect];
};

export default useSocket;

// 'message' 라는 event를 전달하면
// 해당 이벤트의 이벤트가 발생하고
// 서버로부터 'data' 를 전달 받아 특정
// 동작을 하도록하는 callback을 전달한다.
// sockets[workspace].on('message', (data: any) => {
//   console.log(data);
// });

// sockets[workspace].on('data', (data: any) => {
//   console.log(data);
// });

// hello 이벤트에 world란 데이터를 보낸다.
// sockets[workspace].emit('hello', 'world');
