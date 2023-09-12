import { NextFunction, Request, Response, Router } from 'express';
import Controller from '@common/interfaces/controller';
import validationMiddleware from '@common/middlerware/validation.middleware';
import CallReceiptDto from '@common/dtos/call_receipt.dto';
import rabbitMQ from '@common/rabbitmq';
import mongoose from 'mongoose';
import BookingHistory from '@common/models/booking_history.model';
import Customer from '@common/models/customer.model';
import Service  from '@common/models/service.model';
import { calculateVehicleServicePrice } from '@common/utils/calculateVehicleServicePrice';

class LocatingController implements Controller {
    path: string = '/v1/locating';
    router: Router = Router();

    constructor() {
        this.router.post('/call-receipt', validationMiddleware(CallReceiptDto), this.callReceipt);
        this.router.get('/most-frequent-booking-addresses/:phoneNumber', this.getMostFrequentBookingAddresses);
        this.router.get('/most-recent-bookings/:phoneNumber', this.getRecentBookings);
    }

    callReceipt = async (req: Request, res: Response, next: NextFunction) => {
        const data = {
        _id: new mongoose.Types.ObjectId(),
        ...req.body,
        };      
        console.log('Data sent from client-s1: ', data);
        // check if this booking addresses existed or not, if exists let's push to "gps-coordinates" and "tracking" queues
        let existedBooking = await BookingHistory.find({
            $and: [{ 'original.address': data.origin }, { 'destination.address': data.destination }],
        });

        console.log('existed Booking: ', existedBooking);

        if (existedBooking.length > 0) {
            const existingOriginLatLng = {
                lat: existedBooking[0].original.latitude,
                lng: existedBooking[0].original.longitude,
            }

            const existingDestinationLatLng = {
                lat: existedBooking[0].destination.latitude,
                lng: existedBooking[0].destination.longitude
            }

            // find customer, if not exist -> create new one
            let customer = await Customer.findOne({ phonenumber: data.customer_phonenumber });
            if (!customer) {
                customer = await Customer.create({
                    name: data.customer_name,
                    email: '',
                    phonenumber: data.customer_phonenumber,
                    dob: '',
                    home_address: '',
                    type: 'STANDARD',
                    default_payment_method: '',
                    rank: 'Đồng',
                    active: '07/09/2023',
                    lock: 'false',
                });
            }

            // find corresponding vehicle_id of vehicle type
            const service = await Service.findOne({ name: data.vehicle_type });

            // calculate price for this booking based on distance
            const price = calculateVehicleServicePrice(existedBooking[0].distance, data.vehicle_type);
            console.log('calculated price s1: ', price);

            let newBooking = await BookingHistory.create({
                _id: new mongoose.Types.ObjectId(data._id),
                customer: customer._id,
                original: {
                    address: data?.origin,
                    latitude: existingOriginLatLng.lat,
                    longitude: existingOriginLatLng.lng,
                },
                destination: {
                    address: data?.destination,
                    latitude: existingDestinationLatLng.lat,
                    longitude: existingDestinationLatLng.lng,
                },
                distance: existedBooking[0].distance,
                time: data?.local_time,
                state: 'Đang điều phối',
                frequency: existedBooking.length + 1,
                vehicle: service?._id,
                price: price,
                related_employee: new mongoose.Types.ObjectId(data.related_employee),
            });

            rabbitMQ.publish(
                'gps-coordinates',
                JSON.stringify({
                    _id: newBooking._id,
                    ...data,
                    origin_latlng: existingOriginLatLng,
                    destination_latlng: existingDestinationLatLng,
                    state: 'Đang điều phối',
                    price: price,
                })
            );

            rabbitMQ.publish(
                'tracking',
                JSON.stringify({
                    _id: newBooking._id,
                    ...data,
                    origin_latlng: existingOriginLatLng,
                    destination_latlng: existingDestinationLatLng,
                    state: 'Đang điều phối',
                    // state: "Đang tiến hành"
                    // state: "Hoàn thành"
                    // state: "Đã hủy",
                    price: price,
                })
            );
        }

        // else push to locating queue handled by s2
        else rabbitMQ.publish('locating', JSON.stringify(data));
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
