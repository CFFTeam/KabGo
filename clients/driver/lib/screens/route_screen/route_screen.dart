import 'package:driver/providers/customer_request.dart';
import 'package:driver/providers/request_status.dart';
import 'package:driver/providers/route_provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'styles.dart';

class RouteScreen extends ConsumerStatefulWidget {
  const RouteScreen({Key? key}) : super(key: key);

  static String name = 'RouteScreen';
  static String path = '/route';

  @override
  ConsumerState<RouteScreen> createState() => _RouteScreenState();
}

class _RouteScreenState extends ConsumerState<RouteScreen> {
  @override
  Widget build(BuildContext context) {
    final route = ref.watch(routeProvider);

    final requestStatus = ref.watch(requestStatusProvider);
    final customerRequest = ref.watch(customerRequestProvider);

    final dest = (requestStatus == RequestStatus.comming)
        ? customerRequest.customer_infor.departure_information.address
        : customerRequest.customer_infor.arrival_information.address;

    final num hours = route.duration ~/ 3600;
    final num remainingSeconds = route.duration % 3600;
    final num minutes = (remainingSeconds <= 60) ? 1 : remainingSeconds ~/ 60;

    final timeStr = (hours > 0) ? '$hours giờ $minutes phút' : '$minutes phút';

    int meters = (route.distance / 100).round() * 100;

    double kilometers = meters / 1000.0;
    String formattedDistance = kilometers.toStringAsFixed(1);

    final distanceStr =
        (meters > 1000) ? '${formattedDistance} km' : '${meters.toString()} m';

    return Container(
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(20),
          topRight: Radius.circular(20),
        ),
        boxShadow: [
          BoxShadow(
            color: Color.fromRGBO(0, 0, 0, 0.1),
            blurRadius: 10,
            offset: Offset(0, 0),
          ),
        ],
      ),
      child: SingleChildScrollView(
        child: SizedBox(
          height: 100,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Padding(
                    padding:
                        const EdgeInsets.only(left: 12, right: 12, top: 12),
                    child: Text(
                      timeStr,
                      style: const TextStyle(
                          fontSize: 22,
                          color: Color(0xFFF86C1D),
                          fontWeight: FontWeight.bold),
                    ),
                  ),
                  const SizedBox(
                    height: 8,
                  ),
                  Padding(
                    padding:
                        const EdgeInsets.only(left: 12, right: 12, bottom: 12),
                    child: Text(
                      distanceStr,
                      style: const TextStyle(
                          fontSize: 16, fontWeight: FontWeight.w600),
                    ),
                  ),
                ],
              ),
              SizedBox(
                  width: 230,
                  child: Padding(
                    padding: const EdgeInsets.symmetric(vertical: 12),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        const Row(
                          children: [
                            Text('Điểm đến của bạn',
                                style: ThemeText.headingTitle),
                          ],
                        ),
                        Text(dest,
                            maxLines: 2,
                            overflow: TextOverflow.clip,
                            style: const TextStyle(
                                fontSize: 14, fontWeight: FontWeight.w500)),
                      ],
                    ),
                  )),
            ],
          ),
        ),
      ),
    );
  }
}
