import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../../data/data.dart';
import '../../functions/setAddressByPosition.dart';
import '../../functions/setHexColor.dart';
import '../../models/location_model.dart';
import '../../providers/arrivalLocationProvider.dart';
import '../../providers/bookingHistoryProvider.dart';
import '../../providers/currentLocationProvider.dart';
import '../../providers/departureLocationProvider.dart';
import '../../providers/locationPickerInMap.dart';
import '../../providers/mapProvider.dart';
import '../../providers/stepProvider.dart';
import '../../widgets/favorite_location_item.dart';
import '../../widgets/input_custom.dart';
import '../../widgets/recently_arrival_item.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class FindArrivalPage extends ConsumerWidget {
  const FindArrivalPage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    print('===========> FIND_ARRIVAL_PAGE BUILD');

    List<LocationModel> bookingHistory = ref.read(bookingHistoryProvider);

    void chooseArrival() {
      ref.read(stepProvider.notifier).setStep('choose_departure');
      ref
          .read(mapProvider.notifier)
          .setMapAction('GET_CURRENT_DEPARTURE_LOCATION');

      Navigator.pop(context);
    }

    String departureValue = ref.read(arrivalLocationProvider).placeId != null
        ? ref.read(arrivalLocationProvider).structuredFormatting!.mainText!
        : '';

    return Scaffold(
      resizeToAvoidBottomInset: false,
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
        padding: const EdgeInsets.fromLTRB(15, 5, 15, 0),
        color: Colors.white,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Image.asset(
                  'lib/assets/arrival_icon.png',
                  width: 36,
                ),
                const SizedBox(
                  width: 10,
                ),
                Expanded(
                  child: InputCustom(
                    placeHolder: 'Nhập điểm đến...',
                    value: departureValue,
                    choosePoint: (value) {
                      ref
                          .read(arrivalLocationProvider.notifier)
                          .setArrivalLocation(value);
                      chooseArrival();
                    },
                  ),
                )
              ],
            ),
            const SizedBox(
              height: 10,
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    minimumSize: Size.zero, // Set this
                    shape: const StadiumBorder(),
                    padding: const EdgeInsets.symmetric(
                      horizontal: 15,
                      vertical: 9,
                    ),
                  ),
                  onPressed: () {
                    Navigator.pop(context);
                    ref
                        .read(mapProvider.notifier)
                        .setMapAction('LOCATION_PICKER');
                    ref.read(stepProvider.notifier).setStep('location_picker');
                    ref
                        .read(pickerLocationProvider.notifier)
                        .setPickerLocation(ref.read(departureLocationProvider));
                  },
                  icon: const FaIcon(
                    FontAwesomeIcons.mapLocationDot,
                    color: Colors.white,
                    size: 18,
                  ),
                  label: const Text(
                    'Chọn trên bản đồ',
                    style: TextStyle(
                        color: Colors.white,
                        fontSize: 13,
                        fontWeight: FontWeight.w500),
                  ),
                ),
                ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    minimumSize: Size.zero, // Set this
                    shape: const StadiumBorder(),
                    padding: const EdgeInsets.symmetric(
                      horizontal: 15,
                      vertical: 9,
                    ),
                  ),
                  onPressed: () async {
                    LocationModel currentLocationModel =
                        await setAddressByPosition(
                            ref.read(currentLocationProvider));
                    ref
                        .read(arrivalLocationProvider.notifier)
                        .setArrivalLocation(currentLocationModel);
                    chooseArrival();
                  },
                  icon: const FaIcon(
                    FontAwesomeIcons.locationCrosshairs,
                    color: Colors.white,
                    size: 18,
                  ),
                  label: const Text(
                    'Lấy vị trí hiện tại',
                    style: TextStyle(
                        color: Colors.white,
                        fontSize: 13,
                        fontWeight: FontWeight.w500),
                  ),
                )
              ],
            ),
            const SizedBox(height: 20),
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
                itemCount: bookingHistory.length,
                itemBuilder: (context, index) => Column(
                  children: [
                    InkWell(
                      onTap: () {
                        ref
                            .read(arrivalLocationProvider.notifier)
                            .setArrivalLocation(bookingHistory[index]);
                        chooseArrival();
                      },
                      child: RecentlyArrivalItem(
                        data: bookingHistory[index],
                      ),
                    ),
                    const SizedBox(
                      height: 20,
                    ),
                  ],
                ),
              ),
            ),
            const SizedBox(
              height: 75,
            ),
          ],
        ),
      ),
    );
  }
}
