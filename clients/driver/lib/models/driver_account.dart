class DriverAccount {
  final String avatar;
  final String name;
  final String phonenumber;
  final String email;
  final String begin_day;
  final bool social;

  DriverAccount({
    required this.avatar,
    required this.name,
    required this.phonenumber,
    required this.email,
    required this.begin_day,
    required this.social,
  });

  factory DriverAccount.fromJson(Map<String, dynamic> json) {
    return DriverAccount(
      avatar: json['avatar'],
      name: json['name'],
      phonenumber: json['phonenumber'],
      email: json['email'],
      begin_day: json['begin_day'],
      social: json['social'],
    );
  }

  Map<String, dynamic> toJson() => {
        'avatar': avatar,
        'name': name,
        'phonenumber': phonenumber,
        'email': email,
        'begin_day': begin_day,
        'social': social,
      };
}
