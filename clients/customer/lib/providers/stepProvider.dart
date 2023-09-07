import 'package:riverpod/riverpod.dart';

class StepNotifier extends StateNotifier<String> {
  StepNotifier() : super('home');

  void setStep(String value) async {
    state = value;
  }
}

final stepProvider =
    StateNotifierProvider<StepNotifier, String>((ref) => StepNotifier());
