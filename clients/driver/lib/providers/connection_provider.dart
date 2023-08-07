import 'dart:convert';

import 'package:driver/models/booking.dart';
import 'package:driver/models/customer.dart';
import 'package:driver/models/customer_request.dart';
import 'package:driver/models/location.dart';
import 'package:driver/providers/socket_provider.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

abstract class RequestStatus {
  static int waiting = 0;
  static int accepted = 1;
  static int comming = 2;
  static int ready = 3;
  static int ongoing = 4;
}

class CustomerRequestNotifier extends StateNotifier<CustomerRequest> {
  final SocketClient _socket;

  int status = RequestStatus.waiting;

  CustomerRequestNotifier(this._socket)
      : super(CustomerRequest(
            customer: Customer(
                name: "", phone: "", avatar: "", rankType: "", rankTitle: ""),
            booking: Booking(
                from: LocationPostion(latitude: 0, longitude: 0),
                to: LocationPostion(latitude: 0, longitude: 0),
                paymentMethod: "",
                promotion: false,
                vehicle: ""))) {
    _socket.subscribe('welcome', (data) {
      print('server say: ${jsonDecode(data)}');

      state = CustomerRequest.fromJson(jsonDecode(data));
    });
  }

  void acceptRequest() {
    status = RequestStatus.accepted;
  }

  void cancelRequest() {
    status = RequestStatus.waiting;

    state = CustomerRequest(
        customer: Customer(
            name: "", phone: "", avatar: "", rankType: "", rankTitle: ""),
        booking: Booking(
            from: LocationPostion(latitude: 0, longitude: 0),
            to: LocationPostion(latitude: 0, longitude: 0),
            paymentMethod: "",
            promotion: false,
            vehicle: ""));
  }
}

final customerRequestProvider =
    StateNotifierProvider<CustomerRequestNotifier, CustomerRequest>((ref) =>
        CustomerRequestNotifier(ref.read(socketClientProvider.notifier)));
