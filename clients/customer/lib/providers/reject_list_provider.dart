import 'package:riverpod/riverpod.dart';

class RejectListNotifier extends StateNotifier<List<String>> {
  RejectListNotifier() : super([]);

  void addReject(String value) async {
    state.add(value);
  }
}

final rejectListProvider =
    StateNotifierProvider<RejectListNotifier, List<String>>(
        (ref) => RejectListNotifier());
