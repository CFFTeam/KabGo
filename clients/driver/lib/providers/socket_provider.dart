import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:socket_io_client/socket_io_client.dart';

class SocketClient extends StateNotifier<bool> {
  static final SocketClient _socketClient = SocketClient._internal();

  static late Socket socket;

  SocketClient._internal() : super(false) {
    _createSocket();

    print('SocketClient created');
  }

  _createSocket() {
    socket = io(
      'ws://192.168.2.68:4600/',
      OptionBuilder()
          .setTransports(['websocket'])
          .disableAutoConnect()
          .enableReconnection()
          .build(),
    );
  }

  factory SocketClient() {
    return _socketClient;
  }

  void toggle() {
    if (!mounted) return;

    if (socket.connected) {
      socket.disconnect();
      socket.close();
      state = false;
    } else {
      socket.connect();
      state = true;
    }
  }

  void subscribe(String event, dynamic Function(dynamic) callback) {
    if (!mounted) return;

    if (state == true) {
      socket.on(event, callback);
    }
  }

  void publish(String event, String json) {
    if (!mounted) return;

    if (state == true) {
      socket.emit(event, json);
    }
  }

  bool connected() {
    return state;
  }
}

final socketClientProvider =
    StateNotifierProvider<SocketClient, bool>((ref) => SocketClient());
