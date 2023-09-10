import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import '../functions/setHexColor.dart';
import '../providers/paymentProvider.dart';

class DiscountItem extends ConsumerWidget {
  const DiscountItem(
      {Key? key, required this.data, required this.chooseDiscount})
      : super(key: key);

  final Map<String, String> data;
  final void Function() chooseDiscount;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Container(
      padding: const EdgeInsets.fromLTRB(15, 12, 15, 0),
      decoration: BoxDecoration(
        color: HexColor('FCFCFC'),
        borderRadius: const BorderRadius.all(
          Radius.circular(12),
        ),
        border: Border.all(
          width: 1,
          color: HexColor('EEEEEE'),
        ),
      ),
      child: Column(
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                data['name']!,
                style: const TextStyle(
                    color: Color.fromARGB(255, 82, 82, 82),
                    fontWeight: FontWeight.w700,
                    fontSize: 15),
              ),
              Text(
                data['time']!,
                style: const TextStyle(
                    color: Color.fromARGB(255, 82, 82, 82),
                    fontWeight: FontWeight.w700,
                    fontSize: 13),
              ),
            ],
          ),
          const SizedBox(
            height: 10,
          ),
          Text(
            data['content']!,
            style: const TextStyle(fontSize: 13),
          ),
          const SizedBox(
            height: 12,
          ),
          Image.asset('lib/assets/discount_item_line.png'),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Row(
                children: [
                  FaIcon(
                    FontAwesomeIcons.solidClock,
                    color: HexColor('FE8248'),
                  ),
                  const SizedBox(
                    width: 10,
                  ),
                  Text(
                    data['duration']!,
                    style: const TextStyle(
                      fontWeight: FontWeight.w700,
                      color: Color.fromARGB(255, 82, 82, 82),
                    ),
                  ),
                ],
              ),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  minimumSize: Size.zero, // Set this
                  shape: const StadiumBorder(),
                  padding: const EdgeInsets.symmetric(
                    horizontal: 18,
                    vertical: 8,
                  ),
                ),
                onPressed: () {
                  ref.read(paymentProvider.notifier).setDiscount(data['name']!);
                  chooseDiscount();
                },
                child: const Text(
                  'Áp dụng',
                  style: TextStyle(
                      color: Colors.white,
                      fontSize: 14,
                      fontWeight: FontWeight.w500),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
