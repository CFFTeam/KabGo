import 'package:driver/models/location.dart';
import 'package:riverpod/riverpod.dart';

class RouteDirection {
  final LocationPostion startLocation;
  final String instruction;
  final String maneuver;
  final num duration;
  final num distance;
  final int index;

  RouteDirection(
      {required this.startLocation,
      required this.instruction,
      required this.maneuver,
      required this.duration,
      required this.distance,
      required this.index});

  factory RouteDirection.fromJson(Map<String, dynamic> json) {
    return RouteDirection(
      startLocation: LocationPostion.fromJson(json['start_location']),
      instruction: json['instruction'],
      maneuver: json['maneuver'],
      duration: json['duration'],
      distance: json['distance'],
      index: json['index'],
    );
  }

  Map<String, dynamic> toJson() => {
        'start_location': startLocation.toJson(),
        'instruction': instruction,
        'maneuver': maneuver,
        'duration': duration,
        'distance': distance,
      };
}

class RouteProvider extends StateNotifier<RouteDirection> {
  RouteProvider()
      : super(RouteDirection(
            startLocation: LocationPostion(latitude: 0, longitude: 0),
            instruction: '',
            maneuver: '',
            duration: 0,
            distance: 0,
            index: -1));

  void setRoute(RouteDirection route) {
    state = route;
  }

  bool get hasValue => state.index != -1;
}

final routeProvider = StateNotifierProvider<RouteProvider, RouteDirection>(
    (ref) => RouteProvider());

class RouteListNotifier extends StateNotifier<List<RouteDirection>> {
  RouteListNotifier() : super([]);

  void setRoute(List<RouteDirection> route) {
    state = route;
  }
}

final routeListProvider =
    StateNotifierProvider<RouteListNotifier, List<RouteDirection>>(
        (ref) => RouteListNotifier());
