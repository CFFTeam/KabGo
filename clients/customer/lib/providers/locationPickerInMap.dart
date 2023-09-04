import 'package:riverpod/riverpod.dart';
import '../models/location_model.dart';

class PickerLocationNotifier extends StateNotifier<LocationModel> {
  PickerLocationNotifier() : super(LocationModel());

  void setPickerLocation(LocationModel value) async {
    state = value;
  }
}

final pickerLocationProvider =
    StateNotifierProvider<PickerLocationNotifier, LocationModel>(
        (ref) => PickerLocationNotifier());
