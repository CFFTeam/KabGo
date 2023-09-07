class AccountBalance {
  final String name;
  final double balance;

  AccountBalance({
    required this.name,
    required this.balance,
  });

  factory AccountBalance.fromJson(Map<String, dynamic> json) {
    return AccountBalance(
      name: json['name'],
      balance: json['balance'],
    );
  }

  Map<String, dynamic> toJson() => {
        'name': name,
        'balance': balance,
      };
}

class Vehicle {
  final String name;
  final String brand;
  final String category;
  final String color;
  final String service;
  final String number;

  Vehicle({
    required this.name,
    required this.brand,
    required this.category,
    required this.color,
    required this.service,
    required this.number,
  });

  factory Vehicle.fromJson(Map<String, dynamic> json) {
    return Vehicle(
      name: json['name'],
      brand: json['brand'],
      category: json['category'],
      color: json['color'],
      service: json['service'],
      number: json['number'],
    );
  }

  Map<String, dynamic> toJson() => {
        'name': name,
        'brand': brand,
        'category': category,
        'color': color,
        'service': service,
        'number': number,
      };
}

class DriverDetails {
  final String id;
  final String avatar;
  final String name;
  final String email;
  final String phonenumber;
  final double rate;
  final double accept_rate;
  final double cancel_rate;
  final String begin_day;
  final double day_income;
  final double week_income;
  final bool lock;
  final List<AccountBalance> account_balance;
  final List<Vehicle> vehicle;
  final String active;
  final bool social;

  DriverDetails({
    required this.id,
    required this.avatar,
    required this.name,
    required this.email,
    required this.phonenumber,
    required this.rate,
    required this.accept_rate,
    required this.cancel_rate,
    required this.begin_day,
    required this.day_income,
    required this.week_income,
    required this.lock,
    required this.account_balance,
    required this.vehicle,
    required this.active,
    required this.social,
  });

  factory DriverDetails.fromJson(Map<String, dynamic> json) {
    return DriverDetails(
      id: json['_id'],
      avatar: json['avatar'],
      name: json['name'],
      email: json['email'],
      phonenumber: json['phonenumber'],
      rate: double.parse(json['rate'].toString()),
      accept_rate: double.parse(json['accept_rate'].toString()),
      cancel_rate: double.parse(json['cancel_rate'].toString()),
      begin_day: json['begin_day'],
      day_income: double.parse(json['day_income'].toString()),
      week_income: double.parse(json['week_income'].toString()),
      lock: json['lock'],
      account_balance: List<AccountBalance>.from(
          json['account_balance'].map((x) => AccountBalance.fromJson(x))),
      vehicle: List<Vehicle>.from(
          json['vehicle'].map((x) => Vehicle.fromJson(x))),
      active: json['active'],
      social: json['social'],
    );
  }

  Map<String, dynamic> toJson() => {
        '_id': id,
        'avatar': avatar,
        'name': name,
        'email': email,
        'phonenumber': phonenumber,
        'rate': rate,
        'accept_rate': accept_rate,
        'cancel_rate': cancel_rate,
        'begin_day': begin_day,
        'day_income': day_income,
        'week_income': week_income,
        'lock': lock,
        'account_balance':
            List<dynamic>.from(account_balance.map((x) => x.toJson())),
        'vehicle': List<dynamic>.from(vehicle.map((x) => x.toJson())),
        'active': active,
        'social': social,
      };
}