class LocationPostion {
  final double latitude;
  final double longitude;

  LocationPostion({required this.latitude, required this.longitude});

  bool hasValue() {
    return latitude != 0 && longitude != 0;
  }

  factory LocationPostion.fromJson(Map<String, dynamic> json) {
    return LocationPostion(
      latitude: json['latitude'],
      longitude: json['longitude'],
    );
  }

  Map<String, dynamic> toJson() => {
    'latitude': latitude,
    'longitude': longitude,
  };
}