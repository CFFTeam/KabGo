import 'package:flutter/material.dart';

import '../models/location_model.dart';

class RecentlyArrivalItem extends StatelessWidget {
  const RecentlyArrivalItem({super.key, required this.data});

  final LocationModel data;
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(right: 10),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                data.structuredFormatting!.mainText.toString(),
                style: Theme.of(context).textTheme.headlineMedium,
              ),
              const SizedBox(
                height: 4,
              ),
              SizedBox(
                width: 330,
                child: Text(
                  data.structuredFormatting!.secondaryText.toString(),
                  style: Theme.of(context).textTheme.headlineSmall,
                ),
              ),
            ],
          ),
          Image.asset(
            'assets/right_arrow.png',
            width: 14,
          ),
        ],
      ),
    );
  }
}
