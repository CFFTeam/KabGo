import 'package:flutter/material.dart';

class CurrentLocationButton extends StatelessWidget {
  const CurrentLocationButton({
    Key? key,
    required this.getCurrentLocation,
  }) : super(key: key);

  final void Function() getCurrentLocation;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 60,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(50),
        boxShadow: const [
          BoxShadow(
            color: Color.fromARGB(120, 193, 193, 193),
            spreadRadius: 1,
            blurRadius: 1,
            offset: Offset(0, 0),
          )
        ],
      ),
      padding: EdgeInsets.zero,
      child: IconButton(
        onPressed: getCurrentLocation,
        padding: EdgeInsets.zero,
        icon: Image.asset('lib/assets/location_button.png'),
        iconSize: 60,
      ),
    );
  }
}
