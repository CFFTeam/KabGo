class Customer {
  final String avatar;
  final String name;
  final String email;
  final String phonenumber;
  final String dob;
  final String home_address;
  final String type;
  final String default_payment_method;
  final String rank;

  Customer(
      {required this.email,
      required this.dob,
      required this.home_address,
      required this.type,
      required this.default_payment_method,
      required this.name,
      required this.phonenumber,
      required this.avatar,
      required this.rank});

  bool hasValue() {
    return name != "" && phonenumber != "";
  }

  factory Customer.fromJson(Map<String, dynamic> json) {
    return Customer(
        name: json['name'],
        phonenumber: json['phonenumber'],
        avatar: json['avatar'],
        rank: json['rank'],
        default_payment_method: json['default_payment_method'],
        type: json['type'],
        home_address: json['home_address'],
        dob: json['dob'],
        email: json['email']);
  }

  Map<String, dynamic> toJson() => {
        'name': name,
        'phonenumber': phonenumber,
        'avatar': avatar,
        'rank': rank,
        'default_payment_method': default_payment_method,
        'type': type,
        'home_address': home_address,
        'dob': dob,
        'email': email
      };
}
