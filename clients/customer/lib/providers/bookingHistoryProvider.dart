import 'package:riverpod/riverpod.dart';
import '../models/location_model.dart';

class BookingHistoryNotifier extends StateNotifier<List<LocationModel>> {
  BookingHistoryNotifier() : super([]);

  void addLocation(LocationModel value) async {
    state.add(value);
  }
}

final bookingHistoryProvider =
    StateNotifierProvider<BookingHistoryNotifier, List<LocationModel>>(
        (ref) => BookingHistoryNotifier());
