import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:riverpod/riverpod.dart';

class CurrentLocationNotifier extends StateNotifier<LatLng> {
  CurrentLocationNotifier() : super(const LatLng(0, 0));

  void setCurrentLocation(LatLng value) async {
    state = value;
  }
}

final currentLocationProvider =
    StateNotifierProvider<CurrentLocationNotifier, LatLng>(
        (ref) => CurrentLocationNotifier());
