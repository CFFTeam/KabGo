// ignore_for_file: public_member_api_docs, sort_constructors_first
import 'dart:convert';

class CustomerModel {
  String? avatar;
  String? name;
  String? email;
  String? phonenumber;
  String? dob;
  String? home_address;
  String? type;
  String? default_payment_method;
  String? rank;
  String? distance;
  CustomerModel({
    this.avatar,
    this.name,
    this.email,
    this.phonenumber,
    this.dob,
    this.home_address,
    this.type,
    this.default_payment_method,
    this.rank,
    this.distance,
  });

  Map<String, dynamic> toMap() {
    return <String, dynamic>{
      'avatar': avatar,
      'name': name,
      'email': email,
      'phonenumber': phonenumber,
      'dob': dob,
      'home_address': home_address,
      'type': type,
      'default_payment_method': default_payment_method,
      'rank': rank,
      'distance': distance,
    };
  }

  factory CustomerModel.fromMap(Map<String, dynamic> map) {
    return CustomerModel(
      avatar: map['avatar'] != null ? map['avatar'] as String : null,
      name: map['name'] != null ? map['name'] as String : null,
      email: map['email'] != null ? map['email'] as String : null,
      phonenumber:
          map['phonenumber'] != null ? map['phonenumber'] as String : null,
      dob: map['dob'] != null ? map['dob'] as String : null,
      home_address:
          map['home_address'] != null ? map['home_address'] as String : null,
      type: map['type'] != null ? map['type'] as String : null,
      default_payment_method: map['default_payment_method'] != null
          ? map['default_payment_method'] as String
          : null,
      rank: map['rank'] != null ? map['rank'] as String : null,
      distance: map['distance'] != null ? map['distance'] as String : null,
    );
  }

  String toJson() => json.encode(toMap());

  factory CustomerModel.fromJson(String source) =>
      CustomerModel.fromMap(json.decode(source) as Map<String, dynamic>);
}
