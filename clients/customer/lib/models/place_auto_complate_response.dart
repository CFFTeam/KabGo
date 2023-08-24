import 'dart:convert';

import 'location_model.dart';

/// The Autocomplete response contains place predictions and status
class PlaceAutocompleteResponse {
  final String? status;
  final List<LocationModel>? predictions;

  PlaceAutocompleteResponse({this.status, this.predictions});

  factory PlaceAutocompleteResponse.fromJson(Map<String, dynamic> json) {
    // print(json);
    return PlaceAutocompleteResponse(
      status: json['status'] as String?,
      predictions: json['predictions'] != null
          ? json['predictions']
              .map<LocationModel>((json) => LocationModel.fromJson(json))
              .toList()
          : null,
    );
  }

  static PlaceAutocompleteResponse parseAutocompleteResult(
      String responseBody) {
    final parsed = json.decode(responseBody).cast<String, dynamic>();

    return PlaceAutocompleteResponse.fromJson(parsed);
  }
}
