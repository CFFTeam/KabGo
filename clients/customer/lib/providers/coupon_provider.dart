import 'package:riverpod/riverpod.dart';

class CouponNotifier extends StateNotifier<double> {
  CouponNotifier() : super(0);

  void setCoupon(double discount) async {
    state = discount;
  }
}

final couponProvider =
    StateNotifierProvider<CouponNotifier, double>((ref) => CouponNotifier());
