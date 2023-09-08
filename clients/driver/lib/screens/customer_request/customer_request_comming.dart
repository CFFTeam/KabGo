import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import '../../models/customer_booking.dart';
import '../../models/driver.dart';
import '../../models/location.dart';
import '../../models/vehicle.dart';
import '../../providers/current_location.dart';
import '../../providers/customer_request.dart';
import '../../providers/driver_provider.dart';
import '../../providers/request_status.dart';
import '../../providers/socket_provider.dart';
import 'styles.dart';

class CustomerRequestComming extends ConsumerStatefulWidget {
  const CustomerRequestComming({Key? key}) : super(key: key);

  static String name = 'CustomerRequestComming';
  static String path = '/customer/request/comming';

  @override
  ConsumerState<CustomerRequestComming> createState() =>
      _CustomerRequestCommingState();
}

class _CustomerRequestCommingState
    extends ConsumerState<CustomerRequestComming> {
  @override
  Widget build(BuildContext context) {
    final requestStatusNotifier = ref.read(requestStatusProvider.notifier);
    final currentLocation =
        ref.read(currentLocationProvider.notifier).currentLocation();

    final driverDetails = ref.read(driverDetailsProvider);

    final customerRequest = ref.watch(customerRequestProvider);
    final socketManager = ref.read(socketClientProvider.notifier);

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
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Container(
                padding: const EdgeInsets.only(left: 15, top: 24),
                child: const Text('Thông tin khách hàng',
                    style: TextStyle(
                        color: Color(0xFFFF772B),
                        fontSize: 17,
                        fontWeight: FontWeight.w700,
                        fontFamily: 'Montserrat')),
              ),
            ],
          ),
          Container(
            padding: const EdgeInsets.only(left: 15, right: 15, bottom: 9),
            child: Row(
              children: <Widget>[
                ClipRRect(
                  borderRadius: BorderRadius.circular(15),
                  child: const Image(
                    image: AssetImage("lib/assets/test/avatar.png"),
                    width: 60,
                    height: 60,
                  ),
                ),
                const SizedBox(width: 15),
                Expanded(
                  child: Column(
                    children: <Widget>[
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: <Widget>[
                          SizedBox(
                              width: MediaQuery.of(context).size.width - 230,
                              child: Text(
                                  customerRequest
                                      .customer_infor.user_information.name,
                                  style: ThemeText.customerName,
                                  overflow: TextOverflow.ellipsis)),
                          Row(
                            children: <Widget>[
                              if (customerRequest
                                      .customer_infor.user_information.rank
                                      .toLowerCase() ==
                                  'đồng')
                                const Image(
                                    image: AssetImage(
                                        'lib/assets/icons/bronze.png'),
                                    width: 20),
                              if (customerRequest
                                      .customer_infor.user_information.rank
                                      .toLowerCase() ==
                                  'bạc')
                                const Image(
                                    image: AssetImage(
                                        'lib/assets/icons/silver.png'),
                                    width: 20),
                              if (customerRequest
                                      .customer_infor.user_information.rank
                                      .toLowerCase() ==
                                  'vàng')
                                const Image(
                                    image:
                                        AssetImage('lib/assets/icons/gold.png'),
                                    width: 20),
                              if (customerRequest
                                      .customer_infor.user_information.rank
                                      .toLowerCase() ==
                                  'kim cương')
                                const Image(
                                    image: AssetImage(
                                        'lib/assets/icons/diamon.png'),
                                    width: 20),
                              const SizedBox(width: 10),
                              Text(
                                  "Hạng ${customerRequest.customer_infor.user_information.rank.toLowerCase()}",
                                  style: ThemeText.ranking),
                            ],
                          )
                        ],
                      ),
                      const SizedBox(height: 13),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: <Widget>[
                          Row(
                            children: <Widget>[
                              const Icon(FontAwesomeIcons.solidCreditCard,
                                  size: 15, color: Color(0xFFF86C1D)),
                              const SizedBox(width: 6),
                              Text(
                                  customerRequest.customer_infor
                                      .user_information.default_payment_method,
                                  style: ThemeText.bookingDetails),
                            ],
                          ),
                          const SizedBox(width: 30),
                          Row(
                            children: <Widget>[
                              const Icon(FontAwesomeIcons.taxi,
                                  size: 15, color: Color(0xFFF86C1D)),
                              const SizedBox(width: 6),
                              Text(customerRequest.customer_infor.service,
                                  style: ThemeText.bookingDetails),
                            ],
                          ),
                          // if (customerRequest.booking.promotion) const Text('Khuyến mãi', style: ThemeText.bookingDetails),
                          // if (!customerRequest.user_information.promotion) const Spacer(),
                          const Spacer(),
                        ],
                      ),
                    ],
                  ),
                )
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.only(left: 15, right: 15),
            child: Row(children: <Widget>[
              Expanded(
                child: ElevatedButton(
                    onPressed: () {
                      socketManager.publish(
                          'driver-comming',
                          jsonEncode(DriverSubmit(
                              user_id: customerRequest
                                  .customer_infor.user_information.phonenumber,
                              history_id: customerRequest.customer_infor.history_id,
                              driver: Driver(
                                  driverDetails.avatar,
                                  driverDetails.name,
                                  driverDetails.phonenumber,
                                  Vehicle(
                                      name: "Honda Wave RSX",
                                      brand: "Honda",
                                      type: "Xe máy",
                                      color: "Xanh đen",
                                      number: "68S164889"),
                                  LocationPostion(
                                      latitude: currentLocation.latitude,
                                      longitude: currentLocation.longitude),
                                  currentLocation.heading,
                                  5.0),
                              directions: []).toJson()));
                      requestStatusNotifier.commingRequest();
                      // context.go(HomeDashboard.path);
                    },
                    style: ThemeButton.acceptButton2,
                    child: const Center(
                      child: Text('ĐÃ ĐẾN ĐIỂM ĐÓN',
                          style: ThemeText.acceptButtonText),
                    )),
              ),
            ]),
          ),
          Container(
            padding: const EdgeInsets.symmetric(vertical: 20),
            decoration: BoxDecoration(
              color: const Color(0xFFFE8248),
              border: Border(
                top: BorderSide(
                  color: Colors.grey.withOpacity(0.5),
                  width: 0.5,
                ),
              ),
            ),
            child: const Center(
                child: Text('Đang đón khách',
                    style: TextStyle(
                        color: Colors.white,
                        fontSize: 17,
                        fontWeight: FontWeight.w600,
                        fontFamily: 'Montserrat'))),
          )
        ],
      ),
    );
  }
}
