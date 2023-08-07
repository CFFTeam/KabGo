import 'package:riverpod/riverpod.dart';
import '../models/location_model.dart';

class DepartureLocationNotifier extends StateNotifier<LocationModel> {
  DepartureLocationNotifier() : super(LocationModel());

  void setDepartureLocation(LocationModel value) async {
    state = value;
  }
}

final departureLocationProvider =
    StateNotifierProvider<DepartureLocationNotifier, LocationModel>(
        (ref) => DepartureLocationNotifier());
