import 'package:flutter/material.dart';

abstract class ThemeText {
  static const TextStyle titleText = TextStyle(
    fontFamily: 'Montserrat',
    color: Color(0xFF6A6A6A),
    fontSize: 13,
    fontWeight: FontWeight.w600,
  );

  static const TextStyle accountText = TextStyle(
    fontFamily: 'Montserrat',
    color: Color(0xFFF86C1D),
    fontSize: 16,
    fontWeight: FontWeight.bold,
  );

  static const TextStyle vehicleText = TextStyle(
    fontFamily: 'Montserrat',
    color: Color(0xFF000000),
    fontSize: 14,
    fontWeight: FontWeight.bold,
  );

  static const TextStyle analysisPercentTextText = TextStyle(
    fontFamily: 'Montserrat',
    color: Colors.white,
    fontSize: 15,
    fontWeight: FontWeight.w600,
  );

  static const TextStyle analysisTitleText = TextStyle(
    fontFamily: 'Montserrat',
    fontSize: 14,
    color: Colors.white,
    fontWeight: FontWeight.bold,
  );
}
