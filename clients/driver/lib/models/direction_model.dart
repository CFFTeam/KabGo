import 'package:driver/models/location.dart';
import 'package:driver/providers/route_provider.dart';
import 'package:flutter_polyline_points/flutter_polyline_points.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

List<PointLatLng> interpolateCoordinates(
    LatLng start, LatLng end, int numberOfPoints) {
  final List<PointLatLng> coordinates = [];

  final double startLat = start.latitude;
  final double startLng = start.longitude;
  final double endLat = end.latitude;
  final double endLng = end.longitude;

  final double latStep = (endLat - startLat) / numberOfPoints;
  final double lngStep = (endLng - startLng) / numberOfPoints;

  for (double i = 0; i <= 1; i += 0.01) {
    final double interpolatedLat = startLat + i * latStep;
    final double interpolatedLng = startLng + i * lngStep;
    coordinates.add(PointLatLng(interpolatedLat, interpolatedLng));
  }

  return coordinates;
}

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
    List<PointLatLng> polylinePointsTemp2 = [];
    List<RouteDirection> listRoutes = [];

    num distance = data['legs'][0]['distance']['value'];
    num duration = data['legs'][0]['duration']['value'];

    for (int i = 0; i < steps.length; ++i) {
      final stepsPoint = PolylinePoints()
          .decodePolyline(steps[i]['polyline']['points'].toString());
      int count = 0;
      for (int j = 0; j < stepsPoint.length - 1; ++j) {
        polylinePointsTemp2 = interpolateCoordinates(
            LatLng(stepsPoint[j].latitude, stepsPoint[j].longitude),
            LatLng(stepsPoint[j + 1].latitude, stepsPoint[j + 1].longitude),
            1);

        polylinePointsTemp.addAll(polylinePointsTemp2);

        count += polylinePointsTemp2.length;
      }

      listRoutes.add(RouteDirection(
          startLocation: LocationPostion(
              latitude: steps[i]['start_location']['lat'],
              longitude: steps[i]['start_location']['lng']),
          instruction: steps[i]['html_instructions'],
          maneuver: steps[i]['maneuver'] ?? '',
          duration: duration,
          distance: distance,
          index: polylinePointsTemp.length - count));

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
