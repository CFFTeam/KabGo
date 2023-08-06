import 'package:driver/models/location.dart';

class Booking {
  final LocationPostion from;
  final LocationPostion to;

  final String paymentMethod;
  final bool promotion;
  final String vehicle;

  Booking({
    required this.from,
    required this.to,
    required this.paymentMethod,
    required this.promotion,
    required this.vehicle
  });

  bool hasValue() {
    return from.hasValue() && to.hasValue() && paymentMethod != "" && vehicle != "";
  }

  factory Booking.fromJson(Map<String, dynamic> json) {
    return Booking(
      from: LocationPostion.fromJson(json['from']),
      to: LocationPostion.fromJson(json['to']),
      paymentMethod: json['paymentMethod'],
      promotion: json['promotion'],
      vehicle: json['vehicle']
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'from': from.toJson(),
      'to': to.toJson(),
      'paymentMethod': paymentMethod,
      'promotion': promotion,
      'vehicle': vehicle
    };
  }
}
