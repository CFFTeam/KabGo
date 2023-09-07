import 'dart:convert';

import 'package:google_maps_flutter/google_maps_flutter.dart';

import '../functions/networkUtility.dart';
import '../utils/Google_Api_Key.dart';

class LocationModel {
  final String? placeId;
  final StructuredFormatting? structuredFormatting;
  LatLng? postion;

  LocationModel({
    this.placeId,
    this.structuredFormatting,
    this.postion,
  });

  factory LocationModel.fromJson(Map<String, dynamic> json) {
    return LocationModel(
      placeId: json['place_id'] as String?,
      structuredFormatting: json['structured_formatting'] != null
          ? StructuredFormatting.fromJson(json['structured_formatting'])
          : null,
    );
  }
  Future<LatLng> getLocation() async {
    Uri uri = Uri.https('maps.googleapis.com', 'maps/api/place/details/json', {
      'key': APIKey,
      'place_id': placeId,
    });

    String? response = await NetworkUtility.fetchUrl(uri);
    final parsed = json.decode(response!).cast<String, dynamic>();

    postion = LatLng(
      double.parse(
          (parsed['result']['geometry']['location']['lat']).toString()),
      double.parse(
          (parsed['result']['geometry']['location']['lng']).toString()),
    );

    return postion!;
  }
}

class StructuredFormatting {
  /// mainText contains the main text of a prediction, usually the name of the place.
  final String? mainText;

  /// secondaryText contains the secondary text of a prediction, usually the location of the place.
  final String? secondaryText;

  StructuredFormatting({this.mainText, this.secondaryText});

  factory StructuredFormatting.fromJson(Map<String, dynamic> json) {
    return StructuredFormatting(
      mainText: json['main_text'] as String?,
      secondaryText: json['secondary_text'] as String?,
    );
  }
}
