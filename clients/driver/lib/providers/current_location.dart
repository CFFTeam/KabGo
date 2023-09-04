import 'package:driver/models/location.dart';
import 'package:geolocator/geolocator.dart';
import 'package:riverpod/riverpod.dart';

class CurrentLocationProvider extends StateNotifier<Position> {
  Future<Position> getCurrentLocation() async {
    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();

    if (!serviceEnabled) {
      return Future.error('Location services are disabled');
    }

    LocationPermission permission = await Geolocator.checkPermission();

    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();

      if (permission == LocationPermission.denied) {
        return Future.error('Location permissions are denied.');
      }
    }

    if (permission == LocationPermission.deniedForever) {
      return Future.error(
          'Location permissions are permanently denied, we cannot request permissions.');
    }

    return await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.bestForNavigation);
  }

  CurrentLocationProvider()
      : super(Position(
          latitude: 0,
          longitude: 0,
          timestamp: DateTime.now(),
          accuracy: 0,
          altitude: 0,
          heading: 0,
          speed: 0,
          speedAccuracy: 0,
        )) {
    getCurrentLocation().then((Position currentLocation) {
      state = currentLocation;
    });
  }

  Position currentLocation() {
    return state;
  }

  void updateLocation(Position location) {
    state = location;
  }
}

final currentLocationProvider =
    StateNotifierProvider<CurrentLocationProvider, Position>(
        (ref) => CurrentLocationProvider());
