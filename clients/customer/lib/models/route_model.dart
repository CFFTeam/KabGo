import 'location_model.dart';

class RouteModel {
  LocationModel? departureLocation;
  LocationModel? arrivalLocation;
  String? distance;
  String? time;

  RouteModel({
    this.departureLocation,
    this.arrivalLocation,
    this.distance,
    this.time,
  });
}
