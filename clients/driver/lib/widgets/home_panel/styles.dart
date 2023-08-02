import 'package:flutter/widgets.dart';

abstract class ThemeText {
  static const TextStyle statusText = TextStyle(
    fontFamily: 'Montserrat', 
    color: Color(0xFF6A6A6A), 
    fontSize: 15,
    fontWeight: FontWeight.w600
  );
  
  static const TextStyle statusActiveText = TextStyle(
    fontFamily: 'Montserrat', 
    color: Color(0xFF5EA944), 
    fontSize: 15,
    fontWeight: FontWeight.w600
  );
  
  static const TextStyle navbarText = TextStyle(
    fontFamily: 'Montserrat', 
    color: Color(0xFF6A6A6A), 
    fontSize: 12,
    fontWeight: FontWeight.w600
  );
}
