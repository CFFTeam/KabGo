import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import '../../data/data.dart';
import '../../functions/setAddressByPosition.dart';
import '../../functions/setHexColor.dart';
import '../../models/location_model.dart';
import '../../providers/arrivalLocationProvider.dart';
import '../../providers/auth_provider.dart';
import '../../providers/bookingHistoryProvider.dart';
import '../../providers/currentLocationProvider.dart';
import '../../providers/departureLocationProvider.dart';
import '../../providers/locationPickerInMap.dart';
import '../../providers/mapProvider.dart';
import '../../providers/stepProvider.dart';
import '../../utils/Google_Api_Key.dart';
import '../../widgets/favorite_location_item.dart';
import '../../widgets/input_custom.dart';
import '../../widgets/recently_arrival_item.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class FindArrivalPage extends ConsumerStatefulWidget {
  const FindArrivalPage({Key? key}) : super(key: key);

  @override
  _FindArrivalPageState createState() => _FindArrivalPageState();
}

class _FindArrivalPageState extends ConsumerState<FindArrivalPage> {
  List<LocationModel> bookingHistoryList = [];
  void bookingHistory() async {
    final authState = ref.read(authProvider);
    var dio = Dio();
    var response = await dio.request(
      'http://$ip:4100/v1/customer-auth/get-booking-history',
      data: json.encode({
        'email': authState.value!.email,
      }),
      options: Options(
        method: 'POST',
      ),
    );

    if (response.statusCode == 200) {
      bookingHistoryList = [];
      for (var entry in response.data!['history']) {
        int firstCommaIndex = entry['destination']['address'].indexOf(',');
        StructuredFormatting structuredFormatting = StructuredFormatting(
            mainText: entry['destination']['address']
                .substring(0, firstCommaIndex)
                .trim(),
            secondaryText: entry['destination']['address']
                .substring(firstCommaIndex + 1)
                .trim());
        structuredFormatting.formatSecondaryText();
        LocationModel locationModel = LocationModel(
            placeId: '',
            structuredFormatting: structuredFormatting,
            postion: LatLng(entry['destination']['latitude'],
                entry['destination']['longitude']));
        bookingHistoryList.add(locationModel);
      }
      setState(() {});
    } else {
      print(response.statusMessage);
    }
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    bookingHistory();
  }

  @override
  Widget build(BuildContext context) {
    print('===========> FIND_ARRIVAL_PAGE BUILD');

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
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: Text('Chọn điểm đến',
            style: Theme.of(context).textTheme.titleLarge),
        elevation: 0,
        shadowColor: Colors.transparent,
        surfaceTintColor: Colors.transparent,
        backgroundColor: Colors.transparent,
        scrolledUnderElevation: 0.0,
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
            const SizedBox(height: 12),
            /////////////////////////////////////////////////// FAVORITE ARRIVAL
            Row(
              children: [
                Text(
                  'Các địa điểm yêu thích',
                  style: Theme.of(context).textTheme.titleMedium,
                ),
                const Spacer(),
                ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    minimumSize: Size.zero, // Set this
                    shape: const StadiumBorder(),
                    padding: const EdgeInsets.symmetric(
                      horizontal: 9,
                      vertical: 6,
                    ),
                  ),
                  onPressed: () {},
                  icon: const FaIcon(
                    FontAwesomeIcons.plus,
                    color: Colors.white,
                    size: 15,
                  ),
                  label: Text(
                    'Thêm'.toUpperCase(),
                    style: const TextStyle(
                        color: Colors.white,
                        fontSize: 12,
                        fontWeight: FontWeight.w600),
                  ),
                )
              ],
            ),
            const SizedBox(
              height: 8,
            ),
            SizedBox(
              width: double.infinity,
              height: 80,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                itemCount: favoriteLocationData.length,
                itemBuilder: (context, index) => InkWell(
                  onTap: () {
                    ref
                        .read(arrivalLocationProvider.notifier)
                        .setArrivalLocation(favoriteLocationData[index]
                            ['location'] as LocationModel);
                    chooseArrival();
                  },
                  child: FavoriteLocationItem(
                    data: favoriteLocationData[index],
                  ),
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
            bookingHistoryList.isNotEmpty
                ? Expanded(
                    child: ListView.builder(
                      itemCount: bookingHistoryList.length,
                      itemBuilder: (context, index) => Column(
                        children: [
                          InkWell(
                            onTap: () {
                              ref
                                  .read(arrivalLocationProvider.notifier)
                                  .setArrivalLocation(
                                      bookingHistoryList[index]);
                              chooseArrival();
                            },
                            child: RecentlyArrivalItem(
                              data: bookingHistoryList[index],
                            ),
                          ),
                          const SizedBox(
                            height: 20,
                          ),
                        ],
                      ),
                    ),
                  )
                : Expanded(
                    child: Center(
                        child: CircularProgressIndicator(
                    color: HexColor('FE8248'),
                  ))),
            const SizedBox(
              height: 75,
            ),
          ],
        ),
      ),
    );
  }
}
