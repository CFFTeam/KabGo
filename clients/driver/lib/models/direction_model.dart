import 'package:flutter_polyline_points/flutter_polyline_points.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class Directions {
  final LatLngBounds? bounds;
  final List<PointLatLng>? polylinePoints;
  final String? totalDistance;
  final String? totalDuration;

  const Directions({
    this.bounds,
    this.polylinePoints,
    this.totalDistance,
    this.totalDuration,
  });

  factory Directions.fromMap(Map<String, dynamic> map) {
    final data = Map<String, dynamic>.from(map['routes'][0]);

    final northeast = data['bounds']['northeast'];
    final southwest = data['bounds']['southwest'];

    return Directions(
      bounds: LatLngBounds(
        southwest: LatLng(southwest['lat'], southwest['lng']),
        northeast: LatLng(northeast['lat'], northeast['lng']),
      ),
      polylinePoints:
          PolylinePoints().decodePolyline(data['overview_polyline']['points']),
      totalDistance: data['legs'][0]['distance']['text'],
      totalDuration: data['legs'][0]['duration']['text'],
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
      );

  Map<String, dynamic> toJson() => {
        'bounds': bounds,
        'polylinePoints': polylinePoints.toString(),
        'totalDistance': totalDistance,
        'totalDuration': totalDuration,
      };
}
