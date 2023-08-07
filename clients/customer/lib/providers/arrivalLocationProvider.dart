import 'package:riverpod/riverpod.dart';
import '../models/location_model.dart';

class ArrivalLocationNotifier extends StateNotifier<LocationModel> {
  ArrivalLocationNotifier() : super(LocationModel());

  void setArrivalLocation(LocationModel value) async {
    state = value;
  }
}

final arrivalLocationProvider =
    StateNotifierProvider<ArrivalLocationNotifier, LocationModel>(
        (ref) => ArrivalLocationNotifier());
