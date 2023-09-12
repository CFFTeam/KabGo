import 'package:customer/providers/routeProvider.dart';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import '../../functions/setHexColor.dart';
import '../../utils/Google_Api_Key.dart';
import '../../widgets/discount_item.dart';

class DiscountPage extends ConsumerStatefulWidget {
  const DiscountPage({Key? key, required this.chooseItem}) : super(key: key);

  final void Function(String value) chooseItem;

  @override
  _DiscountPageState createState() => _DiscountPageState();
}

class _DiscountPageState extends ConsumerState<DiscountPage> {
  dynamic listCoupon = [];
  void getDiscountList() async {
    var dio = Dio();
    var response = await dio.request(
      'http://$ip:4600/v1/customer/get_coupon',
      options: Options(
        method: 'GET',
      ),
    );

    if (response.statusCode == 200) {
      // print(response.data['data']);
      setState(() {
        listCoupon = response.data['data'];
      });
    } else {
      print(response.statusMessage);
    }
  }

  @override
  void initState() {
    // TODO: implement initState
    getDiscountList();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 600,
      padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 15),
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(20),
          topRight: Radius.circular(20),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'Danh sách ưu đãi',
                style: Theme.of(context).textTheme.bodySmall,
              ),
              const Spacer(),
              InkWell(
                onTap: () {
                  Navigator.pop(context);
                },
                child: FaIcon(
                  FontAwesomeIcons.xmark,
                  size: 28,
                  color: HexColor('fe8248'),
                ),
              ),
            ],
          ),
          const SizedBox(
            height: 24,
          ),
          listCoupon.length > 0
              ? Expanded(
                  child: ListView.builder(
                    padding: const EdgeInsets.all(0),
                    itemCount: listCoupon.length,
                    itemBuilder: (context, index) => Column(
                      children: [
                        DiscountItem(
                          data: listCoupon[index],
                          chooseDiscount: () {
                            widget.chooseItem(listCoupon[index]['name']);
                            ref
                                .read(routeProvider.notifier)
                                .setCoupon(listCoupon[index]['_id']);
                            Navigator.pop(context);
                          },
                        ),
                        const SizedBox(
                          height: 15,
                        ),
                      ],
                    ),
                  ),
                )
              : Expanded(
                  child: Center(
                      child: CircularProgressIndicator(
                  color: HexColor('FE8248'),
                ))),
        ],
      ),
    );
  }
}
