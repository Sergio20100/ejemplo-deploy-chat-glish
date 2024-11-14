import { Server } from "socket.io";


const messages = [];
// Configura el servidor Socket.IO
export const config = (httpServer) => {
    // Crea una nueva instancia del servidor Socket.IO
    const socketServer = new Server(httpServer);

    // Escucha el evento de conexión de un nuevo cliente
    socketServer.on("connection", (socket) => {
        console.log("Conexión establecida", socket.id);

        // Escucha el evento de desconexión del cliente
        socket.on("disconnect", () => {
            console.log("Se desconecto un cliente"); // Indica que un cliente se desconectó
        });

        socket.on("message", (data)=>{
            const { user, message} = data;
            console.log(data)
            messages.push({ user, message });
            // envio la respuesta al cliente
            socketServer.emit("message-log", messages);
        });
        // se escucha el login
        socket.on("authenticated",(data)=>{
           socket.broadcast.emit("new-user-connect",data)
            
        })
    });
};