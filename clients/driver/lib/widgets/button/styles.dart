import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';

abstract class ThemeText {
  static const TextStyle gLoginText = TextStyle(
    fontFamily: 'Montserrat',
    fontSize: 16,
    fontWeight: FontWeight.w500,
  );
}

abstract class ThemeButton {
  static ButtonStyle gLoginButton = ElevatedButton.styleFrom(
    foregroundColor: const Color(0xFF7A7A7A),
    backgroundColor: const Color(0xFFFFFFFF),
    padding: const EdgeInsets.symmetric(vertical: 0, horizontal: 15),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(15), 
    ),
    elevation: 0,
    alignment: Alignment.centerLeft,
  );
}
