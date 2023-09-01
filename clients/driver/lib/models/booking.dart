
class LocationAddress {
  final String address;
  final String longitude;
  final String latitude;

  LocationAddress({
    required this.address,
    required this.longitude,
    required this.latitude,
  });

  bool hasValue() {
    return address != "" && longitude != "" && latitude != "";
  }

  factory LocationAddress.fromJson(Map<String, dynamic> json) {
    return LocationAddress(
      address: json['address'],
      longitude: json['longitude'],
      latitude: json['latitude'],
    );
  }

  Map<String, dynamic> toJson() => {
        'address': address,
        'longitude': longitude,
        'latitude': latitude,
      };
}