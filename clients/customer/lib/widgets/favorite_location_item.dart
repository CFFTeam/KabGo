import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class FavoriteLocationItem extends StatelessWidget {
  const FavoriteLocationItem({super.key, required this.data});
  final Map<String, Object> data;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Container(
          // height: 70,
          width: 82,
          decoration: BoxDecoration(
            color: const Color.fromARGB(255, 249, 249, 249),
            border: Border.all(
                width: 1, color: const Color.fromARGB(255, 242, 242, 242)),
            borderRadius: const BorderRadius.all(
              Radius.circular(10),
            ),
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              data['icon'] as Widget,
              const SizedBox(
                height: 7,
              ),
              Text(
                data['title'].toString(),
                style: GoogleFonts.montserrat(
                  fontWeight: FontWeight.w500,
                  fontSize: 15,
                  color: const Color.fromARGB(255, 106, 106, 106),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(
          width: 17,
        ),
      ],
    );
  }
}
