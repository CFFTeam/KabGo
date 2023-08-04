import 'package:customer_app/models/location_model.dart';
import 'package:customer_app/providers/mapProvider.dart';
import 'package:customer_app/providers/stepProvider.dart';
import 'package:customer_app/screens/choose_departure_panel/choose_departure_panel.dart';
import 'package:customer_app/screens/confirm_route_panel/confirm_route_panel.dart';
import 'package:customer_app/screens/create_trip/create_trip.dart';
import 'package:customer_app/screens/find_arrival_page/find_arrival_page.dart';
import 'package:customer_app/screens/home_panel/home_panel.dart';
import 'package:customer_app/widgets/current_location_button.dart';
import 'package:customer_app/widgets/my_map.dart';
import 'package:customer_app/widgets/options_button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:sliding_up_panel/sliding_up_panel.dart';

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
    currentPage = HomePanel(findArrival: chooseArrival);
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
          } else if (next == 'choose_departure') {
            minHeightPanel = 420;
            maxHeightPanel = 420;
            currentPage = ChooseDeparturePanel(
              backButton: chooseArrival,
            );
          } else if (next == 'confirm_route') {
            minHeightPanel = 400;
            maxHeightPanel = 400;
            currentPage =
                const ConfirmRoutePanel(distance: 100, travelTime: 20);
          } else if (next == 'create_trip') {
            minHeightPanel = 750;
            maxHeightPanel = 750;
            currentPage = const CreateTrip();
          } else if (next == 'find_driver') {
            minHeightPanel = 220;
            maxHeightPanel = 220;
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
              Align(
                alignment: const Alignment(0.92, 0.1),
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
      );
    });
  }
}
