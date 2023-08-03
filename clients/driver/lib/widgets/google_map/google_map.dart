import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class KGoogleMap extends ConsumerStatefulWidget {
  const KGoogleMap({Key? key}) : super(key: key);

  @override
  ConsumerState<KGoogleMap> createState() => _GoogleMapState();
}

class _GoogleMapState extends ConsumerState<KGoogleMap> {
  final Completer<GoogleMapController> _controller = Completer();

  late GoogleMapController newGoogleMapController;
  late Position currentPosition;

  static const LatLng _center = LatLng(10.71526510159502, 106.74306445260049);
  static const CameraPosition _cameraPosition =
      CameraPosition(target: _center, zoom: 18, tilt: 0, bearing: 0);

  void _onMapCreated(GoogleMapController controller) async {
    String value = await DefaultAssetBundle.of(context)
        .loadString('lib/assets/map/map.json');
    await controller.setMapStyle(value);

    _controller.complete(controller);

    // getCurrentLocation();
  }

  void getCurrentLocation() async {
    currentPosition = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high);

    LatLng center = LatLng(currentPosition.latitude, currentPosition.longitude);

    CameraPosition cameraPosition =
        CameraPosition(target: center, zoom: 18, tilt: 0, bearing: 0);

    newGoogleMapController
        .animateCamera(CameraUpdate.newCameraPosition(cameraPosition));
  }

  @override
  Widget build(BuildContext context) {
    return GoogleMap(
      myLocationButtonEnabled: true,
      myLocationEnabled: true,
      zoomControlsEnabled: true,
      zoomGesturesEnabled: true,
      onMapCreated: _onMapCreated,
      initialCameraPosition: _cameraPosition,
    );
  }
}
