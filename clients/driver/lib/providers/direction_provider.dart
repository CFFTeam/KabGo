import 'package:flutter_riverpod/flutter_riverpod.dart';

class DirectionProvider extends StateNotifier<bool> {
  DirectionProvider() : super(false);

  void toggleDirection() {
    state = !state;
  }

  void setDirection(bool value) {
    if (!mounted) return;
    state = value;
  }
}

final directionProvider = StateNotifierProvider<DirectionProvider, bool>(
    (ref) => DirectionProvider());
