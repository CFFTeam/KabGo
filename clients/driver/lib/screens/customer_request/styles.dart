
import 'package:flutter/material.dart';

abstract class ThemeText {
  static const TextStyle customerName = TextStyle(
    fontFamily: 'Montserrat',
    fontSize: 18,
    fontWeight: FontWeight.w600,
  );
  
  static const TextStyle ranking = TextStyle(
    fontFamily: 'Montserrat',
    fontSize: 13,
    fontWeight: FontWeight.w600,
  );

  static const TextStyle bookingDetails = TextStyle(
    fontFamily: 'Montserrat',
    fontSize: 13,
    color: Color(0xFFF86C1D),
    fontWeight: FontWeight.w600,
  );

  static const TextStyle locationDurationDetails = TextStyle(
    fontFamily: 'Montserrat',
    fontSize: 13,
    color: Color(0xFF6A6A6A),
    fontWeight: FontWeight.w500,
    height: 1.45,
  );

  static const TextStyle headingTitle = TextStyle(
    fontFamily: 'Montserrat',
    fontSize: 15,
    fontWeight: FontWeight.w600,
  );
  
  static const TextStyle locationDetails = TextStyle(
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: FontWeight.w500,
    color: Color(0xFF6A6A6A),
  );

  static const TextStyle cancelButtonText = TextStyle(
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: FontWeight.bold,
    color: Color(0xFFF42525),
  );
  
  static const TextStyle acceptButtonText = TextStyle(
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: FontWeight.bold,
    color: Color(0xFFFFFFFF),
  );
}

abstract class ThemeButton {
  static ButtonStyle cancelButton = ElevatedButton.styleFrom(
    padding: const EdgeInsets.all(18),
    backgroundColor: Colors.white,
    foregroundColor: Colors.grey[500],
    side: const BorderSide(
      color: Color(0xFFF42525),
      width: 2,
    ),
    elevation: 0,
  );

  static ButtonStyle acceptButton = ElevatedButton.styleFrom(
    padding: const EdgeInsets.only(left: 3, right: 36, top: 18, bottom: 18),
    backgroundColor: const Color(0xFF5EA944),
    foregroundColor: Colors.grey[600],
    side: const BorderSide(
      color: Color(0xFF5EA944),
      width: 2,
    ),
    elevation: 0,
  );
  
  static ButtonStyle acceptButton2 = ElevatedButton.styleFrom(
    padding: const EdgeInsets.only(left: 18, right: 18, top: 18, bottom: 18),
    backgroundColor: const Color(0xFF5EA944),
    foregroundColor: Colors.grey[600],
    side: const BorderSide(
      color: Color(0xFF5EA944),
      width: 2,
    ),
    elevation: 0,
  );
}