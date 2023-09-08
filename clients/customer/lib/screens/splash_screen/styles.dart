import 'package:flutter/material.dart';

abstract class ThemeText {
  static const TextStyle headingText = TextStyle(
    fontFamily: 'Montserrat',
    color: Color(0xFFF86C1D),
    fontSize: 32,
    fontWeight: FontWeight.bold,
  );

  static const TextStyle descriptionText = TextStyle(
    fontFamily: 'Montserrat',
    color: Color(0xFFF86C1D),
    fontSize: 16,
    height: 1.45,
    fontWeight: FontWeight.w600,
  );

  static const TextStyle startupText = TextStyle(
    fontFamily: 'Montserrat',
    color: Color(0xFF6A6A6A),
    fontSize: 16,
    height: 1.55,
    fontWeight: FontWeight.w600,
  );
}
