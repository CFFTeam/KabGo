import 'package:customer_app/models/driver_model.dart';
import 'package:riverpod/riverpod.dart';

class DriverNotifier extends StateNotifier<DriverModel> {
  DriverNotifier()
      : super(
            DriverModel(vehicle: "", coordinate: "", rating: "", rotation: ""));

  void setDriver(DriverModel value) async {
    state = value;
  }
}

final driverProvider = StateNotifierProvider<DriverNotifier, DriverModel>(
    (ref) => DriverNotifier());
