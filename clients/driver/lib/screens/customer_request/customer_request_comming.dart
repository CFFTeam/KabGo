import 'package:driver/screens/home_dashboard/home_dashboard.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import '../../providers/customer_request.dart';
import '../../providers/request_status.dart';
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
    final customerRequestNotifier = ref.read(customerRequestProvider.notifier);
    final customerRequest = ref.watch(customerRequestProvider);

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
                              width: MediaQuery.of(context).size.width - 270,
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
                          const SizedBox(width: 10),
                          Text(
                              customerRequest.customer_infor.user_information
                                  .default_payment_method,
                              style: ThemeText.bookingDetails),
                          const SizedBox(width: 30),
                          // if (customerRequest.booking.promotion) const Text('Khuyến mãi', style: ThemeText.bookingDetails),
                          Text(
                              customerRequest
                                  .customer_infor.service,
                              style: ThemeText.bookingDetails),
                          // if (!customerRequest.user_information.promotion) constx SizedBox(width: 60),
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
