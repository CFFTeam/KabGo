import 'package:flutter_riverpod/flutter_riverpod.dart';

const String fake_data = "{\"customerLocation\": {\"latitude\": 10.739409785339353,\"longitude\": 106.65454734297383},\"destinationLocation\": {\"latitude\": 10.762711311339077,\"longitude\": 106.68230473890691},\"customer\": {\"name\": \"Maximilliam\",\"phone\": \"0123456789\"}}";

class SocketConnection extends StateNotifier<bool> {
  SocketConnection() : super(false);

  void toggle() {
    state = !state;
  }

  void connect() {
    state = true;
  }

  void disconnect() {
    state = false;
  }
}

final socketProvider = StateNotifierProvider<SocketConnection, bool>(
  (ref) => SocketConnection(),
);
