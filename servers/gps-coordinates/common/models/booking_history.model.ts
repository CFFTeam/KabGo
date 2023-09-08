import mongoose from 'mongoose';
import './driver.model';
import './customer.model';
import './employee.model';

export interface IBookingHistory {
    customer?: mongoose.Types.ObjectId;
    driver?: mongoose.Types.ObjectId;
    related_employee?: mongoose.Types.ObjectId;
    original: {
        address: string;
        longitude: number;
        latitude: number;
    };
    destination: {
        address: string;
        longitude: number;
        latitude: number;
    };
    time: Date;
    status: string; //điều phối | tiến hành | hủy | hoàn thành
    frequency: number;
    price: string;
    vehicle?: mongoose.Types.ObjectId;
    note: string;
    coupon?: mongoose.Types.ObjectId;
}

const BookingHistorySchema = new mongoose.Schema<IBookingHistory>(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true,
        },
        driver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Driver',
        },
        related_employee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Employee',
        },
        original: {
            _id: false,
            address: {
                type: String,
                required: true,
            },
            longitude: {
                type: Number,
                required: true,
            },
            latitude: {
                type: Number,
                required: true,
            },
        },
        destination: {
            _id: false,
            address: {
                type: String,
                required: true,
            },
            longitude: {
                type: Number,
                required: true,
            },
            latitude: {
                type: Number,
                required: true,
            },
        },
        time: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            // enum: ['điều phối', 'tiến hành', 'hủy', 'hoàn thành'],
            required: true,
        },
        frequency: {
            type: Number,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
        vehicle: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service',
            required: true,
        },
        note: {
            type: String,
        },
        // coupon: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Coupon'
        // }
    },
    {
        timestamps: true,
    }
);

const BookingHistory = mongoose.model<IBookingHistory>('Booking_Histories', BookingHistorySchema);

export default BookingHistory;

