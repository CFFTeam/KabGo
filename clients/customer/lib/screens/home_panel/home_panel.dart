import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../data/data.dart';
import '../../functions/setHexColor.dart';
import '../../widgets/recently_arrival_item.dart';

class HomePanel extends ConsumerWidget {
  const HomePanel({Key? key, required this.findArrival}) : super(key: key);

  final void Function(BuildContext context) findArrival;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    print('===========> HOME_PANEL BUILD');

    return Container(
      decoration: const BoxDecoration(
        color: Color.fromARGB(255, 255, 255, 255),
        borderRadius: BorderRadius.vertical(
          top: Radius.circular(20),
        ),
        boxShadow: [
          BoxShadow(
            color: Color.fromARGB(80, 190, 190, 190),
            spreadRadius: 2,
            blurRadius: 5,
            offset: Offset(1, 0),
          ),
        ],
      ),
      padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 12),
      width: MediaQuery.of(context).size.width,
      height: 215,
      // alignment: Alignment.topLeft,
      child: Column(
        // mainAxisAlignment: MainAxisAlignment.start,
        // mainAxisSize: MainAxisSize.min,
        children: [
          Center(
            child: Container(
              width: 50,
              height: 4,
              decoration: BoxDecoration(
                color: HexColor('D9D9D9'),
                borderRadius: const BorderRadius.all(
                  Radius.circular(50),
                ),
              ),
            ),
          ),
          const SizedBox(
            height: 24,
          ),
          ///////////////////////////////////////////////////// LOCATION INPUT
          Align(
            alignment: Alignment.topLeft,
            child: Text(
              'Bạn đang muốn đến đâu?',
              style: Theme.of(context).textTheme.titleLarge,
              textAlign: TextAlign.start,
            ),
          ),
          const SizedBox(
            height: 14,
          ),
          Text(
            'Chọn điểm bạn muốn đến để chúng tôi giúp bạn thực hiện việc đặt xe',
            style: Theme.of(context).textTheme.bodyMedium,
          ),
          const SizedBox(
            height: 36,
          ),
          SizedBox(
            width: double.infinity,
            height: 54,
            child: ElevatedButton(
              onPressed: () {
                findArrival(context);
              },
              child: Text('chọn điểm đến'.toUpperCase(),
                  style: Theme.of(context).textTheme.labelMedium),
            ),
          ),
          const SizedBox(
            height: 36,
          ),
          Align(
            alignment: Alignment.centerLeft,
            child: Text(
              'Các điểm đến gần đây',
              style: Theme.of(context).textTheme.titleMedium,
            ),
          ),
          const SizedBox(
            height: 20,
          ),
          Align(
            alignment: Alignment.centerLeft,
            child: Column(
              children: [
                ...recentlyArrivalData.map(
                  (e) => Column(
                    children: [
                      RecentlyArrivalItem(data: e),
                      const SizedBox(
                        height: 20,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
