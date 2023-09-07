import 'dart:convert';

import 'package:google_maps_flutter/google_maps_flutter.dart';

import '../models/location_model.dart';
import '../utils/Google_Api_Key.dart';
import 'networkUtility.dart';

Future<LocationModel> setAddressByPosition(LatLng latlng) async {
  // LatLng position = await determinePosition();
  // double lat = position.latitude;
  // double long = position.longitude;
  Uri uri = Uri.https('maps.googleapis.com', 'maps/api/geocode/json', {
    'key': APIKey,
    'latlng': '${latlng.latitude},${latlng.longitude}',
  });

  String? response = await NetworkUtility.fetchUrl(uri);
  final parsed = json.decode(response!).cast<String, dynamic>();
  String address = parsed['results'][0]['formatted_address'] as String;

  return LocationModel(
    structuredFormatting: StructuredFormatting(
      mainText: address.indexOf(',') != -1
          ? address.substring(0, address.indexOf(',')).trim()
          : address,
      secondaryText: address.indexOf(',') != -1 &&
              address.indexOf(',') != address.lastIndexOf(',')
          ? address
              .substring(address.indexOf(',') + 1, address.lastIndexOf(','))
              .trim()
          : "",
    ),
    placeId: parsed['results'][0]['place_id'] as String,
    postion: latlng,
  );
}
