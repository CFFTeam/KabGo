import 'package:driver/.env.dart';
import 'package:dio/dio.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

import '../models/direction_model.dart';

class DirectionRepository {
  static const String _baseUrl =
      'https://maps.googleapis.com/maps/api/directions/json?';

  final Dio _dio;

  DirectionRepository({required Dio dio}) : _dio = dio;

  Future<Directions?> getDirection({
    required LatLng origin,
    required LatLng destination,
  }) async {
    final response = await _dio.get(_baseUrl, queryParameters: {
      'origin': '${origin.latitude},${origin.longitude}',
      'destination': '${destination.latitude},${destination.longitude}',
      'language': 'vi',
      'key': googleAPIKey,
    });

    if (response.statusCode == 200) {
      if ((response.data['routes'] as List).isEmpty) return null;

      return Directions.fromMap(response.data);
    }

    return null;
  }
}
