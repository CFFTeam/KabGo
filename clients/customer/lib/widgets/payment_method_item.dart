import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_fonts/google_fonts.dart';

import '../functions/setHexColor.dart';

class PaymentMethodItem extends StatelessWidget {
  const PaymentMethodItem(
      {Key? key, required this.isChosen, required this.data})
      : super(key: key);

  final bool isChosen;
  final Map<String, String> data;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: double.infinity,
      height: 66,
      padding: const EdgeInsets.symmetric(horizontal: 15),
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
            width: 42,
          ),
          const SizedBox(
            width: 18,
          ),
          Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                data['name'].toString(),
                style: GoogleFonts.montserrat(
                    color: isChosen ? HexColor('F86C1D') : HexColor('6A6A6A'),
                    fontWeight: FontWeight.w600,
                    fontSize: 16),
              ),
              if (data['description'].toString().isNotEmpty)
                Column(
                  children: [
                    const SizedBox(
                      height: 4,
                    ),
                    Text(
                      data['description'].toString(),
                      style: Theme.of(context).textTheme.displaySmall,
                    ),
                  ],
                ),
            ],
          ),
          const Spacer(),
          isChosen
              ? FaIcon(
                  FontAwesomeIcons.solidCircleCheck,
                  color: HexColor('F86C1D'),
                )
              : FaIcon(
                  FontAwesomeIcons.circle,
                  color: HexColor('A6A6A6'),
                )
        ],
      ),
    );
  }
}
