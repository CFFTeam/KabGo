import 'package:customer_app/models/route_model.dart';
import 'package:riverpod/riverpod.dart';

class RouteNotifier extends StateNotifier<RouteModel> {
  RouteNotifier() : super(RouteModel());

  void setRoute(RouteModel value) async {
    state = value;
  }
}

final routeProvider =
    StateNotifierProvider<RouteNotifier, RouteModel>((ref) => RouteNotifier());
