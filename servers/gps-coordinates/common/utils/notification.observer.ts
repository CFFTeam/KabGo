import Driver from '@common/interfaces/driver';
import haversineDistance from './haversineDistance';

// Định nghĩa interface cho Observer
interface Observer {
    infor: Driver;
    socket: any;
    update(customer: any, bookingData: any): void;
}

// Định nghĩa interface cho Subject (chủ thể)
interface Subject {
    addObserver(observer: Observer): void;
    removeObserver(observer: Observer): void;
    notifyObservers(customer: any, bookingData: any): void;
}

// Triển khai lớp cho Subject
export class RideService implements Subject {
    public observers: Observer[] = [];

    addObserver(observer: Observer): void {
        this.observers.push(observer);
    }

    removeObserver(observer?: Observer): void {
        if (!observer) return;
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }

    notifyObservers(customer: any, bookingData: any): any {
        let drivers: any = [];

        for (const value of this.observers) {
            const distance = haversineDistance(
                {
                    latitude: +customer.departure_information.latitude,
                    longitude: +customer.departure_information.longitude,
                },
                {
                    latitude: +value.infor.coordinate.latitude,
                    longitude: +value.infor.coordinate.longitude,
                }
            );
            console.log('DISTANCE: ', distance);
            if (distance <= 1.5) {
                value.infor.distance = distance;
                drivers = [...drivers, value];
            }
        }

        const nearestDriver = drivers?.sort((a: any, b: any) => b.distance - a.distance).slice(0, 5);

        const finalDrivers = nearestDriver.map((observer: any) => {
            observer.update(customer, bookingData);
            const _observer: any = { ...observer };
            delete _observer.socket;
            return _observer;
        });
        return finalDrivers;
    }

    // Đây là một phương thức ứng dụng trong trường hợp đặt xe
    bookRide(socket: any, customer: any, bookingData: any): void {
        const finalDrivers = this.notifyObservers(customer, bookingData);
        socket.emit('send drivers', JSON.stringify(finalDrivers));
    }
}

export class DriverNearest implements Observer {
    constructor(public socket: any, public infor: Driver) {}

    update(customer: any, bookingData: any): void {
        this.socket.emit('customer-request', JSON.stringify({ ...customer, history_id: bookingData._id.toString() }));
    }
}

