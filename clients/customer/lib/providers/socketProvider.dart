import 'dart:convert';

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:socket_io_client/socket_io_client.dart';

import '../functions/convertTimeFormat.dart';
import '../models/customer_model.dart';
import '../models/location_model.dart';
import '../models/route_model.dart';
import '../utils/google_api_key.dart';

class SocketClient extends StateNotifier<void> {
  static final SocketClient _socketClient = SocketClient._internal();

  static late Socket socket;

  SocketClient._internal() : super(()) {
    _createSocket();

    print('SocketClient created');
  }

  _createSocket() {
    socket = io(
      'ws://$ip:4600/',
      OptionBuilder()
          .setTransports(['websocket'])
          .disableAutoConnect()
          .enableReconnection()
          .build(),
    );
    socket.connect();
  }

  factory SocketClient() {
    return _socketClient;
  }

  void subscribe(String event, dynamic Function(dynamic) callback) {
    socket.on(event, callback);
  }

  void emitBookingCar(LocationModel depature, LocationModel arrival,
      RouteModel routeModel, CustomerModel customerModel) {
    socket.emit(
      "booking-car",
      jsonEncode(
        {
          'user_information': {
            "avatar": customerModel.avatar,
            "name": customerModel.name,
            "email": customerModel.email,
            "phonenumber": customerModel.phonenumber,
            "dob": customerModel.dob,
            "home_address": customerModel.home_address,
            "type": customerModel.type,
            "default_payment_method": customerModel.default_payment_method,
            "rank": customerModel.rank,
          },
          'departure_information': {
            'address':
                '${depature.structuredFormatting!.mainText}, ${depature.structuredFormatting!.secondaryText}',
            'latitude': depature.postion!.latitude.toString(),
            'longitude': depature.postion!.longitude.toString(),
          },
          'arrival_information': {
            'address':
                '${arrival.structuredFormatting!.mainText}, ${arrival.structuredFormatting!.secondaryText}',
            'latitude': arrival.postion!.latitude.toString(),
            'longitude': arrival.postion!.longitude.toString(),
          },
          "service": routeModel.service,
          'price': routeModel.price,
          'distance': routeModel.distance,
          'time': convertTimeFormat(routeModel.time!),
          'coupon': routeModel.coupon
        },
      ),
    );
  }

  void emitCancelBooing(LocationModel depature, LocationModel arrival,
      RouteModel routeModel, CustomerModel customerModel) {
    socket.emit(
      "customer-cancel",
      jsonEncode(
        {
          'user_information': {
            "avatar": customerModel.avatar,
            "name": customerModel.name,
            "email": customerModel.email,
            "phonenumber": customerModel.phonenumber,
            "dob": customerModel.dob,
            "home_address": customerModel.home_address,
            "type": customerModel.type,
            "default_payment_method": customerModel.default_payment_method,
            "rank": customerModel.rank,
          },
          'departure_information': {
            'address':
                '${depature.structuredFormatting!.mainText}, ${depature.structuredFormatting!.secondaryText}',
            'latitude': depature.postion!.latitude.toString(),
            'longitude': depature.postion!.longitude.toString(),
          },
          'arrival_information': {
            'address':
                '${arrival.structuredFormatting!.mainText}, ${arrival.structuredFormatting!.secondaryText}',
            'latitude': arrival.postion!.latitude.toString(),
            'longitude': arrival.postion!.longitude.toString(),
          },
          "service": routeModel.service,
          'price': routeModel.price,
          'distance': routeModel.distance,
          'time': convertTimeFormat(routeModel.time!),
          // 'coupon': routeModel.coupon
        },
      ),
    );
  }
}

final socketClientProvider =
    StateNotifierProvider<SocketClient, void>((ref) => SocketClient());
