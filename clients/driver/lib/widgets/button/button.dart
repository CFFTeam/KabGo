import 'package:flutter/material.dart';
import 'styles.dart';

class WButton extends StatelessWidget {
  const WButton({
    Key? key,
    required this.onPressed,
    required this.text,
    this.icon,
    this.width,
    this.height,
    this.textStyle,
    this.buttonStyle,
    this.assetImage,
  }) : super(key: key);

  final VoidCallback onPressed;
  final String text;
  final double? width;
  final double? height;
  final TextStyle? textStyle;
  final ButtonStyle? buttonStyle;
  final Image? icon;
  final String? assetImage;

  @override
  Widget build(BuildContext context) {
    return Container(
      width: width,
      height: height,

      decoration: const BoxDecoration(
        borderRadius: BorderRadius.all(Radius.circular(12)),
        boxShadow: [
          BoxShadow(
            color: Color.fromARGB(30, 0, 0, 0),
            blurRadius: 8.0,
            spreadRadius: 0,
            offset: Offset(0, 1),
          ),
        ],
      ),
      child: ElevatedButton.icon(
          onPressed: onPressed,
          icon: Padding(
            padding: const EdgeInsets.only(top: 16, bottom: 16, right: 8, left: 8),
            child: Image(
              image: AssetImage(assetImage!),
              width: 25,
              height: 25,
            ),
          ),
          label: Text(
            text,
            textAlign: TextAlign.left,
            style: textStyle ?? ThemeText.gLoginText,
          ),
          style: buttonStyle ?? ThemeButton.gLoginButton
        )
    );
  }
}
