import 'package:riverpod/riverpod.dart';

import '../models/customer_model.dart';

class CustomerNotifier extends StateNotifier<CustomerModel> {
  CustomerNotifier() : super(CustomerModel());

  void setCustomer(CustomerModel value) async {
    state = value;
  }
}

final customerProvider = StateNotifierProvider<CustomerNotifier, CustomerModel>(
    (ref) => CustomerNotifier());
