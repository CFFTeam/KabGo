import 'package:driver/screens/home_dashboard/home_dashboard.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:go_router/go_router.dart';

import '../../providers/customer_request.dart';
import 'styles.dart';

class CustomerRequestAccept extends ConsumerStatefulWidget {
  const CustomerRequestAccept({Key? key}) : super(key: key);

  static String name = 'CustomerRequestAccept';
  static String path = '/customer/request/accept';

  @override
  ConsumerState<CustomerRequestAccept> createState() => _CustomerRequestAcceptState();
}

class _CustomerRequestAcceptState extends ConsumerState<CustomerRequestAccept> {
  @override
  Widget build(BuildContext context) {
    final customerRequestNotifier = ref.read(customerRequestProvider.notifier);
    final customerRequest = ref.read(customerRequestProvider);

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 25),
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
                            width: MediaQuery.of(context).size.width - 270,
                            child: Text(customerRequest.customer_infor.user_information.name,
                                style: ThemeText.customerName,
                                overflow: TextOverflow.ellipsis)),
                        Row(
                          children: <Widget>[
                            // Image(
                            //     image: AssetImage(
                            //         'lib/assets/icons/${customerRequest.customer_infor.user_information.rank}.png'),
                            //     width: 20),
                            const SizedBox(width: 20),
                            const SizedBox(width: 10),
                            Text(customerRequest.customer_infor.user_information.rank, style: ThemeText.ranking),
                          ],
                        )
                      ],
                    ),
                    const SizedBox(height: 13),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: <Widget>[
                        Text(customerRequest.customer_infor.user_information.default_payment_method, style: ThemeText.bookingDetails),
                        // if (customerRequest.customer_infor.user_information.promotion) const Text('Khuyến mãi', style: ThemeText.bookingDetails),
                        Text(customerRequest.customer_infor.user_information.type, style: ThemeText.bookingDetails),
                        // if (!customerRequest.customer_infor.user_information.promotion) const SizedBox(width: 60),
                        const SizedBox(width: 60),
                      ],
                    )
                  ],
                ),
              ) 
            ],
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: <Widget>[
              Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: <Widget>[
                  const Icon(FontAwesomeIcons.mapPin,
                      size: 23, color: Color(0xFFF86C1D)),
                  const SizedBox(width: 6),
                  Text('Cách bạn ${customerRequest.duration_distance}',
                      style: ThemeText.locationDurationDetails),
                ],
              ),
              Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: <Widget>[
                  const Icon(FontAwesomeIcons.locationArrow,
                      size: 23, color: Color(0xFFF86C1D)),
                  const SizedBox(width: 6),
                  Text('Lộ trình ${customerRequest.customer_infor.distance}',
                      style: ThemeText.locationDurationDetails),
                ],
              ),
              Row(
                crossAxisAlignment: CrossAxisAlignment.center,
                children: <Widget>[
                  const Icon(FontAwesomeIcons.clock,
                      size: 21, color: Color(0xFFF86C1D)),
                  const SizedBox(width: 8),
                  Text(customerRequest.customer_infor.time, style: ThemeText.locationDurationDetails),
                ],
              ),
            ],
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              const Text('Thông tin hành trình', style: ThemeText.headingTitle),
              const SizedBox(height: 16),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: <Widget>[
                  const Padding(
                    padding: EdgeInsets.only(top: 6),
                    child: Image(
                        image: AssetImage('lib/assets/icons/locations.png'),
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
                          customerRequest.customer_infor.departure_information.address,
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
                          customerRequest.customer_infor.arrival_information.address,
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
          Row(children: <Widget>[
            Expanded(
                child: ElevatedButton(
              onPressed: () {
                customerRequestNotifier.cancelRequest();
                context.go(HomeDashboard.path);
              },
              style: ThemeButton.cancelButton,
              child: const Text('TỪ CHỐI', style: ThemeText.cancelButtonText),
            )),
            const SizedBox(width: 16),
            Expanded(
              child: ElevatedButton(
                onPressed: () {
                  customerRequestNotifier.commingRequest();
                  // context.go(HomeDashboard.path);
                },
                style: ThemeButton.acceptButton2,
                child: const Center(
                  child: Text('CHẤP NHẬN', style: ThemeText.acceptButtonText),
                )
              ),
            ),
          ])
        ],
      ),
    );
  }
}
