import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:driver/models/booking.dart';
import 'package:driver/models/customer.dart';
import 'package:driver/models/customer_request.dart';
import 'package:driver/models/direction_model.dart';
import 'package:driver/models/location.dart';
import 'package:driver/providers/current_location.dart';
import 'package:driver/providers/socket_provider.dart';
import 'package:driver/data/direction_repository.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

abstract class RequestStatus {
  static int waiting = 0;
  static int accepted = 1;
  static int comming = 2;
  static int ready = 3;
  static int ongoing = 4;
}

class CustomerRequestDetails {
  final LocationPostion currentLocation;
  final CustomerRequest customer_infor;
  final String duration_time;
  final String duration_distance;
  final Directions direction;

  CustomerRequestDetails(
      {required this.customer_infor,
      required this.duration_distance,
      required this.duration_time,
      required this.direction,
      required this.currentLocation});

  bool hasValue() {
    return customer_infor.hasValue() &&
        duration_distance != "" &&
        duration_time != "";
  }

  factory CustomerRequestDetails.fromJson(Map<String, dynamic> json) {
    return CustomerRequestDetails(
      customer_infor: CustomerRequest.fromJson(json['customer_infor']),
      duration_distance: json['duration_distance'],
      duration_time: json['duration_time'],
      direction: Directions.fromJson(json['direction']),
      currentLocation: LocationPostion.fromJson(json['currentLocation']),
    );
  }

  Map<String, dynamic> toJson() => {
        'customer_infor': customer_infor.toJson(),
        'duration_distance': duration_distance,
        'duration_time': duration_time,
        'direction': direction.toJson(),
        'currentLocation': currentLocation.toJson(),
      };
}

class CustomerRequestNotifier extends StateNotifier<CustomerRequestDetails> {
  final SocketClient _socket;
  final LocationPostion currentLocation;

  int status = RequestStatus.waiting;

  CustomerRequestNotifier(this._socket, this.currentLocation)
      : super(CustomerRequestDetails(
            customer_infor: CustomerRequest(
              price: "",
              user_information: Customer(
                  avatar: '',
                  default_payment_method: '',
                  name: '',
                  phonenumber: '',
                  rank: '',
                  dob: '',
                  email: '',
                  home_address: '',
                  type: ''),
              distance: '',
              time: '',
              arrival_information:
                  LocationAddress(address: '', latitude: "", longitude: ""),
              departure_information:
                  LocationAddress(address: '', latitude: "", longitude: ""),
            ),
            direction: Directions(
              bounds: LatLngBounds(
                southwest: const LatLng(0, 0),
                northeast: const LatLng(0, 0),
              ),
              polylinePoints: [],
              totalDistance: '',
              totalDuration: '',
            ),
            currentLocation: LocationPostion(
              latitude: 0,
              longitude: 0,
            ),
            duration_distance: '',
            duration_time: '')) {
    _socket.subscribe('customer-request', (data) {
      print('server say: ${jsonDecode(data)}');

      CustomerRequest customerReq = CustomerRequest.fromJson(jsonDecode(data));
      DirectionRepository(dio: Dio())
          .getDirection(
              origin:
                  LatLng(currentLocation.latitude, currentLocation.longitude),
              destination: LatLng(
                  double.parse(customerReq.departure_information.latitude),
                  double.parse(customerReq.departure_information.longitude)))
          .then((value) {
        if (value != null) {
          state = CustomerRequestDetails(
              direction: value,
              customer_infor: customerReq,
              duration_distance: value.totalDistance,
              duration_time: value.totalDuration,
              currentLocation: LocationPostion(
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              ));
        }
      });
    });
  }

  void acceptRequest() {
    status = RequestStatus.accepted;
  }

  void commingRequest() {
    status = RequestStatus.comming;
  }

  void cancelRequest() {
    status = RequestStatus.waiting;

    state = CustomerRequestDetails(
        customer_infor: CustomerRequest(
          price: "",
          user_information: Customer(
              avatar: '',
              default_payment_method: '',
              name: '',
              phonenumber: '',
              rank: '',
              dob: '',
              email: '',
              home_address: '',
              type: ''),
          distance: '',
          time: '',
          arrival_information:
              LocationAddress(address: '', latitude: "", longitude: ""),
          departure_information:
              LocationAddress(address: '', latitude: "", longitude: ""),
        ),
        direction: Directions(
          bounds: LatLngBounds(
            southwest: const LatLng(0, 0),
            northeast: const LatLng(0, 0),
          ),
          polylinePoints: [],
          totalDistance: '',
          totalDuration: '',
        ),
        duration_distance: '',
        duration_time: '',
        currentLocation: LocationPostion(latitude: 0, longitude: 0));
  }
}

final customerRequestProvider =
    StateNotifierProvider<CustomerRequestNotifier, CustomerRequestDetails>(
        (ref) {
  Position currentLocation = ref.read(currentLocationProvider);
  return CustomerRequestNotifier(
      ref.read(socketClientProvider.notifier),
      LocationPostion(
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude));
});
