class Customer {
  final String name;
  final String phone;
  final String avatar;
  final String rankType;
  final String rankTitle;

  Customer({
    required this.name,
    required this.phone,
    required this.avatar,
    required this.rankType,
    required this.rankTitle,
  });

  bool hasValue() {
    return name != "" && phone != "" && avatar != "";
  }

  factory Customer.fromJson(Map<String, dynamic> json) {
    return Customer(
      name: json['name'],
      phone: json['phone'],
      avatar: json['avatar'], 
      rankType: json['rankType'],
      rankTitle: json['rankTitle']
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'phone': phone,
      'avatar': avatar,
      'rankType': rankType,
      'rankTitle': rankTitle
    };
  }
}