import 'package:driver/models/location.dart';
import 'package:driver/providers/route_provider.dart';
import 'package:flutter_polyline_points/flutter_polyline_points.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class Directions {
  final LatLngBounds? bounds;
  final List<PointLatLng>? polylinePoints;
  final String? totalDistance;
  final String? totalDuration;
  final List<RouteDirection>? routeDirectionList;

  const Directions({
    this.bounds,
    this.polylinePoints,
    this.totalDistance,
    this.totalDuration,
    this.routeDirectionList,
  });

  factory Directions.fromMap(Map<String, dynamic> map) {
    final data = Map<String, dynamic>.from(map['routes'][0]);

    final northeast = data['bounds']['northeast'];
    final southwest = data['bounds']['southwest'];

    final steps = data['legs'][0]['steps'];

    List<PointLatLng> polylinePointsTemp = [];
    List<RouteDirection> listRoutes = [];

    for (int i = 0; i < steps.length; ++i) {
      final stepsPoint = PolylinePoints()
          .decodePolyline(steps[i]['polyline']['points'].toString());
      polylinePointsTemp.addAll(stepsPoint);

      listRoutes.add(RouteDirection(
          startLocation: LocationPostion(
              latitude: steps[i]['start_location']['lat'],
              longitude: steps[i]['start_location']['lng']),
          instruction: steps[i]['html_instructions'],
          maneuver: steps[i]['maneuver'] ?? '',
          index: polylinePointsTemp.length - stepsPoint.length - 1));

      if (i < steps.length - 1) {
        polylinePointsTemp.removeLast();
      }
    }

    return Directions(
      bounds: LatLngBounds(
        southwest: LatLng(southwest['lat'], southwest['lng']),
        northeast: LatLng(northeast['lat'], northeast['lng']),
      ),
      polylinePoints: [...polylinePointsTemp],
      totalDistance: data['legs'][0]['distance']['text'],
      totalDuration: data['legs'][0]['duration']['text'],
      routeDirectionList: listRoutes,
    );
  }

  factory Directions.fromJson(Map<String, dynamic> json) => Directions(
        bounds: LatLngBounds(
          southwest: LatLng(json['bounds']['southwest']['latitude'],
              json['bounds']['southwest']['longitude']),
          northeast: LatLng(json['bounds']['northeast']['latitude'],
              json['bounds']['northeast']['longitude']),
        ),
        polylinePoints:
            PolylinePoints().decodePolyline(json['polylinePoints'].toString()),
        totalDistance: json['totalDistance'],
        totalDuration: json['totalDuration'],
        routeDirectionList: json['routeDirectionList'],
      );

  Map<String, dynamic> toJson() => {
        'bounds': bounds,
        'polylinePoints': polylinePoints.toString(),
        'totalDistance': totalDistance,
        'totalDuration': totalDuration,
        'routeDirectionList': routeDirectionList,
      };
}
