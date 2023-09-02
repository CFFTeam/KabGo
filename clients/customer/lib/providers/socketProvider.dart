import 'dart:convert';

import 'package:customer_app/models/location_model.dart';
import 'package:customer_app/models/route_model.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:socket_io_client/socket_io_client.dart';

import '../functions/convertTimeFormat.dart';

class SocketClient extends StateNotifier<void> {
  static final SocketClient _socketClient = SocketClient._internal();

  static late Socket socket;

  SocketClient._internal() : super(()) {
    _createSocket();

    print('SocketClient created');
  }

  _createSocket() {
    socket = io(
      'ws://192.168.2.6:4600/',
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

  void emitBookingCar(
      LocationModel depature, LocationModel arrival, RouteModel routeModel) {
    socket.emit(
      "booking-car",
      jsonEncode(
        {
          'user_information': {
            "avatar": "",
            "name": "Nguyễn",
            "email": "nguyen@example.com",
            "phonenumber": "0987654321",
            "dob": "10/11/1995",
            "home_address": "123 Đường ABC, phường XYZ, quận LMN, TP.HCM",
            "type": "Regular",
            "default_payment_method": "MasterCard",
            "rank": "Bạc",
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
          'price': routeModel.price,
          'distance': routeModel.distance,
          'time': convertTimeFormat(routeModel.time!),
        },
      ),
    );
  }
}

final socketClientProvider =
    StateNotifierProvider<SocketClient, void>((ref) => SocketClient());
