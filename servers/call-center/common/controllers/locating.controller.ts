import { NextFunction, Request, Response, Router } from 'express';
import Controller from '@common/interfaces/controller';
import validationMiddleware from '@common/middlerware/validation.middleware';
import CallReceiptDto from '@common/dtos/call_receipt.dto';
import rabbitMQ from '@common/rabbitmq';
import mongoose from 'mongoose';
import BookingHistory from '@common/models/booking_history.model';

class LocatingController implements Controller {
    path: string = '/v1/locating';
    router: Router = Router();

    constructor() {
        this.router.post('/call-receipt', validationMiddleware(CallReceiptDto), this.callReceipt);
        this.router.get('/most-frequent-booking-addresses/:phoneNumber', this.getMostFrequentBookingAddresses);
        this.router.get('/most-recent-bookings/:phoneNumber', this.getRecentBookings);
    }

    callReceipt = (req: Request, res: Response, next: NextFunction) => {
        const data = {
        _id: new mongoose.Types.ObjectId(),
        ...req.body as CallReceiptDto,
        };      
        rabbitMQ.publish('locating', JSON.stringify(data));
        res.status(200).json({
            status: 'success',
            message: "Cuốc xe đã được chuyển tiếp để xử lý",
            data
        })  

    }

    getMostFrequentBookingAddresses = async (req: Request, res: Response, next: NextFunction) => {
        const {phone_number} = req.body;
        const mostFrequentBookingAddresses = await BookingHistory.aggregate([
            {
                $lookup: {
                    from: 'customers', // the name of collection to query
                    localField: 'customer',
                    foreignField: '_id',
                    as: 'customer_info',
                }
            },
            {
                $match: {
                    'customer_info.phonenumber': req.params.phoneNumber,
                }
            },
            // remove some unnecessary fields, keep meaningful values
            {
                $project: {
                    customer: 1,
                    original: 1,
                    destination: 1,
                    frequency: 1,
                    // 'customer_info': 1, // keep customer_info
                }
            },
            {
                $group: {
                    _id: {
                        destination: '$destination.address',
                    },
                    count: {$sum: 1},
                    longitude: {$first: '$destination.longitude'},
                    latitude: {$first: '$destination.latitude'},
                    address_id: {$first: '$_id'}
                    // customer_info: {$first: '$customer_info'} // keep customer_info after group
                }
            },
            {
                $sort: {
                    count: -1, // ascending order
                }
            },
            {
                $limit: 5 // Limit top 5
            },
        ]);
        
        console.log('phone_number sent from call-center s1 client: ', req.body);
        res.status(200).json({
            status: 'success',
            data: {
                mostFrequentBookingAddresses: [...mostFrequentBookingAddresses],
                length: mostFrequentBookingAddresses.length,
            }
        })
    }

    getRecentBookings = async (req: Request, res: Response, next: NextFunction) => {
        console.log('get most recent bookings function triggered');
        const mostRecentBookings = await BookingHistory.aggregate([
            {
                $lookup: {
                    from: 'customers', // the name of collection "customers" 
                    localField: 'customer',
                    foreignField: '_id',
                    as: 'customer_info',
                }
            },
            {
                $lookup: {
                  from: 'services', // the name of collection "services" 
                  localField: 'vehicle', 
                  foreignField: '_id',
                  as: 'service_info', // Rename this as needed
                },
              },
            {
                $match: {
                    'customer_info.phonenumber': req.params.phoneNumber,
                }
            },
            // remove some unnecessary fields, keep meaningful values
            {
                $project: {
                    customer: 1,
                    original: 1,
                    time: 1,
                    destination: 1,
                    vehicle: 1,
                    'service_info': 1,
                }
            },
          
            {
                $sort: {
                    time: -1,
                }
            },
            {
                $limit: 5 // Limit top 5
            },
        ]);
        res.status(200).json({
            status: 'success',
            data: {
                mostRecentBookings: [...mostRecentBookings],
                length: mostRecentBookings.length,
            }
        })
    }
   
}

export default LocatingController;
