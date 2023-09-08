import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../providers/mapProvider.dart';
import '../../providers/stepProvider.dart';
import '../find_arrival_page/find_arrival_page.dart';

class HomePanel extends ConsumerWidget {
  const HomePanel({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    print('===========> HOME_PANEL BUILD');

    // SocketClient socketClient = ref.read(socketClientProvider.notifier);
    // socketClient.subscribe('dat xe', (dynamic value) {
    //   print(value);
    // });

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
      padding: const EdgeInsets.fromLTRB(15, 24, 15, 30),
      width: MediaQuery.of(context).size.width,
      height: 215,
      // alignment: Alignment.topLeft,
      child: Column(
        // mainAxisAlignment: MainAxisAlignment.start,
        // mainAxisSize: MainAxisSize.min,
        children: [
          // Center(
          //   child: Container(
          //     width: 50,
          //     height: 4,
          //     decoration: BoxDecoration(
          //       color: HexColor('D9D9D9'),
          //       borderRadius: const BorderRadius.all(
          //         Radius.circular(50),
          //       ),
          //     ),
          //   ),
          // ),
          // const SizedBox(
          //   height: 24,
          // ),
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
          // const SizedBox(
          //   height: 36,
          // ),
          const Spacer(),
          SizedBox(
            width: double.infinity,
            height: 54,
            child: ElevatedButton(
              onPressed: () {
                ref.read(stepProvider.notifier).setStep('find_arrival');
                ref
                    .read(mapProvider.notifier)
                    .setMapAction('FIND_ARRIVAL_LOCATION');
                Navigator.push(
                  context,
                  PageRouteBuilder(
                    transitionDuration: const Duration(milliseconds: 400),
                    pageBuilder: (context, animation, secondaryAnimation) =>
                        const FindArrivalPage(),
                    transitionsBuilder:
                        (context, animation, secondaryAnimation, child) {
                      const begin = Offset(0.0, 1.0);
                      const end = Offset.zero;

                      final tween = Tween(begin: begin, end: end);

                      return SlideTransition(
                        position: tween.animate(animation),
                        child: child,
                      );
                    },
                  ),
                );
              },
              child: Text('chọn điểm đến'.toUpperCase(),
                  style: Theme.of(context).textTheme.labelMedium),
            ),
          ),
          // const SizedBox(
          //   height: 36,
          // ),
          // Align(
          //   alignment: Alignment.centerLeft,
          //   child: Text(
          //     'Các điểm đến gần đây',
          //     style: Theme.of(context).textTheme.titleMedium,
          //   ),
          // ),
          // const SizedBox(
          //   height: 20,
          // ),
          // Align(
          //   alignment: Alignment.centerLeft,
          //   child: Column(
          //     children: [
          //       ...recentlyArrivalData.map(
          //         (e) => Column(
          //           children: [
          //             RecentlyArrivalItem(data: e),
          //             const SizedBox(
          //               height: 20,
          //             ),
          //           ],
          //         ),
          //       ),
          //     ],
          //   ),
          // ),
        ],
      ),
    );
  }
}
