import {Server, ServerOptions} from 'socket.io';
import http from 'http';

class SocketManager {
    private static instance: SocketManager;
    private io: Server | any | null;
    
    private constructor() { 
        this.io = null;
    }

    public static getInstance(): SocketManager {
        return this.instance || (this.instance = new this());
    }

    public init(httpServer: http.Server, options?: ServerOptions): Server {
        if (!this.io) {
            this.io = new Server(httpServer, {
                cors: {
                    origin: "*"
                },
                ...options
            })
        }   
        return this.io;
    }

    public  getIO(): Server {
        if (!this.io) {
            throw new Error('Socket instance not initialized');
        }
        return this.io;
    }
}

export default SocketManager.getInstance();


