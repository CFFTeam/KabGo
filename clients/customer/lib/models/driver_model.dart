// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

class DriverModel {
  String? avatar;
  String? name;
  String? phonenumber;
  dynamic vehicle;
  dynamic coordinate;
  dynamic rating;
  dynamic rotation;
  DriverModel({
    this.avatar,
    this.name,
    this.phonenumber,
    required this.vehicle,
    required this.coordinate,
    required this.rating,
    required this.rotation,
  });

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'avatar': avatar,
      'name': name,
      'phonenumber': phonenumber,
      'vehicle': vehicle,
      'coordinate': coordinate,
      'rating': rating,
      'rotation': rotation,
    };
  }

  factory DriverModel.fromMap(Map<String, dynamic> map) {
    return DriverModel(
      avatar: map['avatar'] != null ? map['avatar'] as String : null,
      name: map['name'] != null ? map['name'] as String : null,
      phonenumber:
          map['phonenumber'] != null ? map['phonenumber'] as String : null,
      vehicle: map['vehicle'] as dynamic,
      coordinate: map['coordinate'] as dynamic,
      rating: map['rating'] as dynamic,
      rotation: map['rotation'] as dynamic,
    );
  }

  String toJson() => json.encode(toMap());

  factory DriverModel.fromJson(String source) =>
      DriverModel.fromMap(json.decode(source) as Map<String, dynamic>);
}
