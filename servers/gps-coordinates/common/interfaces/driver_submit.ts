import Driver from './driver';

interface DriverSubmit {
    user_id: string;
    history_id: string;
    driver: Driver;
    directions: string;
}

export default DriverSubmit;

