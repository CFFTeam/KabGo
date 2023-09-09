import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import '../models/location_model.dart';

class RecentlyArrivalItem extends StatelessWidget {
  const RecentlyArrivalItem({super.key, required this.data});

  final LocationModel data;
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(right: 10),
      child: Row(
        // mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          Image.asset(
            'lib/assets/arrival_icon.png',
            width: 24,
          ),
          const SizedBox(
            width: 16,
          ),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(
                width: 295,
                child: Text(
                  data.structuredFormatting!.mainText.toString(),
                  style: Theme.of(context).textTheme.headlineMedium,
                  overflow: TextOverflow.ellipsis,
                ),
              ),
              const SizedBox(
                height: 4,
              ),
              SizedBox(
                width: 295,
                child: Text(
                  '${data.structuredFormatting!.mainText.toString()}, ${data.structuredFormatting!.secondaryText.toString()}',
                  style: Theme.of(context).textTheme.headlineSmall,
                ),
              ),
            ],
          ),
          const SizedBox(
            width: 20,
          ),
          const FaIcon(
            FontAwesomeIcons.arrowRight,
            color: Color.fromARGB(255, 166, 166, 166),
            size: 18,
          ),
        ],
      ),
    );
  }
}
