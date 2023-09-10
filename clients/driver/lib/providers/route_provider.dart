import 'package:driver/models/location.dart';
import 'package:riverpod/riverpod.dart';

class RouteDirection {
  final LocationPostion startLocation;
  final String instruction;
  final String maneuver;
  final int index;

  RouteDirection(
      {required this.startLocation,
      required this.instruction,
      required this.maneuver, 
      required this.index});

  factory RouteDirection.fromJson(Map<String, dynamic> json) {
    return RouteDirection(
      startLocation: LocationPostion.fromJson(json['start_location']),
      instruction: json['instruction'],
      maneuver: json['maneuver'],
      index: json['index'],
    );
  }

  Map<String, dynamic> toJson() => {
        'start_location': startLocation.toJson(),
        'instruction': instruction,
        'maneuver': maneuver,
      };
}

class RouteProvider extends StateNotifier<RouteDirection> {
  RouteProvider()
      : super(RouteDirection(
            startLocation: LocationPostion(latitude: 0, longitude: 0),
            instruction: '',
            maneuver: '', index: -1));

  void setRoute(RouteDirection route) {
    state = route;
  }
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
