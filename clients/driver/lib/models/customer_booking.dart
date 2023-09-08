import 'package:flutter_polyline_points/flutter_polyline_points.dart';

import 'driver.dart';

class DriverSubmit {
  final String user_id;
  final Driver driver;
  final List<PointLatLng> directions;

  DriverSubmit(
      {required this.user_id, required this.driver, required this.directions});

  factory DriverSubmit.fromJson(Map<String, dynamic> json) {
    return DriverSubmit(
      user_id: json['user_id'],
      driver: Driver.fromJson(json['driver']),
      directions: [],
    );
  }

  Map<String, dynamic> toJson() => {
        'user_id': user_id,
        'driver': driver.toJson(),
        'directions': directions.toString()
      };
}
