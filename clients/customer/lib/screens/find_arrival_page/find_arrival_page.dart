import 'package:customer_app/providers/mapProvider.dart';
import 'package:customer_app/providers/stepProvider.dart';
import 'package:customer_app/widgets/input_custom.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../../data/data.dart';
import '../../functions/setHexColor.dart';
import '../../models/location_model.dart';
import '../../providers/arrivalLocationProvider.dart';
import '../../widgets/favorite_location_item.dart';
import '../../widgets/recently_arrival_item.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class FindArrivalPage extends ConsumerWidget {
  const FindArrivalPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    print('===========> FIND_ARRIVAL_PAGE BUILD');

    void chooseArrival(LocationModel value) {
      ref.read(arrivalLocationProvider.notifier).setArrivalLocation(value);
      ref.read(mapProvider.notifier).setMapAction('GET_DEPARTURE_LOCATION');
      ref.read(stepProvider.notifier).setStep('choose_departure');
      Navigator.pop(context);
    }

    String departureValue = ref.read(arrivalLocationProvider).placeId != null
        ? ref.read(arrivalLocationProvider).structuredFormatting!.mainText!
        : '';

    return Scaffold(
      appBar: AppBar(
        title: Text('Chọn điểm đến',
            style: Theme.of(context).textTheme.titleLarge),
        elevation: 0,
        leading: IconButton(
          onPressed: () {
            Navigator.pop(context);
            ref.read(stepProvider.notifier).setStep('home');
            ref.read(mapProvider.notifier).setMapAction('SET_DEFAULT');
          },
          icon: FaIcon(
            FontAwesomeIcons.arrowLeft,
            color: HexColor('FE8248'),
          ),
        ),
      ),
      body: Container(
        padding: const EdgeInsets.symmetric(vertical: 5, horizontal: 15),
        color: Colors.white,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Image.asset(
                  'assets/arrival_icon.png',
                  width: 36,
                ),
                const SizedBox(
                  width: 10,
                ),
                Expanded(
                  child: InputCustom(
                    placeHolder: 'Nhập điểm đến...',
                    value: departureValue,
                    choosePoint: chooseArrival,
                  ),
                )
              ],
            ),
            const SizedBox(
              height: 32,
            ),
            /////////////////////////////////////////////////// FAVORITE ARRIVAL
            Text(
              'Các địa điểm yêu thích',
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(
              height: 16,
            ),
            SizedBox(
              width: double.infinity,
              height: 80,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                itemCount: favoriteLocationData.length,
                itemBuilder: (context, index) => FavoriteLocationItem(
                  data: favoriteLocationData[index],
                ),
              ),
            ),
            const SizedBox(
              height: 32,
            ),
            Text(
              'Các điểm đến gần đây',
              style: Theme.of(context).textTheme.titleMedium,
            ),
            const SizedBox(
              height: 16,
            ),
            Expanded(
              child: ListView.builder(
                itemCount: recentlyArrivalData.length,
                itemBuilder: (context, index) => Column(
                  children: [
                    RecentlyArrivalItem(
                      data: recentlyArrivalData[index],
                    ),
                    const SizedBox(
                      height: 20,
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
