import 'package:flutter/material.dart';

class CIconButton extends StatelessWidget {
  const CIconButton({
    Key? key,
    required this.onPressed,
    required this.icon,
    this.backgroundColor,
    this.foregroundColor,
    this.padding,
    this.elevation,
    this.shape, this.borderSide,
  }) : super(key: key);

  final VoidCallback onPressed;
  final Widget icon;
  final Color? backgroundColor;
  final Color? foregroundColor;
  final BorderSide? borderSide;
  final EdgeInsetsGeometry? padding;
  final double? elevation;
  final OutlinedBorder? shape;

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: onPressed,
      style: ElevatedButton.styleFrom(
        side: borderSide,
        shape: shape ?? const CircleBorder(),
        padding: padding,
        backgroundColor: backgroundColor ?? Colors.white,
        foregroundColor: foregroundColor,
        elevation: elevation ?? 0,
      ),
      child: icon,
    );
  }
}
