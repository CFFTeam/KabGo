import 'package:driver/models/booking.dart';
import 'package:driver/models/customer.dart';

class CustomerRequest {
  final Customer customer;
  final Booking booking;

  CustomerRequest({
    required this.customer,
    required this.booking,
  });

  bool hasValue() {
    return customer.hasValue() && booking.hasValue();
  }

  factory CustomerRequest.fromJson(Map<String, dynamic> json) {
    return CustomerRequest(
      booking: Booking.fromJson(json['booking']),
      customer: Customer.fromJson(json['customer']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'booking': booking.toJson(),
      'customer': customer.toJson(),
    };
  }
}
