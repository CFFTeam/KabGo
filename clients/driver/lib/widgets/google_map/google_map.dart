import 'dart:async';
import 'dart:convert';
import 'dart:typed_data';
import 'dart:ui';

import 'package:dio/dio.dart';
import 'package:driver/.env.dart';
import 'package:driver/models/location.dart';
import 'package:driver/providers/current_location.dart';
import 'package:driver/providers/direction_provider.dart';
import 'package:driver/providers/route_provider.dart';
import 'package:driver/providers/socket_provider.dart';
import 'package:driver/screens/customer_request/customer_request_comming.dart';
import 'package:driver/screens/customer_request/customer_request_ongoing.dart';
import 'package:driver/screens/home_dashboard/home_dashboard.dart';
import 'package:driver/screens/route_screen/route_screen.dart';
import 'package:driver/utils/Image.dart';
import 'package:driver/widgets/icon_button/icon_button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:geolocator/geolocator.dart';
import 'package:go_router/go_router.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

import '../../models/customer_booking.dart';
import '../../models/direction_model.dart';
import '../../models/driver.dart';
import '../../models/vehicle.dart';
import '../../providers/customer_request.dart';

import 'dart:math' as math;

import '../../providers/driver_provider.dart';
import '../../providers/request_status.dart';

class KGoogleMap extends ConsumerStatefulWidget {
  const KGoogleMap({Key? key}) : super(key: key);

  @override
  ConsumerState<KGoogleMap> createState() => _GoogleMapState();
}

class _GoogleMapState extends ConsumerState<KGoogleMap>
    with TickerProviderStateMixin {
  final Completer<GoogleMapController> _controller = Completer();

  late GoogleMapController _mapController;
  late AnimationController animationCircleController;
  late AnimationController animationMarkerController;
  Position? _currentPosition;
  LocationPostion? _movingPosition;

  static bool running = true;
  static int process = 0;
  static int step = 1;
  static double currentRadius = 1;

  static const LatLng _center = LatLng(10.7552928, 106.3655788);
  static const CameraPosition _cameraPosition =
      CameraPosition(target: _center, zoom: 10, tilt: 0, bearing: 0);

  final Set<Marker> _markers = {};
  Marker? movingMarker;
  Set<Polyline> _polyline = {};

  // static bool compassNotifier.setDirection(false);

  late BitmapDescriptor currentLocationIcon;
  late BitmapDescriptor driverIcon;
  late BitmapDescriptor destIcon;
  late BitmapDescriptor departureLocationIcon;

  Directions? _info;

  Circle _createCircle(String? id, LatLng latLng,
      {double radius = 50,
      int strokeWidth = 1,
      Color fillColor = const Color.fromRGBO(255, 100, 51, 0.15)}) {
    id ??= 'circle_id_${DateTime.now().millisecondsSinceEpoch}';

    return Circle(
      circleId: CircleId(id),
      center: latLng,
      radius: radius > 0 ? radius * 4 : 50,
      fillColor: fillColor,
      strokeColor: const Color.fromRGBO(255, 100, 51, 0.3),
      strokeWidth: strokeWidth,
    );
  }

  Marker _createMarker(
      String? id, String title, LatLng latLng, BitmapDescriptor icon,
      {double rotate = 0.0,
      Offset anchor = const Offset(0.5, 0.5),
      double zIndex = 0.0,
      bool flat = false}) {
    id ??= 'marker_id_${DateTime.now().millisecondsSinceEpoch}';

    return Marker(
        markerId: MarkerId(id),
        position: latLng,
        infoWindow: InfoWindow(title: title),
        rotation: rotate,
        anchor: anchor,
        flat: flat,
        zIndex: zIndex,
        icon: icon);
  }

  void _onMapCreated(GoogleMapController controller) {
    _controller.complete(controller);

    DefaultAssetBundle.of(context)
        .loadString('lib/assets/map/map.json')
        .then((String value) async {
      _mapController = await _controller.future;
      await _mapController.setMapStyle(value);

      _moveToCurrent();
      _livePosition();
    });
  }

  void _updateIconCurrentLocation(final currentPosition,
      {double rotate = 0.0}) {
    final requestStatus = ref.watch(requestStatusProvider);

    if (requestStatus == RequestStatus.comming ||
        requestStatus == RequestStatus.ongoing) {
      final compass = ref.read(directionProvider);

      setState(() {
        _movingPosition = currentPosition;
        movingMarker = _createMarker(
            'my_location',
            'Vị trí của tôi',
            LatLng(currentPosition.latitude, currentPosition.longitude),
            driverIcon,
            rotate: compass ? rotate : 180,
            flat: true);
      });

      if (compass == false && running == false) {
        double cameraBearing = (rotate < 0) ? rotate - 180.0 : rotate - 180;
        _mapController.moveCamera(CameraUpdate.newCameraPosition(CameraPosition(
            target: LatLng(currentPosition.latitude, currentPosition.longitude),
            zoom: 20,
            tilt: 90.0,
            bearing: cameraBearing)));
      }
      return;
    }

    if (requestStatus == RequestStatus.waiting ||
        requestStatus == RequestStatus.accepted) {
      _movingPosition = LocationPostion(
          latitude: currentPosition.latitude,
          longitude: currentPosition.longitude);

      setState(() {
        _markers.add(_createMarker(
            'my_location',
            'Vị trí của tôi',
            LatLng(currentPosition.latitude, currentPosition.longitude),
            currentLocationIcon));
      });
    }
  }

  void _moveToCurrent() {
    ref
        .read(currentLocationProvider.notifier)
        .getCurrentLocation()
        .then((value) {
      _currentPosition = value;

      _mapController.animateCamera(CameraUpdate.newCameraPosition(
          CameraPosition(
              target: LatLng(
                  _currentPosition!.latitude, _currentPosition!.longitude),
              zoom: 17,
              tilt: 0,
              bearing: 0)));

      _updateIconCurrentLocation(_currentPosition);
    });
  }

  void _livePosition() {
    LocationSettings settings = const LocationSettings(
        accuracy: LocationAccuracy.bestForNavigation, distanceFilter: 0);

    Geolocator.getPositionStream(locationSettings: settings)
        .listen((Position position) {
      // _mapController.animateCamera(CameraUpdate.newCameraPosition(
      //     CameraPosition(
      //         target: LatLng(position.latitude, position.longitude),
      //         zoom: 18,
      //         tilt: 0,
      //         bearing: 0)));

      // ref.read(currentLocationProvider.notifier).updateLocation(position);
      if (ref.read(requestStatusProvider) == RequestStatus.waiting) {
        _currentPosition = position;
        _updateIconCurrentLocation(position);
      }
    });
  }

  @override
  void dispose() {
    animationCircleController.dispose();
    _mapController.dispose();
    super.dispose();
  }

  List<String> extractDirections(List<String> texts) {
    List<String> directions = [];
    for (String text in texts) {
      RegExp regex = RegExp(r'<div .*>(.*)<\/div>');
      Iterable<Match> matches = regex.allMatches(text);
      for (Match match in matches) {
        directions.add(match.group(1)!);
      }
    }
    return directions;
  }

  List<String> extractStreetNames(String text) {
    List<String> streetNames = [];
    RegExp regex = RegExp(r'.*<b>(.*)<\/b>($|)');
    Iterable<Match> matches = regex.allMatches(text);
    for (Match match in matches) {
      streetNames.add(match.group(1)!);
    }
    return streetNames;
  }

  String currentAddress = '';

  Future<void> fetchAddress(double latitude, double longitude) async {
    final response = await Dio().get(
        "https://maps.googleapis.com/maps/api/geocode/json?",
        queryParameters: {
          "latlng": "$latitude,$longitude",
          "language": "vi",
          "key": googleAPIKey,
        });

    if (response.statusCode == 200) {
      final results = response.data["results"];

      if (results != null && results.isNotEmpty) {
        final address = results[0]["address_components"][1]["long_name"];
        currentAddress = address;
      }
    } else {
      currentAddress = "Error fetching address";
    }
  }

  @override
  void initState() {
    super.initState();

    DefaultAssetBundle.of(context)
        .load('lib/assets/icons/current_location.png')
        .then((ByteData bytes) => currentLocationIcon =
            BitmapDescriptor.fromBytes(bytes.buffer.asUint8List()));

    getBytesFromAsset('lib/assets/map/driving.png', 65).then(
        (Uint8List bytes) => driverIcon = BitmapDescriptor.fromBytes(bytes));

    DefaultAssetBundle.of(context).load('lib/assets/map/original.png').then(
        (ByteData bytes) => departureLocationIcon =
            BitmapDescriptor.fromBytes(bytes.buffer.asUint8List()));

    DefaultAssetBundle.of(context).load('lib/assets/map/destpoint.png').then(
        (ByteData bytes) =>
            destIcon = BitmapDescriptor.fromBytes(bytes.buffer.asUint8List()));

    animationCircleController = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 1000), // Animation duration
    )..addStatusListener((status) {
        if (status == AnimationStatus.completed) {
          animationCircleController.reverse();
        } else if (status == AnimationStatus.dismissed) {
          animationCircleController.forward();
        }
      });

    animationCircleController.addListener(() {
      if (_controller.isCompleted) {
        if ((ref.read(requestStatusProvider) == RequestStatus.comming ||
            ref.read(requestStatusProvider) == RequestStatus.ongoing)) {
          setState(() {
            currentRadius = 1 + 1.2 * animationCircleController.value / 2;
          });
        } else if (ref.read(requestStatusProvider) != RequestStatus.ready &&
            _currentPosition != null) {
          setState(() {
            currentRadius = _currentPosition!.accuracy;
          });
        }
      }
    });

    animationCircleController.forward();
  }

  double calculateBearing(
      LocationPostion currentLocation, LocationPostion destinationPosition) {
    final bearing = math.atan2(
        math.sin(math.pi *
            (destinationPosition.longitude - currentLocation.longitude) /
            180.0),
        math.cos(math.pi * currentLocation.latitude / 180.0) *
                math.tan(math.pi * destinationPosition.latitude / 180.0) -
            math.sin(math.pi * currentLocation.latitude / 180.0) *
                math.cos(math.pi *
                    (destinationPosition.longitude -
                        currentLocation.longitude) /
                    180.0));

    return bearing * 180.0 / math.pi;
  }

  String removeHtmlTags(String input) {
    RegExp exp = RegExp(r"<[^>]*>", multiLine: true, caseSensitive: true);
    return input.replaceAll(exp, ' ').replaceAll('  ', ' ');
  }

  @override
  Widget build(BuildContext context) {
    final bool active = ref.watch(socketClientProvider);
    final requestStatus = ref.watch(requestStatusProvider);
    final driverDetails = ref.read(driverDetailsProvider);
    final customerRequest = ref.watch(customerRequestProvider);
    final customerRequestNotifier = ref.watch(customerRequestProvider.notifier);

    final compass = ref.watch(directionProvider);
    final compassNotifier = ref.read(directionProvider.notifier);
    final routesList = ref.watch(routeListProvider);

    ref.listen(socketClientProvider, (prev, next) {
      if (next) {
        ref.read(socketClientProvider.notifier).subscribe('customer-cancel',
            (_) {
          running = true;
          ref.read(requestStatusProvider.notifier).cancelRequest();

          Future.delayed(const Duration(milliseconds: 2000), () {
            WidgetsBinding.instance.addPostFrameCallback((_) async {
              context.go(HomeDashboard.path);

              ref.read(customerRequestProvider.notifier).cancelRequest();
              ref.read(directionProvider.notifier).setDirection(false);
            });
          });
        });
      }
    });

    if (active) {
      if (customerRequest.hasValue()) {
        if (requestStatus == RequestStatus.accepted) {
          final LocationPostion customerLocation = LocationPostion(
              latitude: double.parse(customerRequest
                  .customer_infor.departure_information.latitude),
              longitude: double.parse(customerRequest
                  .customer_infor.departure_information.longitude));

          // final LocationPostion destinationLocation = LocationPostion(
          //     latitude: double.parse(
          //         customerRequest.customer_infor.arrival_information.latitude),
          //     longitude: double.parse(customerRequest
          //         .customer_infor.arrival_information.longitude));

          if (_info == null) {
            _info = customerRequest.direction;

            _mapController.animateCamera(CameraUpdate.newLatLngBounds(
                customerRequest.direction.bounds!, 100.0));

            setState(() {
              _polyline = {
                Polyline(
                    polylineId: const PolylineId('customer_direction'),
                    color: const Color.fromARGB(255, 255, 113, 36),
                    width: 8,
                    points: customerRequest.direction.polylinePoints!
                        .map((e) => LatLng(e.latitude, e.longitude))
                        .toList())
              };

              _markers.addAll({
                _createMarker(
                    'customer_location',
                    'Vị trí khách hàng',
                    LatLng(
                        customerLocation.latitude, customerLocation.longitude),
                    departureLocationIcon),
              });
            });
          }
        }

        if (requestStatus == RequestStatus.ready && running == false) {
          customerRequestNotifier.acceptRequest().then((value) {
            _info = value!;

            ref.read(socketClientProvider.notifier).publish(
                'driver-comming',
                jsonEncode(DriverSubmit(
                        user_id: customerRequest
                            .customer_infor.user_information.phonenumber,
                        history_id: customerRequest.customer_infor.history_id,
                        driver: Driver(
                            driverDetails.avatar,
                            driverDetails.name,
                            driverDetails.phonenumber,
                            Vehicle(
                                name: "Honda Wave RSX",
                                brand: "Honda",
                                type: "Xe máy",
                                color: "Xanh đen",
                                number: "68S164889"),
                            LocationPostion(
                                latitude:
                                    ref.read(currentLocationProvider).latitude,
                                longitude: ref
                                    .read(currentLocationProvider)
                                    .longitude),
                            ref.read(currentLocationProvider).heading,
                            5.0),
                        directions: value.polylinePoints!)
                    .toJson()));

            _polyline = {
              Polyline(
                  polylineId: const PolylineId('customer_direction'),
                  color: const Color.fromARGB(255, 255, 113, 36),
                  width: 8,
                  points: value.polylinePoints!
                      .map((e) => LatLng(e.latitude, e.longitude))
                      .toList())
            };

            _markers.addAll({
              _createMarker(
                  'destination_location',
                  'Điểm đến khách hàng',
                  LatLng(value.polylinePoints!.last.latitude,
                      value.polylinePoints!.last.longitude),
                  destIcon),
            });

            running = true;
            step = 1;
            _movingPosition = LocationPostion(
                latitude: _info!.polylinePoints!.first.latitude,
                longitude: _info!.polylinePoints!.first.longitude);
            compassNotifier.setDirection(false);
            process = 0;
          });
        }

        if ((requestStatus == RequestStatus.comming ||
                requestStatus == RequestStatus.ongoing) &&
            running == true &&
            _info != null) {
          running = false;

          LocationPostion current_location = LocationPostion(
              latitude:
                  customerRequest.direction.polylinePoints![process].latitude,
              longitude:
                  customerRequest.direction.polylinePoints![process].longitude);

          final destinationPosition = LocationPostion(
              latitude: customerRequest
                  .direction.polylinePoints![process + 1].latitude,
              longitude: customerRequest.direction.polylinePoints![process + 1]
                  .longitude); // Replace with your destination's coordinates

          double rotate =
              calculateBearing(current_location, destinationPosition);

          _updateIconCurrentLocation(current_location, rotate: rotate);

          CameraUpdate.newCameraPosition(CameraPosition(
              target:
                  LatLng(current_location.latitude, current_location.longitude),
              zoom: 20,
              tilt: 90.0,
              bearing: rotate));

          Future.delayed(const Duration(milliseconds: 2000), () {
            if (routesList.isNotEmpty) {
              fetchAddress(routesList[step].startLocation.latitude,
                      routesList[step].startLocation.longitude)
                  .then((value) {
                ref.read(routeProvider.notifier).setRoute(routesList[step]);
              });
            }

            Timer.periodic(const Duration(milliseconds: 50), (timer) {
              if (_info == null ||
                  requestStatus == RequestStatus.waiting ||
                  requestStatus == RequestStatus.ready ||
                  process >=
                      customerRequest.direction.polylinePoints!.length - 1) {
                timer.cancel();

                step = 0;

                if (compass == true) {
                  // context.go(RouteScreen.path);
                } else {
                  if (requestStatus == RequestStatus.comming) {
                    context.go(CustomerRequestComming.path);
                  } else if (requestStatus == RequestStatus.ongoing) {
                    context.go(CustomerRequestGoing.path);
                  }
                }

                compassNotifier.setDirection(true);
                _mapController.animateCamera(CameraUpdate.newLatLngBounds(
                    customerRequest.direction.bounds!, 100.0));

                return;
              }

              if (process <
                  customerRequest.direction.polylinePoints!.length - 1) {
                process++;

                LocationPostion current_location = LocationPostion(
                    latitude: customerRequest
                        .direction.polylinePoints![process].latitude,
                    longitude: customerRequest
                        .direction.polylinePoints![process].longitude);

                final destinationPosition = LocationPostion(
                    latitude: customerRequest
                        .direction.polylinePoints![process - 1].latitude,
                    longitude: customerRequest
                        .direction
                        .polylinePoints![process - 1]
                        .longitude); // Replace with your destination's coordinates

                double rotate =
                    calculateBearing(current_location, destinationPosition);

                if (routesList.isNotEmpty) {
                  for (int i = 0; i < routesList.length; ++i) {
                    if (routesList[i].index == process) {
                      step++;
                      if (step < routesList.length) {
                        fetchAddress(routesList[step].startLocation.latitude,
                                routesList[step].startLocation.longitude)
                            .then((value) {
                          ref
                              .read(routeProvider.notifier)
                              .setRoute(routesList[step]);
                        });
                      }
                      break;
                    }
                  }
                }

                // _info!.polylinePoints.removeAt(0);

                _polyline = {
                  Polyline(
                      polylineId: const PolylineId('customer_direction'),
                      color: const Color.fromARGB(255, 255, 113, 36),
                      width: 8,
                      points: _info!.polylinePoints!
                          .map((e) => LatLng(e.latitude, e.longitude))
                          .toList()
                          .sublist(process, _info!.polylinePoints!.length))
                };

                _updateIconCurrentLocation(current_location, rotate: rotate);

                ref.read(socketClientProvider.notifier).publish(
                    'driver-moving',
                    jsonEncode(DriverSubmit(
                      user_id: customerRequest
                          .customer_infor.user_information.phonenumber,
                      history_id: customerRequest.customer_infor.history_id,
                      driver: Driver(
                          driverDetails.avatar,
                          driverDetails.name,
                          driverDetails.phonenumber,
                          Vehicle(
                              name: "Honda Wave RSX",
                              brand: "Honda",
                              type: "Xe máy",
                              color: "Xanh đen",
                              number: "68S164889"),
                          current_location,
                          rotate,
                          5.0),
                      directions: _info!.polylinePoints!
                          .sublist(process, _info!.polylinePoints!.length),
                    ).toJson()));
              }
            });
          });
        }
      }

      if (requestStatus == RequestStatus.waiting) {
        setState(() {
          _info = null;
          _polyline.clear();
          _markers.clear();
          _markers.add(_createMarker(
              'my_location',
              'Vị trí của tôi',
              LatLng(_currentPosition!.latitude, _currentPosition!.longitude),
              currentLocationIcon));
          _movingPosition = LocationPostion(
              latitude: _currentPosition!.latitude,
              longitude: _currentPosition!.longitude);
          process = 0;
          running = true;
        });
      }
    } else {
      setState(() {
        _info = null;
        _polyline.clear();
        process = 0;
        running = true;
      });
    }

    final route = ref.watch(routeProvider);
    final routeNotifier = ref.read(routeProvider.notifier);

    return Stack(children: <Widget>[
      GoogleMap(
        myLocationButtonEnabled: false,
        myLocationEnabled: false,
        zoomControlsEnabled: true,
        zoomGesturesEnabled: true,
        onMapCreated: _onMapCreated,
        initialCameraPosition: _cameraPosition,
        markers: {
          ..._markers,
          if ((requestStatus == RequestStatus.comming ||
                  requestStatus == RequestStatus.ongoing) &&
              movingMarker != null)
            movingMarker!,
        },
        circles: {
          if (_movingPosition != null)
            _createCircle('my_location_animation',
                LatLng(_movingPosition!.latitude, _movingPosition!.longitude),
                radius: currentRadius)
        },
        polylines: _polyline,
      ),
      if (requestStatus == RequestStatus.waiting)
        Align(
            alignment: Alignment.bottomRight,
            child: Container(
              padding: const EdgeInsets.only(bottom: 120, right: 3),
              child: CIconButton(
                elevation: 1,
                backgroundColor: Colors.white,
                foregroundColor: Colors.grey[500],
                padding: const EdgeInsets.all(12),
                icon: const Icon(FontAwesomeIcons.locationCrosshairs,
                    color: Color(0xFFFF772B)),
                onPressed: _moveToCurrent,
              ),
            )),
      if ((requestStatus == RequestStatus.comming ||
              requestStatus == RequestStatus.ongoing) &&
          compass == false &&
          routeNotifier.hasValue)
        Align(
            alignment: Alignment.topCenter,
            child: Padding(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 15),
              child: Container(
                decoration: BoxDecoration(
                  borderRadius: BorderRadius.circular(10),
                  color: const Color(0xFFF86C1D),
                  boxShadow: [
                    BoxShadow(
                        color: Colors.grey.withOpacity(0.3),
                        spreadRadius: 0,
                        blurRadius: 3,
                        offset: const Offset(0, 0))
                  ],
                ),
                height: 145,
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: <Widget>[
                    const SizedBox(
                      height: 5,
                    ),
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 20),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: <Widget>[
                          const Icon(
                            FontAwesomeIcons.arrowUp,
                            size: 32,
                            color: Color(0xFFFFFFFF),
                          ),
                          const SizedBox(
                            width: 20,
                          ),
                          Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: <Widget>[
                              Text(
                                currentAddress,
                                style: const TextStyle(
                                    color: Color(0xFFFFFFFF),
                                    fontWeight: FontWeight.bold,
                                    fontSize: 21),
                              ),
                              const SizedBox(
                                height: 8,
                              ),
                              Row(
                                children: [
                                  const Text(
                                    'về hướng',
                                    style: TextStyle(
                                        color: Color(0xFFFFFFFF),
                                        fontWeight: FontWeight.w500,
                                        fontSize: 14),
                                  ),
                                  const SizedBox(
                                    width: 6,
                                  ),
                                  SizedBox(
                                    width: 210,
                                    child: Text(
                                      extractStreetNames(route.instruction)[0],
                                      overflow: TextOverflow.ellipsis,
                                      style: const TextStyle(
                                          color: Color(0xFFFFFFFF),
                                          fontWeight: FontWeight.w500,
                                          fontSize: 18),
                                    ),
                                  )
                                ],
                              )
                            ],
                          ),
                          const Spacer(),
                        ],
                      ),
                    ),
                    const SizedBox(
                      height: 10,
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        const SizedBox(
                          width: 0,
                        ),
                        SizedBox(
                          width: 350,
                          child: Text(
                            removeHtmlTags(route.instruction),
                            maxLines: 2,
                            overflow: TextOverflow.ellipsis,
                            style: const TextStyle(
                                color: Colors.white,
                                fontSize: 13,
                                fontWeight: FontWeight.w600),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(
                      height: 10,
                    ),
                  ],
                ),
              ),
            )),
      if ((requestStatus == RequestStatus.comming ||
          requestStatus == RequestStatus.ongoing) && process <
                      customerRequest.direction.polylinePoints!.length - 1)
        Align(
            alignment: Alignment.bottomRight,
            child: Container(
              padding: const EdgeInsets.only(bottom: 120, right: 3),
              child: CIconButton(
                elevation: 1,
                backgroundColor: Colors.white,
                foregroundColor: Colors.grey[500],
                padding: const EdgeInsets.all(12),
                icon: const Icon(FontAwesomeIcons.solidCompass,
                    color: Color(0xFFFF772B)),
                onPressed: () {
                  if (compass == true) {
                    context.go(RouteScreen.path);
                  }

                  compassNotifier.toggleDirection();

                  _mapController.animateCamera(CameraUpdate.newLatLngBounds(
                      customerRequest.direction.bounds!, 100.0));
                },
              ),
            )),
    ]);
  }
}
