import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../../data/data.dart';
import '../../functions/setAddressByPosition.dart';
import '../../models/location_model.dart';
import '../../providers/currentLocationProvider.dart';
import '../../providers/departureLocationProvider.dart';
import '../../providers/locationPickerInMap.dart';
import '../../providers/mapProvider.dart';
import '../../providers/stepProvider.dart';
import '../../widgets/bottom_button.dart';
import '../../widgets/input_custom.dart';
import '../../widgets/favorite_location_item.dart';
import '../find_arrival_page/find_arrival_page.dart';

class ChooseDeparturePanel extends ConsumerStatefulWidget {
  const ChooseDeparturePanel({Key? key}) : super(key: key);

  @override
  // ignore: library_private_types_in_public_api
  _ChooseDeparturePanelState createState() => _ChooseDeparturePanelState();
}

class _ChooseDeparturePanelState extends ConsumerState<ChooseDeparturePanel> {
  String? departureValue;

  @override
  void initState() {
    // TODO: implement initState
    StructuredFormatting? structuredFormatting =
        ref.read(departureLocationProvider).structuredFormatting;
    departureValue = structuredFormatting == null
        ? ''
        : '${structuredFormatting.mainText!}, ${structuredFormatting.secondaryText!}';
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    print('===========> CHOOSE_DEPARTURE_PANEL BUILD');

    return Container(
      decoration: const BoxDecoration(
        color: Color.fromARGB(255, 255, 255, 255),
        borderRadius: BorderRadius.vertical(
          top: Radius.circular(20),
        ),
      ),
      padding: const EdgeInsets.fromLTRB(15, 20, 15, 30),
      alignment: Alignment.topLeft,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Chọn điểm đón',
                style: Theme.of(context).textTheme.titleLarge,
              ),
              const SizedBox(
                height: 13,
              ),
              Text(
                'Chọn điểm đón để tài xế của chúng tôi có thể đến đón bạn',
                style: Theme.of(context).textTheme.bodyMedium,
              ),
              const SizedBox(
                height: 22,
              ),
              Row(
                children: [
                  Image.asset(
                    'lib/assets/departure_icon.png',
                    width: 36,
                  ),
                  const SizedBox(
                    width: 10,
                  ),
                  Expanded(
                    child: InputCustom(
                      placeHolder: 'Nhập điểm đón...',
                      value: departureValue!,
                      choosePoint: (LocationModel locationValue) {
                        // ref.read(stepProvider.notifier).setStep('choose_departure');
                        ref
                            .read(departureLocationProvider.notifier)
                            .setDepartureLocation(locationValue);
                        ref
                            .read(mapProvider.notifier)
                            .setMapAction('GET_NEW_DEPARTURE_LOCATION');
                      },
                    ),
                  ),
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
                      setState(() {
                        ref
                            .read(mapProvider.notifier)
                            .setMapAction('LOCATION_PICKER');
                        ref
                            .read(stepProvider.notifier)
                            .setStep('location_picker');
                        ref
                            .read(pickerLocationProvider.notifier)
                            .setPickerLocation(
                                ref.read(departureLocationProvider));
                      });
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
                          .read(departureLocationProvider.notifier)
                          .setDepartureLocation(currentLocationModel);
                      ref
                          .read(mapProvider.notifier)
                          .setMapAction('GET_NEW_DEPARTURE_LOCATION');
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
              Align(
                alignment: Alignment.centerLeft,
                child: Row(
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
                          .read(departureLocationProvider.notifier)
                          .setDepartureLocation(favoriteLocationData[index]
                              ['location'] as LocationModel);
                      ref
                          .read(mapProvider.notifier)
                          .setMapAction('GET_NEW_DEPARTURE_LOCATION');
                    },
                    child: FavoriteLocationItem(
                      data: favoriteLocationData[index],
                    ),
                  ),
                ),
              ),
            ],
          ),
          BottomButton(
              backButton: () {
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
              nextButton: () async {
                ref.read(mapProvider.notifier).setMapAction('DRAW_ROUTE');
                ref.read(stepProvider.notifier).setStep('confirm_route');
              },
              nextButtonText: 'chọn điểm đón này'),
        ],
      ),
    );
  }
}
