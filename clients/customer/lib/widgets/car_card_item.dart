import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:intl/intl.dart';

import '../functions/setHexColor.dart';
import '../providers/routeProvider.dart';

class CarCardItem extends ConsumerWidget {
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
  Widget build(BuildContext context, WidgetRef ref) {
    if (isChosen) {
      ref.read(routeProvider.notifier).setPrice(
          '${convertDistanceToMeters(data['price/m']!, distance).replaceAll(',', '.')}đ');
      ref.read(routeProvider.notifier).setService(data['name']!);
    }
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 10),
      decoration: BoxDecoration(
        color: isChosen ? HexColor('FFF0EA') : HexColor('FCFCFC'),
        borderRadius: const BorderRadius.all(
          Radius.circular(12),
        ),
        border: Border.all(
          width: 1,
          color: isChosen ? HexColor('F86C1D') : HexColor('EEEEEE'),
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Image.asset(
            data['image'].toString(),
            height: 56,
          ),
          const SizedBox(
            width: 18,
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                data['name'].toString(),
                style: GoogleFonts.montserrat(
                    color: HexColor('F86C1D'),
                    fontWeight: FontWeight.w600,
                    fontSize: 16),
              ),
              const SizedBox(
                height: 4,
              ),
              Text(
                data['description'].toString(),
                style: Theme.of(context).textTheme.displaySmall,
              ),
            ],
          ),
          const Spacer(),
          Text(
            '${convertDistanceToMeters(data['price/m']!, distance).replaceAll(',', '.')}đ',
            style: GoogleFonts.montserrat(
              color: HexColor('F86C1D'),
              fontWeight: FontWeight.w600,
              fontSize: 18,
            ),
          ),
        ],
      ),
    );
  }

  String convertDistanceToMeters(String price, String distanceString) {
    String value = '';
    double distanceValue = double.parse(distanceString.split(' ')[0]);
    String distanceUnit = distanceString.split(' ')[1];
    if (distanceUnit == 'km') {
      distanceValue *= 1000; // 1 km = 1000 m
    }
    value = (((double.parse(data['price/m'].toString()) * distanceValue) / 1000)
                .roundToDouble() *
            1000)
        .toStringAsFixed(0);
    final formatter = NumberFormat("#,##0", "en_US");

    return formatter.format(double.parse(value));
  }
}
