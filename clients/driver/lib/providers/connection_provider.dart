import 'package:driver/providers/socket_provider.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

const String fakeData =
    "{\"customerLocation\": {\"latitude\": 10.739409785339353,\"longitude\": 106.65454734297383},\"destinationLocation\": {\"latitude\": 10.762711311339077,\"longitude\": 106.68230473890691},\"customer\": {\"name\": \"Maximilliam\",\"phone\": \"0123456789\"}}";

class CustomerRequestNotifier extends StateNotifier<String> {
  final SocketClient _socket;

  CustomerRequestNotifier(this._socket) : super("") {
    _socket.subscribe('welcome', (data) {
      print('server say: $data');

      state = fakeData;
    });
  }

  void cancelRequest() {
    state = "";
  }
}

final customerRequestProvider =
    StateNotifierProvider<CustomerRequestNotifier, String>((ref) => 
        CustomerRequestNotifier(ref.read(socketClientProvider.notifier))
    );
