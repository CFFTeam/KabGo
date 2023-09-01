class Vehicle {
  final String name;
  final String brand;
  final String type;
  final String color;
  final String number;

  Vehicle({
    required this.name,
    required this.brand,
    required this.type,
    required this.color,
    required this.number,
  });

  factory Vehicle.fromJson(Map<String, dynamic> json) {
    return Vehicle(
      name: json['name'],
      brand: json['brand'],
      type: json['type'],
      color: json['color'],
      number: json['number'],
    );
  }

  Map<String, dynamic> toJson() => {
        'name': name,
        'brand': brand,
        'type': type,
        'color': color,
        'number': number,
      };
}
