import 'package:flutter_riverpod/flutter_riverpod.dart';


abstract class RequestStatus {
  static int waiting = 0;
  static int accepted = 1;
  static int comming = 2;
  static int ready = 3;
  static int ongoing = 4;
}

class RequestStatusNotifier extends StateNotifier<int> {
  RequestStatusNotifier() : super(RequestStatus.waiting);

   void acceptRequest() {
    state = RequestStatus.accepted;
  }

  void commingRequest() {
    state = RequestStatus.comming;
  }

  void readyRequest() {
    state = RequestStatus.ready;
  }

  void ongoingRequest() {
    state = RequestStatus.ongoing;
  }

  void cancelRequest() {
    state = RequestStatus.waiting;
  }
}

final requestStatusProvider =
    StateNotifierProvider<RequestStatusNotifier, int>((ref) => RequestStatusNotifier());