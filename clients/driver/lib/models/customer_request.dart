import 'package:driver/models/customer.dart';
import 'package:driver/models/location.dart';

class CustomerRequest {
  final LocationPostion customerLocation;
  final LocationPostion destinationLocation;

  final Customer customer;

  CustomerRequest({
    required this.customerLocation,
    required this.destinationLocation,
    required this.customer,
  });

  factory CustomerRequest.fromJson(Map<String, dynamic> json) {
    return CustomerRequest(
      customerLocation: LocationPostion.fromJson(json['customerLocation']),
      destinationLocation: LocationPostion.fromJson(json['destinationLocation']),
      customer: Customer.fromJson(json['customer']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'customerLocation': customerLocation.toJson(),
      'destinationLocation': destinationLocation.toJson(),
      'customer': customer.toJson(),
    };
  }
}
