import { Socket } from 'socket.io';

interface Driver {
    avatar: string;
    name: string;
    phonenumber: string;
    vehicle: {
        name: string;
        brand: string;
        type: string;
        color: string;
        number: string;
    };
    coordinate: {
        latitude: string;
        longitude: string;
    };
    distance?: number;
    rotation?: number;
    rating?: number;
    socket?: Socket;
}

export default Driver;

