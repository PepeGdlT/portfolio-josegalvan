import { Server } from 'socket.io';

export const setupSocket = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    
    // aquí manejo los mensajes que llegan
    socket.on('message', (msg: { text: string; senderId: string }) => {
      // esto solo hace eco del mensaje al cliente que lo envió
      socket.emit('message', {
        text: `Echo: ${msg.text}`,
        senderId: 'system',
        timestamp: new Date().toISOString(),
      });
    });

    // aquí manejo cuando el cliente se desconecta
    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });

    // envío un mensaje de bienvenida cuando alguien se conecta
    socket.emit('message', {
      text: 'Welcome to WebSocket Echo Server!',
      senderId: 'system',
      timestamp: new Date().toISOString(),
    });
  });
};