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

  static const TextStyle joinusText = TextStyle(
    fontFamily: 'Montserrat',
    color: Color(0xFFF86C1D),
    fontSize: 18,
    fontWeight: FontWeight.bold,
  );

  static const TextStyle gLoginText = TextStyle(
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontWeight: FontWeight.w500,
  );
}

abstract class ThemeButton {
  static ButtonStyle cLoginButton = ElevatedButton.styleFrom(
    foregroundColor: const Color(0xFFFFFFFF),
    backgroundColor: const Color(0xFFF86C1D),
    padding: const EdgeInsets.symmetric(vertical: 0, horizontal: 18),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(12), 
    ),
    elevation: 0,
    alignment: Alignment.centerLeft
  );
}
