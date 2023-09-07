interface User {
    user_information: {
        avatar: string;
        name: string;
        email: string;
        phonenumber: string;
        dob: string;
        home_address: string;
        type: string;
        default_payment_method: string;
        rank: string;
    };
    departure_information: {
        address: string;
        latitude: string;
        longitude: string;
    };
    arrival_information: {
        address: string;
        latitude: string;
        longitude: string;
    };
    service: string;
    price: string;
    distance: string;
    time: string;
}

export default User;

