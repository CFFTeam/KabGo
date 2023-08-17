import 'dart:convert';

import 'package:customer_app/functions/setDepartureByPosition.dart';
import 'package:customer_app/models/route_model.dart';
import 'package:customer_app/providers/currentLocationProvider.dart';
import 'package:customer_app/providers/locationPickerInMap.dart';
import 'package:customer_app/providers/mapProvider.dart';
import 'package:customer_app/providers/routeProvider.dart';
import 'package:customer_app/providers/stepProvider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_polyline_points/flutter_polyline_points.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

import '../functions/determinePosition.dart';
import '../functions/getBytesFromAsset.dart';
import '../functions/networkUtility.dart';
import '../models/location_model.dart';
import '../providers/arrivalLocationProvider.dart';
import '../providers/departureLocationProvider.dart';
import '../utils/Google_Api_Key.dart';

class MyMap extends ConsumerStatefulWidget {
  const MyMap({Key? key}) : super(key: key);

  @override
  // ignore: library_private_types_in_public_api
  _MyMapState createState() => _MyMapState();
}

class _MyMapState extends ConsumerState<MyMap> {
  late GoogleMapController googleMapController;
  static late CameraPosition initialCameraPosition;
  CameraPosition? cameraPosition;
  String mapTheme = '';
  Set<Marker> markers = {};
  List<LatLng> polylineCoordinates = [];
  LatLng? currentLocation;
  Set<Polyline> polylineList = {};

  double distance = 0;
  double travelTime = 0;

  LatLng? departureLocation;
  LatLng? arrivalLocation;
  double mapPaddingTop = 25;
  double mapPaddingLeft = 0;
  double mapPaddingBottom = 0;
  double mapPaddingRight = 0;
  double padding = 100;

  void getFirstCurrentPosition() async {
    LatLng latLng = await determinePosition();
    LocationModel currentLocationModel = await setDepartureByPosition(latLng);
    ref
        .read(departureLocationProvider.notifier)
        .setDepartureLocation(currentLocationModel);
    ref.read(currentLocationProvider.notifier).setCurrentLocation(latLng);
  }

  void getDeparture(bool animationCamera) async {
    LocationModel locationModel = ref.read(departureLocationProvider);
    if (locationModel.placeId != null) {
      if (locationModel.postion == null) {
        departureLocation = await locationModel.getLocation();
      } else {
        departureLocation = locationModel.postion;
      }
    } else {
      LatLng latLng = await determinePosition();
      LocationModel currentLocationModel = await setDepartureByPosition(latLng);
      departureLocation = latLng;
      ref
          .read(departureLocationProvider.notifier)
          .setDepartureLocation(currentLocationModel);
    }
    // markers.remove(const MarkerId('departureLocation'));
    markers.clear();
    markers.add(
      Marker(
        markerId: const MarkerId('departureLocation'),
        position:
            LatLng(departureLocation!.latitude, departureLocation!.longitude),
        icon: BitmapDescriptor.fromBytes(
          await getBytesFromAsset(
            'assets/map_departure_icon.png',
            80,
          ),
        ),
      ),
    );
    if (animationCamera) {
      googleMapController.animateCamera(
        CameraUpdate.newCameraPosition(
          CameraPosition(
              target: LatLng(
                  departureLocation!.latitude, departureLocation!.longitude),
              zoom: 16.5),
        ),
      );
    } else {
      googleMapController.moveCamera(
        CameraUpdate.newCameraPosition(
          CameraPosition(
              target: LatLng(
                  departureLocation!.latitude, departureLocation!.longitude),
              zoom: 16.5),
        ),
      );
    }

    setState(() {});
  }

  void getCurrentLocation() async {
    currentLocation = await determinePosition();
    ref
        .read(currentLocationProvider.notifier)
        .setCurrentLocation(currentLocation!);
    markers.remove(const MarkerId('currentLocation'));
    markers.add(Marker(
      markerId: const MarkerId('currentLocation'),
      position: currentLocation!,
      icon: BitmapDescriptor.fromBytes(
          await getBytesFromAsset('assets/my_location.png', 250)),
    ));
    googleMapController.animateCamera(
      CameraUpdate.newCameraPosition(
        CameraPosition(target: currentLocation!, zoom: 16.5),
      ),
    );
    setState(() {});
  }

  void drawRoute() async {
    LocationModel arrival = ref.read(arrivalLocationProvider);
    departureLocation = ref.read(departureLocationProvider).postion;
    if (arrival.postion == null) {
      arrivalLocation = await arrival.getLocation();
    } else {
      arrivalLocation = arrival.postion;
    }

    if (markers.isEmpty) {
      markers.add(
        Marker(
          markerId: const MarkerId('departureLocation'),
          position:
              LatLng(departureLocation!.latitude, departureLocation!.longitude),
          icon: BitmapDescriptor.fromBytes(
            await getBytesFromAsset(
              'assets/map_departure_icon.png',
              80,
            ),
          ),
        ),
      );
    }
    markers.remove(const MarkerId('arrivalLocation'));
    markers.add(
      Marker(
        markerId: const MarkerId('arrivalLocation'),
        position: LatLng(arrivalLocation!.latitude, arrivalLocation!.longitude),
        icon: BitmapDescriptor.fromBytes(
          await getBytesFromAsset('assets/map_arrival_icon.png', 80),
        ),
      ),
    );

    Uri uri = Uri.https('maps.googleapis.com', 'maps/api/directions/json', {
      'key': APIKey,
      'origin':
          '${departureLocation!.latitude},${departureLocation!.longitude}',
      'destination':
          '${arrivalLocation!.latitude},${arrivalLocation!.longitude}',
    });

    String? response = await NetworkUtility.fetchUrl(uri);
    final parsed = json.decode(response!).cast<String, dynamic>();

    PolylinePoints polylinePoints = PolylinePoints();
    List<PointLatLng> result = polylinePoints.decodePolyline(
        parsed['routes'][0]['overview_polyline']['points'] as String);
    if (result.isNotEmpty) {
      polylineCoordinates.clear();
      result.forEach(
        (PointLatLng point) {
          polylineCoordinates.add(LatLng(point.latitude, point.longitude));
        },
      );
    }

    setState(() {
      ref.read(routeProvider.notifier).setRoute(RouteModel(
          departureLocation: LocationModel(),
          arrivalLocation: LocationModel(),
          time: parsed['routes'][0]['legs'][0]['duration']['text'] as String,
          distance:
              parsed['routes'][0]['legs'][0]['distance']['text'] as String));
      Polyline polyline = Polyline(
        polylineId: const PolylineId("poly"),
        points: polylineCoordinates,
      );
      polylineList.clear();
      polylineList.add(polyline);
      _setMapFitToTour();
    });
  }

  void _setMapFitToTour() {
    double minLat = polylineList.first.points.first.latitude;
    double minLong = polylineList.first.points.first.longitude;
    double maxLat = polylineList.first.points.first.latitude;
    double maxLong = polylineList.first.points.first.longitude;

    polylineList.forEach((poly) {
      poly.points.forEach((point) {
        if (point.latitude < minLat) minLat = point.latitude;
        if (point.latitude > maxLat) maxLat = point.latitude;
        if (point.longitude < minLong) minLong = point.longitude;
        if (point.longitude > maxLong) maxLong = point.longitude;
      });
    });

    googleMapController.animateCamera(CameraUpdate.newLatLngBounds(
        LatLngBounds(
            southwest: LatLng(minLat, minLong),
            northeast: LatLng(maxLat, maxLong)),
        70));
  }

  void findDriver() async {
    departureLocation = ref.read(departureLocationProvider).postion;

    markers.clear();
    markers.add(
      Marker(
        markerId: const MarkerId('departureLocation'),
        position:
            LatLng(departureLocation!.latitude, departureLocation!.longitude),
        icon: BitmapDescriptor.fromBytes(
          await getBytesFromAsset('assets/my_location.png', 250),
        ),
      ),
    );
    googleMapController.moveCamera(
      CameraUpdate.newCameraPosition(
        CameraPosition(
            target: LatLng(
                departureLocation!.latitude, departureLocation!.longitude),
            zoom: 16.5),
      ),
    );

    setState(() {});
  }

  void moveToPosition() {
    departureLocation = ref.read(departureLocationProvider).postion;
    googleMapController.animateCamera(
      CameraUpdate.newCameraPosition(
        CameraPosition(
            target: LatLng(
                departureLocation!.latitude, departureLocation!.longitude),
            zoom: 16.5),
      ),
    );
  }

  String? action;

  @override
  void initState() {
    super.initState();
    initialCameraPosition = const CameraPosition(
        target: LatLng(10.762898829981317, 106.68242875171526), zoom: 15);
    getFirstCurrentPosition();

    DefaultAssetBundle.of(context)
        .loadString('assets/map.json')
        .then((value) => mapTheme = value);
  }

  @override
  Widget build(BuildContext context) {
    print('===========> MY_MAP BUILD');

    return Consumer(
      builder: (context, ref, child) {
        ref.listen(mapProvider, (previous, next) {
          if (next == 'GET_CURRENT_LOCATION') {
            getCurrentLocation();
            ref.read(mapProvider.notifier).setMapAction('');
          } else if (next == 'SET_DEFAULT') {
            ref.read(mapProvider.notifier).setMapAction('');
            setState(() {
              padding = 100;
              markers.clear();
              polylineList.clear();
              polylineCoordinates.clear();
            });
          } else if (next == 'FIND_ARRIVAL_LOCATION') {
            ref.read(mapProvider.notifier).setMapAction('');
            setState(() {
              padding = 370;
              markers.clear();
              polylineList.clear();
              polylineCoordinates.clear();
            });
          } else if (next == 'GET_CURRENT_DEPARTURE_LOCATION') {
            ref.read(mapProvider.notifier).setMapAction('');
            polylineList.clear();
            polylineCoordinates.clear();
            getDeparture(false);
          } else if (next == 'GET_NEW_DEPARTURE_LOCATION') {
            ref.read(mapProvider.notifier).setMapAction('');
            padding = 370;
            polylineList.clear();
            polylineCoordinates.clear();
            getDeparture(true);
          } else if (next == 'LOCATION_PICKER') {
            setState(() {
              padding = 240;
              markers.clear();
              polylineList.clear();
              polylineCoordinates.clear();
            });
            moveToPosition();
          } else if (next == 'DRAW_ROUTE') {
            padding = 370;
            drawRoute();
          } else if (next == 'CREATE_TRIP') {
          } else if (next == 'FIND_DRIVER') {
            polylineList.clear();
            polylineCoordinates.clear();
            markers.clear();
            padding = 80;
            findDriver();
          }
        });
        return Container(
          padding: EdgeInsets.only(bottom: padding),
          child: GoogleMap(
            padding: EdgeInsets.fromLTRB(mapPaddingLeft, mapPaddingTop,
                mapPaddingRight, mapPaddingBottom),
            onMapCreated: (controller) {
              googleMapController = controller;
              controller.setMapStyle(mapTheme);
            },
            myLocationButtonEnabled: false,
            myLocationEnabled: false,
            initialCameraPosition: initialCameraPosition,
            markers: markers,
            zoomControlsEnabled: false,
            polylines: {
              Polyline(
                polylineId: const PolylineId('route'),
                points: polylineCoordinates,
                color: const Color.fromARGB(255, 255, 113, 36),
                width: 8,
              )
            },
            onCameraMove: (CameraPosition cameraPositiona) {
              cameraPosition = cameraPositiona; //when map is dragging
            },
            onCameraIdle: () async {
              if (ref.read(stepProvider) == 'choose_departure_in_map') {
                LatLng latLng = LatLng(cameraPosition!.target.latitude,
                    cameraPosition!.target.longitude);
                LocationModel locationModel =
                    await setDepartureByPosition(latLng);
                print(locationModel.structuredFormatting!.mainText);
                ref
                    .read(pickerLocationProvider.notifier)
                    .setPickerLocation(locationModel);
              }
            },
          ),
        );
      },
    );
  }
}
