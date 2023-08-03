import 'dart:async';
import 'dart:typed_data';

import 'package:driver/widgets/icon_button/icon_button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class KGoogleMap extends ConsumerStatefulWidget {
  const KGoogleMap({Key? key}) : super(key: key);

  @override
  ConsumerState<KGoogleMap> createState() => _GoogleMapState();
}

class _GoogleMapState extends ConsumerState<KGoogleMap> {
  final Completer<GoogleMapController> _controller = Completer();

  late GoogleMapController _mapController;
  late Position _currentPosition;

  static const LatLng _center = LatLng(10.71526510159502, 106.74306445260049);
  static const CameraPosition _cameraPosition =
      CameraPosition(target: _center, zoom: 18, tilt: 0, bearing: 0);

  Set<Circle> _circles = {};
  Set<Marker> _markers = {};

  Set<Circle> _createCircle(String? id, LatLng latLng,
      {double radius = 50, bool vector = true}) {
    id ??= 'circle_id_${DateTime.now().millisecondsSinceEpoch}';
    if (vector) {
      return {
        Circle(
          circleId: CircleId(id),
          center: latLng,
          radius: radius == 0 ? radius * 1.5 : 50,
          fillColor: const Color.fromRGBO(255, 100, 51, 0.15),
          strokeColor: const Color.fromRGBO(255, 100, 51, 0.3),
          strokeWidth: 1,
        )
      };
    }

    return {
      Circle(
        circleId: CircleId(id),
        center: latLng,
        radius: radius == 0 ? radius * 1.5 : 50,
        fillColor: const Color.fromRGBO(255, 100, 51, 0.15),
        strokeColor: const Color.fromRGBO(255, 100, 51, 0.3),
        strokeWidth: 1,
      )
    };
  }

  Future<Set<Marker>> _createMarker(String? id, LatLng latLng) async {
    id ??= 'marker_id_${DateTime.now().millisecondsSinceEpoch}';

    ByteData byteData = await DefaultAssetBundle.of(context)
        .load('lib/assets/icons/current_location.png');

    return {
      Marker(
          markerId: MarkerId(id),
          position: latLng,
          infoWindow: const InfoWindow(title: 'Vị trí của bạn'),
          anchor: const Offset(0.5, 0.5),
          icon: BitmapDescriptor.fromBytes(byteData.buffer.asUint8List())),
    };
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

  Future<Position> _getCurrentLocation() async {
    bool serviceEnabled = await Geolocator.isLocationServiceEnabled();

    if (!serviceEnabled) {
      return Future.error('Location services are disabled');
    }

    LocationPermission permission = await Geolocator.checkPermission();

    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();

      if (permission == LocationPermission.denied) {
        return Future.error('Location permissions are denied.');
      }
    }

    if (permission == LocationPermission.deniedForever) {
      return Future.error(
          'Location permissions are permanently denied, we cannot request permissions.');
    }

    return await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high);
  }

  void _moveToCurrent() {
    _getCurrentLocation().then((value) {
      _currentPosition = value;
      _mapController.animateCamera(CameraUpdate.newCameraPosition(
          CameraPosition(
              target:
                  LatLng(_currentPosition.latitude, _currentPosition.longitude),
              zoom: 18,
              tilt: 0,
              bearing: 0)));

      setState(() {
        _createMarker('my_location',
                LatLng(_currentPosition.latitude, _currentPosition.longitude))
            .then((value) => _markers = value);

        _circles = _createCircle('my_location',
            LatLng(_currentPosition.latitude, _currentPosition.longitude),
            radius: 50);
      });
    });
  }

  void _livePosition() {
    LocationSettings settings = const LocationSettings(
        accuracy: LocationAccuracy.high, distanceFilter: 0);

    Geolocator.getPositionStream(locationSettings: settings)
        .listen((Position position) {
      // _mapController.animateCamera(CameraUpdate.newCameraPosition(
      //     CameraPosition(
      //         target: LatLng(position.latitude, position.longitude),
      //         zoom: 18,
      //         tilt: 0,
      //         bearing: 0)));

      _currentPosition = position;

      setState(() {
        _createMarker(
                'my_location', LatLng(position.latitude, position.longitude))
            .then((value) => _markers = value);

        _circles = _createCircle(
            'my_location', LatLng(position.latitude, position.longitude),
            radius: position.accuracy);
      });
    });
  }

  @override
  void dispose() {
    _mapController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Stack(children: <Widget>[
      GoogleMap(
        myLocationButtonEnabled: false,
        myLocationEnabled: false,
        zoomControlsEnabled: true,
        zoomGesturesEnabled: true,
        onMapCreated: _onMapCreated,
        initialCameraPosition: _cameraPosition,
        trafficEnabled: true,
        markers: _markers,
        circles: _circles,
      ),
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
    ]);
  }
}
