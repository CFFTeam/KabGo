import 'package:driver/models/vehicle.dart';
import 'package:driver/models/location.dart';

class Driver {
  final String avatar;
  final String name;
  final String phonenumber;
  final Vehicle vehicle;
  final double rotation;
  final double rating;
  final LocationPostion coordinate;

  Driver(this.avatar, this.name, this.phonenumber, this.vehicle, this.coordinate, this.rotation, this.rating);

  factory Driver.fromJson(Map<String, dynamic> json) {
    return Driver(
      json['avatar'],
      json['name'],
      json['phonenumber'],
      Vehicle.fromJson(json['vehicle']),
      LocationPostion.fromJson(json['coordinate']),
      json['rotation'],
      json['rating'],
    );
  }

  Map<String, dynamic> toJson() => {
        'avatar': avatar,
        'name': name,
        'phonenumber': phonenumber,
        'vehicle': vehicle.toJson(),
        'coordinate': coordinate.toJson(),
        'rotation': rotation,
        'rating': rating,
      };
}
