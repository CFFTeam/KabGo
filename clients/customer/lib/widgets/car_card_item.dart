import 'package:customer/providers/coupon_provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';

import '../functions/setHexColor.dart';
import '../providers/routeProvider.dart';

class CarCardItem extends ConsumerStatefulWidget {
  const CarCardItem(
      {Key? key,
      required this.isChosen,
      required this.data,
      required this.distance})
      : super(key: key);

  final bool isChosen;
  final Map<String, String> data;
  final String distance;

  @override
  _CarCardItemState createState() => _CarCardItemState();
}

class _CarCardItemState extends ConsumerState<CarCardItem> {
  double coupon = 0;

  @override
  Widget build(BuildContext context) {
    if (widget.isChosen) {
      ref.read(routeProvider.notifier).setPrice(
          '${convertDistanceToMeters(widget.data['price/m']!, widget.distance, coupon).replaceAll(',', '.')}đ');
      ref.read(routeProvider.notifier).setService(widget.data['name']!);
    }
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 10),
      decoration: BoxDecoration(
        color: widget.isChosen ? HexColor('FFF0EA') : HexColor('FCFCFC'),
        borderRadius: const BorderRadius.all(
          Radius.circular(12),
        ),
        border: Border.all(
          width: 1,
          color: widget.isChosen ? HexColor('F86C1D') : HexColor('EEEEEE'),
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Image.asset(
            widget.data['image'].toString(),
            height: 56,
          ),
          const SizedBox(
            width: 18,
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                widget.data['name'].toString(),
                style: GoogleFonts.montserrat(
                    color: HexColor('F86C1D'),
                    fontWeight: FontWeight.w600,
                    fontSize: 16),
              ),
              const SizedBox(
                height: 4,
              ),
              Text(
                widget.data['description'].toString(),
                style: Theme.of(context).textTheme.displaySmall,
              ),
            ],
          ),
          const Spacer(),
          Consumer(
            builder: (BuildContext context, WidgetRef ref, Widget? child) {
              ref.listen(couponProvider, (previous, next) {
                print('chay vao day');
                setState(() {
                  coupon = next;
                });
              });
              return Column(
                crossAxisAlignment: CrossAxisAlignment.end,
                children: [
                  if (coupon > 0)
                    Text(
                      '${convertDistanceToMeters(widget.data['price/m']!, widget.distance, 0).replaceAll(',', '.')}đ',
                      style: GoogleFonts.montserrat(
                          decoration: TextDecoration.lineThrough,
                          color: HexColor('6A6A6A'),
                          fontWeight: FontWeight.w500,
                          fontSize: 14),
                    ),
                  if (coupon > 0)
                    const SizedBox(
                      height: 6,
                    ),
                  Text(
                    '${convertDistanceToMeters(widget.data['price/m']!, widget.distance, coupon).replaceAll(',', '.')}đ',
                    style: GoogleFonts.montserrat(
                      color: HexColor('F86C1D'),
                      fontWeight: FontWeight.w600,
                      fontSize: 18,
                    ),
                  ),
                ],
              );
            },
          ),
        ],
      ),
    );
  }

  String convertDistanceToMeters(
      String price, String distanceString, double coupon) {
    String value = '';
    double distanceValue = double.parse(distanceString.split(' ')[0]);
    String distanceUnit = distanceString.split(' ')[1];
    if (distanceUnit == 'km') {
      distanceValue *= 1000; // 1 km = 1000 m
    }

    double couponValue = coupon == 0 ? 1 : 1 - coupon;
    value = (((double.parse(widget.data['price/m'].toString()) *
                        distanceValue *
                        couponValue) /
                    1000)
                .roundToDouble() *
            1000)
        .toStringAsFixed(0);
    final formatter = NumberFormat("#,##0", "en_US");

    return formatter.format(double.parse(value));
  }
}
