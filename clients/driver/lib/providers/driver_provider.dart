import 'package:driver/models/driver_details.dart';
import 'package:riverpod/riverpod.dart';

class DriverDetailsNotifier extends StateNotifier<DriverDetails> {
  DriverDetailsNotifier() : super(DriverDetails(
      id: '',
      avatar: '',
      name: '',
      email: '',
      phonenumber: '',
      rate: 0,
      accept_rate: 0,
      cancel_rate: 0,
      begin_day: '',
      day_income: 0,
      week_income: 0,
      lock: false,
      account_balance: [],
      vehicle: [],
      active: '',
      social: false
  ));

  bool get hasValue => state.id.isNotEmpty;

  void setDriverDetails(DriverDetails driverDetails) {
    state = driverDetails;
  }
}

final driverDetailsProvider = StateNotifierProvider<DriverDetailsNotifier, DriverDetails>((ref) {
  return DriverDetailsNotifier();
});