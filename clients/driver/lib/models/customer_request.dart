import 'package:driver/models/booking.dart';
import 'package:driver/models/customer.dart';

class CustomerRequest {
  final Customer user_information;
  final String price;
  final LocationAddress departure_information;
  final LocationAddress arrival_information;
  final String time;
  final String distance;
  final String service;
  final String history_id;

  CustomerRequest(
      {required this.user_information,
      required this.departure_information,
      required this.arrival_information,
      required this.service,
      required this.price,
      required this.time,
      required this.distance,
      required this.history_id});

  factory CustomerRequest.fromJson(Map<String, dynamic> json) {
    return CustomerRequest(
      user_information: Customer.fromJson(json['user_information']),
      departure_information:
          LocationAddress.fromJson(json['departure_information']),
      arrival_information:
          LocationAddress.fromJson(json['arrival_information']),
      price: json['price'],
      service: json['service'],
      distance: json['distance'],
      time: json['time'],
      history_id: json['history_id'],
    );
  }

  Map<String, dynamic> toJson() => {
        'user_information': user_information.toJson(),
        'departure_information': departure_information.toJson(),
        'arrival_information': arrival_information.toJson(),
        'price': price,
        'distance': distance,
        'time': time,
        'service': service,
        'history_id': history_id,
      };

  bool hasValue() {
    return user_information.hasValue() &&
        departure_information.hasValue() &&
        arrival_information.hasValue() &&
        service != "" &&
        price != "" && history_id != "";
  }
}
