import Driver from '@common/interfaces/driver';
import haversineDistance from './haversineDistance';

interface Observer {
    infor: Driver;
    socket: any;
    update(customer: any, bookingData: any): void;
}

interface Subject {
    addObserver(observer: Observer): void;
    removeObserver(observer: Observer): void;
    notifyObservers(customer: any, bookingData: any, rejectList: any): void;
}

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

    notifyObservers(customer: any, bookingData: any, rejectList: any): any {
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

            if (distance <= 1.5) {
                let check: Boolean = true;
                value.infor.distance = distance;
                for (const i in rejectList) {
                    // console.log('rejectList[i]=', i);
                    // console.log('customer phone number =', customer.user_information.phonenumber);
                    // console.log('rejectList: ', rejectList[i]);
                    // console.log('\n');
                    if (i == customer.user_information.phonenumber) {
                        for (const j of rejectList[i]) {
                            // console.log('========== rejectList[i][j] = ', j);
                            // console.log('========== value socket phone number = ', value.socket.phonenumber);
                            if (j == value.socket.phonenumber) {
                                check = false;
                            }
                        }
                    }
                }
                if (check) drivers = [...drivers, value];
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

    bookRide(socket: any, customer: any, bookingData: any, rejectList: any): void {
        const finalDrivers = this.notifyObservers(customer, bookingData, rejectList);
        socket.emit('send drivers', JSON.stringify(finalDrivers));
    }
}

export class DriverNotify implements Observer {
    constructor(public socket: any, public infor: Driver) {}

    update(customer: any, bookingData: any): void {
        this.socket.emit('customer-request', JSON.stringify({ ...customer, history_id: bookingData._id.toString() }));
    }
}

