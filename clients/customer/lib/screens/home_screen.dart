import 'package:awesome_ripple_animation/awesome_ripple_animation.dart';
import 'package:customer/screens/wait_driver_panel/wait_driver_panel.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:sliding_up_panel/sliding_up_panel.dart';

import '../functions/setHexColor.dart';
import '../models/location_model.dart';
import '../providers/mapProvider.dart';
import '../providers/stepProvider.dart';
import '../widgets/current_location_button.dart';
import '../widgets/my_map.dart';
import '../widgets/options_button.dart';
import 'choose_departure_panel/choose_departure_panel.dart';
import 'complete_panel/complete_panel.dart';
import 'confirm_route_panel/confirm_route_panel.dart';
import 'create_trip/find_driver.dart';
import 'create_trip/set_schedule.dart';
import 'home_panel/home_panel.dart';
import 'location_picker_panel/location_picker_panel.dart';

class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen> {
  double distance = 0;
  double travelTime = 0;

  double minHeightPanel = 230;
  double maxHeightPanel = 230;

  Widget? currentPage;

  LocationModel? departureLocation;
  LatLng? arrivalLocation;

  bool getCurrentLocationButton = true;
  bool locationPicker = false;

  final PanelController panelController = PanelController();

  @override
  void initState() {
    currentPage = const HomePanel();
    ref.read(stepProvider.notifier).setStep('home');
    super.initState();
  }

  double heightIconPicker = 44;

  @override
  Widget build(BuildContext context) {
    print('===========> HOME_SCREEN BUILD');

    return Consumer(builder: (context, ref, child) {
      ref.listen(stepProvider, (previous, next) {
        setState(() {
          if (next == 'home') {
            minHeightPanel = 230;
            maxHeightPanel = 230;
            getCurrentLocationButton = true;
            currentPage = const HomePanel();
          } else if (next == 'find_arrival') {
            minHeightPanel = 468;
            maxHeightPanel = 468;
            currentPage = Container(
              color: Colors.white,
            );
          } else if (next == 'choose_departure') {
            minHeightPanel = 468;
            maxHeightPanel = 468;
            getCurrentLocationButton = true;
            locationPicker = false;
            currentPage = const ChooseDeparturePanel();
          } else if (next == 'location_picker') {
            minHeightPanel = 240;
            maxHeightPanel = 240;
            locationPicker = true;
            getCurrentLocationButton = false;
            currentPage = LocationPickerPanel(previous!);
          } else if (next == 'confirm_route') {
            minHeightPanel = 400;
            maxHeightPanel = 400;
            locationPicker = false;
            getCurrentLocationButton = true;
            currentPage = const ConfirmRoutePanel();
          } else if (next == 'create_trip') {
            minHeightPanel = 750;
            maxHeightPanel = 750;
            currentPage = const SetSchedule();
          } else if (next == 'find_driver') {
            maxHeightPanel = 220;
            minHeightPanel = 220;
            getCurrentLocationButton = false;
            currentPage = const FindDriver();
          } else if (next == 'wait_driver') {
            maxHeightPanel = 480;
            minHeightPanel = 175;
            currentPage = const WaitDriverPanel();
          } else if (next == 'comming_driver') {
          } else if (next == 'moving') {
          } else if (next == 'complete') {
            minHeightPanel = 568;
            maxHeightPanel = 568;
            currentPage = const CompletePanel();
          }
        });
      });
      return Scaffold(
        body: SlidingUpPanel(
          controller: panelController,
          minHeight: minHeightPanel,
          maxHeight: maxHeightPanel,
          color: Colors.transparent,
          borderRadius: const BorderRadius.all(Radius.circular(20)),
          boxShadow: const [
            BoxShadow(
              color: Color.fromARGB(80, 217, 217, 217),
              spreadRadius: 3,
              blurRadius: 3,
              offset: Offset(1, 0),
            ),
          ],
          // parallaxOffset: 0.5,
          body: Stack(
            children: [
              const MyMap(),
              /////////////////////////////////////////////////////// OPTIONS BUTTON
              const Align(
                alignment: Alignment(0.92, -0.85),
                child: OptionsButton(),
              ),
              ////////////////////////////////////////////////////// LOCATION BUTTON
              if (minHeightPanel < 0.75 * MediaQuery.of(context).size.height &&
                  getCurrentLocationButton)
                AnimatedAlign(
                  duration: const Duration(milliseconds: 80),
                  alignment: Alignment(
                      0.92,
                      0.92 -
                          ((minHeightPanel * 2) /
                              MediaQuery.of(context).size.height)),
                  child: CurrentLocationButton(getCurrentLocation: () {
                    ref
                        .read(mapProvider.notifier)
                        .setMapAction('GET_CURRENT_LOCATION');
                  }),
                ),
              if (locationPicker)
                Center(
                  //picker image on google map
                  child: Padding(
                    padding:
                        EdgeInsets.only(bottom: 240 + heightIconPicker / 2),
                    child: Image.asset(
                      'lib/assets/map_departure_icon.png',
                      height: heightIconPicker,
                    ),
                  ),
                ),
              if (ref.read(stepProvider) == 'find_driver')
                Center(
                  //picker image on google map
                  child: Padding(
                      padding: const EdgeInsets.only(bottom: 170),
                      child: RippleAnimation(
                        key: UniqueKey(),
                        repeat: true,
                        duration: const Duration(milliseconds: 1000),
                        ripplesCount: 2,
                        minRadius: 80,
                        color: HexColor('FFC4A9'),
                        size: const Size(50, 50),
                        child: Center(
                            child: ClipRRect(
                          // borderRadius: BorderRadius.circular(100),
                          child: Image.asset(
                            'lib/assets/map_departure_icon.png',
                            height: heightIconPicker,
                            // fit: BoxFit.cover,
                          ),
                        )),
                      )),
                ),
            ],
          ),
          //////////////////////////////////////////////////////////// BOTTOM DIALOG
          panelBuilder: (sc) => currentPage!,
        ),
        bottomNavigationBar: (ref.read(stepProvider) == 'wait_driver' ||
                ref.read(stepProvider) == 'comming_driver')
            ? Container(
                // height: 90,
                height: (ref.read(stepProvider) == 'wait_driver' ||
                        ref.read(stepProvider) == 'comming_driver')
                    ? 80
                    : 0,
                padding:
                    const EdgeInsets.symmetric(vertical: 0, horizontal: 15),
                decoration: BoxDecoration(
                  color: Colors.white,
                  border: Border(
                    top: BorderSide(
                      color: HexColor('EAEAEA'), // Màu của border top
                      width: 1, // Độ dày của border top
                    ),
                  ),
                ),
                child: Row(
                  children: [
                    SizedBox(
                      width: 54,
                      height: 54,
                      child: OutlinedButton(
                        onPressed: () {},
                        child: FaIcon(
                          FontAwesomeIcons.solidComment,
                          color: HexColor('FE8248'),
                        ),
                      ),
                    ),
                    const SizedBox(
                      width: 15,
                    ),
                    Expanded(
                      child: SizedBox(
                        height: 54,
                        child: ElevatedButton.icon(
                          style: ElevatedButton.styleFrom(
                              backgroundColor: HexColor('29BD11')),
                          onPressed: () {},
                          icon: const FaIcon(
                            FontAwesomeIcons.phone,
                            size: 21,
                            color: Colors.white,
                          ),
                          label: Text('gọi điện'.toUpperCase(),
                              style: Theme.of(context).textTheme.labelMedium),
                        ),
                      ),
                    )
                  ],
                ),
              )
            : Container(
                height: (ref.read(stepProvider) == 'moving') ? 80 : 0,
                alignment: Alignment.center,
                decoration: BoxDecoration(color: HexColor('FE8248')),
                child: const Text(
                  'Đang di chuyển',
                  style: TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                      fontWeight: FontWeight.w700),
                ),
              ),
      );
    });
  }
}
