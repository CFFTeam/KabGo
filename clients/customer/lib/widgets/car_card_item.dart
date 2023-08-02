import 'package:customer_app/functions/setHexColor.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class CarCardItem extends StatelessWidget {
  const CarCardItem({Key? key, required this.isChosen, required this.data})
      : super(key: key);

  final bool isChosen;
  final Map<String, String> data;

  @override
  Widget build(BuildContext context) {
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
            data['price'].toString(),
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
}
