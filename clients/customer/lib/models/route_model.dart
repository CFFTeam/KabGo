// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'location_model.dart';

class RouteModel {
  LocationModel? departureLocation;
  LocationModel? arrivalLocation;
  String? distance;
  String? time;
  String service = '';
  String price = '';

  RouteModel({
    this.departureLocation,
    this.arrivalLocation,
    this.distance,
    this.time,
  });
}
