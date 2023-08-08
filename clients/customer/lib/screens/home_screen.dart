import 'package:customer_app/models/location_model.dart';
import 'package:customer_app/providers/mapProvider.dart';
import 'package:customer_app/providers/stepProvider.dart';
import 'package:customer_app/screens/choose_departure_panel/choose_departure_panel.dart';
import 'package:customer_app/screens/confirm_route_panel/confirm_route_panel.dart';
import 'package:customer_app/screens/create_trip/find_driver.dart';
import 'package:customer_app/screens/create_trip/set_schedule.dart';
import 'package:customer_app/screens/find_arrival_page/find_arrival_page.dart';
import 'package:customer_app/screens/home_panel/home_panel.dart';
import 'package:customer_app/screens/wait_driver_panel/wait_driver_panel.dart';
import 'package:customer_app/widgets/current_location_button.dart';
import 'package:customer_app/widgets/my_map.dart';
import 'package:customer_app/widgets/options_button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:sliding_up_panel/sliding_up_panel.dart';

import '../functions/setHexColor.dart';

class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen> {
  double distance = 0;
  double travelTime = 0;

  double minHeightPanel = 230;
  double maxHeightPanel = 650;

  Widget? currentPage;

  LocationModel? departureLocation;
  LatLng? arrivalLocation;

  void chooseArrival(BuildContext context) {
    ref.read(stepProvider.notifier).setStep('find_arrival');
    Navigator.push(
      context,
      PageRouteBuilder(
        transitionDuration: const Duration(milliseconds: 400),
        pageBuilder: (context, animation, secondaryAnimation) =>
            const FindArrivalPage(),
        transitionsBuilder: (context, animation, secondaryAnimation, child) {
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
  }

  @override
  void initState() {
    // currentPage = HomePanel(findArrival: chooseArrival);
    minHeightPanel = 166;
    maxHeightPanel = 480;
    currentPage = const WaitDriverPanel();
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    print('===========> HOME_SCREEN BUILD');

    return Consumer(builder: (context, ref, child) {
      ref.listen(stepProvider, (previous, next) {
        setState(() {
          if (next == 'home') {
            minHeightPanel = 230;
            maxHeightPanel = 650;
            currentPage = HomePanel(findArrival: chooseArrival);
          } else if (next == 'find_arrival') {
            minHeightPanel = 100;
            maxHeightPanel = 100;
            currentPage = Container(
              color: Colors.white,
            );
          } else if (next == 'choose_departure') {
            minHeightPanel = 478;
            maxHeightPanel = 478;
            currentPage = ChooseDeparturePanel(
              backButton: chooseArrival,
            );
          } else if (next == 'confirm_route') {
            minHeightPanel = 400;
            maxHeightPanel = 400;
            currentPage = const ConfirmRoutePanel();
          } else if (next == 'create_trip') {
            minHeightPanel = 750;
            maxHeightPanel = 750;
            currentPage = const SetSchedule();
          } else if (next == 'find_driver') {
            minHeightPanel = 220;
            maxHeightPanel = 220;
            currentPage = const FindDriver();
          } else if (next == 'wait_driver') {
            minHeightPanel = 220;
            maxHeightPanel = 480;
            currentPage = const WaitDriverPanel();
          }
        });
      });
      return Scaffold(
        body: SlidingUpPanel(
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
              if (minHeightPanel < 0.75 * MediaQuery.of(context).size.height)
                AnimatedAlign(
                  duration: const Duration(milliseconds: 80),
                  alignment: Alignment(
                      0.92,
                      0.87 -
                          ((minHeightPanel * 2) /
                              MediaQuery.of(context).size.height)),
                  child: CurrentLocationButton(getCurrentLocation: () {
                    ref
                        .read(mapProvider.notifier)
                        .setMapAction('GET_CURRENT_LOCATION');
                  }),
                ),
            ],
          ),
          //////////////////////////////////////////////////////////// BOTTOM DIALOG
          panelBuilder: (sc) => currentPage!,
        ),
        bottomNavigationBar: (ref.read(stepProvider) == 'wait_driver')
            ? Container(
                height: 90,
                // height: (ref.read(stepProvider) == 'wait_driver') ? 100 : 0,
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
                              backgroundColor: HexColor('4BDE33')),
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
                height: 76,
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
