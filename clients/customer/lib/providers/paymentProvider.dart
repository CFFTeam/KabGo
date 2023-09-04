import 'package:riverpod/riverpod.dart';

import '../models/payment_model.dart';

class PaymentNotifier extends StateNotifier<PaymentModel> {
  PaymentNotifier() : super(PaymentModel());

  void setPayment(PaymentModel paymentModel) async {
    state = paymentModel;
  }

  void setTime(String value) {
    state.time = value;
  }

  void setVehicle(String value) {
    state.vehicle = value;
  }

  void setPaymentMethod(String value) {
    state.paymentMethod = value;
  }

  void setDiscount(String value) {
    state.discount = value;
  }

  void setPrice(String value) {
    state.price = value;
  }
}

final paymentProvider = StateNotifierProvider<PaymentNotifier, PaymentModel>(
    (ref) => PaymentNotifier());
