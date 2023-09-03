import 'driver.dart';

class DriverSubmit {
  final String user_id;
  final Driver driver;

  DriverSubmit({required this.user_id, required this.driver});

  factory DriverSubmit.fromJson(Map<String, dynamic> json) {
    return DriverSubmit(
      user_id: json['user_id'],
      driver: Driver.fromJson(json['driver']),
    );
  }

  Map<String, dynamic> toJson() => {
        'user_id': user_id,
        'driver': driver.toJson(),
      };
}
