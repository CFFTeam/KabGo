import 'dart:convert';

import 'package:driver/widgets/icon_button/icon_button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import 'package:driver/models/customer_booking.dart';
import 'package:driver/models/driver.dart';
import 'package:driver/models/location.dart';
import 'package:driver/models/vehicle.dart';
import 'package:driver/providers/current_location.dart';
import 'package:driver/providers/customer_request.dart';
import 'package:driver/providers/driver_provider.dart';
import 'package:driver/providers/request_status.dart';
import 'package:driver/providers/socket_provider.dart';
import 'package:go_router/go_router.dart';
import 'styles.dart';

class CustomerRequestReady extends ConsumerStatefulWidget {
  const CustomerRequestReady({Key? key}) : super(key: key);

  static String name = 'CustomerRequestReady';
  static String path = '/customer/request/ready';

  @override
  ConsumerState<CustomerRequestReady> createState() =>
      _CustomerRequestReadyState();
}

class _CustomerRequestReadyState extends ConsumerState<CustomerRequestReady> {
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
      child: SingleChildScrollView(
        child: SizedBox(
          height: 700,
          child: Column(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              Container(
                padding: const EdgeInsets.only(
                    left: 16, right: 16, bottom: 0, top: 24),
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
                                  width:
                                      MediaQuery.of(context).size.width - 230,
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
                                        image: AssetImage(
                                            'lib/assets/icons/gold.png'),
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
                                      customerRequest
                                          .customer_infor
                                          .user_information
                                          .default_payment_method,
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
                padding: const EdgeInsets.only(left: 20, right: 20),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: <Widget>[
                    const Row(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: <Widget>[
                        Icon(FontAwesomeIcons.mapPin,
                            size: 23, color: Color(0xFFF86C1D)),
                        SizedBox(width: 6),
                        Text('Bạn đã đến nơi',
                            style: ThemeText.locationDurationDetails),
                      ],
                    ),
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: <Widget>[
                        const Icon(FontAwesomeIcons.locationArrow,
                            size: 23, color: Color(0xFFF86C1D)),
                        const SizedBox(width: 6),
                        Text(
                            'Lộ trình ${customerRequest.customer_infor.distance}',
                            style: ThemeText.locationDurationDetails),
                      ],
                    ),
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: <Widget>[
                        const Icon(FontAwesomeIcons.solidClock,
                            size: 19, color: Color(0xFFF86C1D)),
                        const SizedBox(width: 8),
                        Text(customerRequest.customer_infor.time,
                            style: ThemeText.locationDurationDetails),
                      ],
                    ),
                  ],
                ),
              ),
              Container(
                padding: const EdgeInsets.only(left: 18, right: 18),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    const Text('Thông tin hành trình',
                        style: ThemeText.headingTitle),
                    const SizedBox(height: 16),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: <Widget>[
                        const Padding(
                          padding: EdgeInsets.only(top: 6),
                          child: Image(
                              image:
                                  AssetImage('lib/assets/icons/locations.png'),
                              width: 36),
                        ),
                        Column(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          crossAxisAlignment: CrossAxisAlignment.center,
                          children: <Widget>[
                            Container(
                              padding: const EdgeInsets.symmetric(
                                  vertical: 12, horizontal: 16),
                              decoration: BoxDecoration(
                                color: const Color(0xFFF9F9F9),
                                border: Border.all(
                                  color: const Color(0xFFF2F2F2),
                                  width: 1,
                                ),
                                borderRadius: BorderRadius.circular(8),
                              ),
                              width: MediaQuery.of(context).size.width - 88,
                              child: Text(
                                customerRequest.customer_infor
                                    .departure_information.address,
                                style: ThemeText.locationDetails,
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                            const SizedBox(height: 15),
                            Container(
                              padding: const EdgeInsets.symmetric(
                                  vertical: 12, horizontal: 16),
                              decoration: BoxDecoration(
                                color: const Color(0xFFF9F9F9),
                                border: Border.all(
                                  color: const Color(0xFFF2F2F2),
                                  width: 1,
                                ),
                                borderRadius: BorderRadius.circular(8),
                              ),
                              width: MediaQuery.of(context).size.width - 88,
                              child: Text(
                                customerRequest
                                    .customer_infor.arrival_information.address,
                                style: ThemeText.locationDetails,
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              Container(
                padding: const EdgeInsets.only(left: 18, right: 18),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    const Text('Liên hệ khách hàng',
                        style: ThemeText.headingTitle),
                    const SizedBox(height: 20),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: <Widget>[
                        CIconButton(
                          onPressed: () {},
                          icon: const Icon(FontAwesomeIcons.solidCommentDots),
                          foregroundColor: const Color(0xFFF86C1D),
                          backgroundColor: const Color(0xFFF8F8F8),
                          padding: const EdgeInsets.all(20),
                          borderSide: const BorderSide(
                            color: Color(0xFFF5F5F5),
                            width: 1,
                          ),
                        ),
                        CIconButton(
                          onPressed: () {},
                          icon: const Icon(FontAwesomeIcons.phone),
                          foregroundColor: const Color(0xFFF86C1D),
                          backgroundColor: const Color(0xFFF8F8F8),
                          padding: const EdgeInsets.all(20),
                          borderSide: const BorderSide(
                            color: Color(0xFFF5F5F5),
                            width: 1,
                          ),
                        ),
                        CIconButton(
                          onPressed: () {},
                          icon: Image.asset('lib/assets/icons/sms.png',
                              width: 24),
                          foregroundColor: const Color(0xFFF86C1D),
                          backgroundColor: const Color(0xFFF8F8F8),
                          padding: const EdgeInsets.all(20),
                          borderSide: const BorderSide(
                            color: Color(0xFFF5F5F5),
                            width: 1,
                          ),
                        ),
                      ],
                    )
                  ],
                ),
              ),
              Container(
                padding: const EdgeInsets.only(left: 18, right: 18),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    const Text('Cước phí hành trình',
                        style: ThemeText.headingTitle),
                    const SizedBox(height: 16),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: <Widget>[
                        Row(
                          children: <Widget>[
                            const Image(
                                image: AssetImage('lib/assets/icons/sale.png'),
                                width: 27),
                            const SizedBox(width: 9),
                            SizedBox(
                                width: MediaQuery.of(context).size.width - 250,
                                child: const Text(
                                  'Không có ưu đãi được áp dụng',
                                  // 'Giảm 20% tối đa 25k cho cước xe từ 9h đến 20h',
                                  style: ThemeText.saleText,
                                  overflow: TextOverflow.ellipsis,
                                )),
                          ],
                        ),
                        Text(
                          customerRequest.customer_infor.price,
                          style: ThemeText.priceText,
                        )
                      ],
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
                              'driver-ready',
                              jsonEncode(DriverSubmit(
                                  user_id: customerRequest.customer_infor
                                      .user_information.phonenumber,
                                  history_id:
                                      customerRequest.customer_infor.history_id,
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

                          requestStatusNotifier.ongoingRequest();
                          context.go('/customer/request/going');
                          
                          // socketManager.publish(
                          //     'driver-comming',
                          //     jsonEncode(DriverSubmit(
                          //         user_id: customerRequest
                          //             .customer_infor.user_information.phonenumber,
                          //         history_id: customerRequest.customer_infor.history_id,
                          //         driver: Driver(
                          //             driverDetails.avatar,
                          //             driverDetails.name,
                          //             driverDetails.phonenumber,
                          //             Vehicle(
                          //                 name: "Honda Wave RSX",
                          //                 brand: "Honda",
                          //                 type: "Xe máy",
                          //                 color: "Xanh đen",
                          //                 number: "68S164889"),
                          //             LocationPostion(
                          //                 latitude: currentLocation.latitude,
                          //                 longitude: currentLocation.longitude),
                          //             currentLocation.heading,
                          //             5.0),
                          //         directions: []).toJson()));
                        },
                        style: ThemeButton.acceptButton2,
                        child: const Center(
                          child: Text('BẮT ĐẦU HÀNH TRÌNH',
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
        ),
      ),
    );
  }
}
