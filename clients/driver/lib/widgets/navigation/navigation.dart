import 'package:flutter/material.dart';

import '../icon_button/icon_button.dart';

class CNavigationItem extends StatelessWidget {
  const CNavigationItem({
    Key? key,
    required this.onPressed,
    required this.icon,
    this.backgroundColor,
    this.foregroundColor,
    this.padding,
    this.elevation,
    this.shape,
    this.gap,
    required this.label,
    required this.activeColor,
    this.isActive,
    this.textColor,
  }) : super(key: key);

  final VoidCallback onPressed;
  final Icon icon;
  final double? gap;
  final String label;
  final Color? backgroundColor;
  final Color? foregroundColor;
  final EdgeInsetsGeometry? padding;
  final double? elevation;
  final OutlinedBorder? shape;
  final Color activeColor;
  final Color? textColor;
  final bool? isActive;

  @override
  Widget build(BuildContext context) {
    return CIconButton(
      onPressed: onPressed,
      shape: shape ?? const CircleBorder(),
      padding: padding ?? const EdgeInsets.all(0),
      icon: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          Container(
              padding:
                  gap != null ? EdgeInsets.all(gap!) : const EdgeInsets.all(0),
              child: Icon(icon.icon,
                  color: isActive! ? activeColor : icon.color,
                  size: icon.size)),
          Text(label,
              style: TextStyle(
                  fontFamily: 'Montserrat',
                  color: isActive! ? activeColor : textColor ?? const Color(0xFF000000),
                  fontSize: 12,
                  fontWeight: FontWeight.w600))
        ],
      ),
      foregroundColor: textColor ?? const Color(0xFF000000),
    );
  }
}

class CNavigation extends StatefulWidget {
  final List<CNavigationItem> items;

  const CNavigation({Key? key, required this.items}) : super(key: key);

  @override
  State<CNavigation> createState() => _CNavigationState();
}

class _CNavigationState extends State<CNavigation> {
  late String _selectedButton = "";

  @override
  void initState() {
    super.initState();
    _selectedButton = widget.items[0].label;
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceAround,
      children: widget.items.map((e) => CNavigationItem(
        onPressed: () {
          if (_selectedButton != e.label) {
            setState(() {
              _selectedButton = e.label;
            });

            e.onPressed();
          }
        },
        icon: e.icon,
        backgroundColor: e.backgroundColor,
        foregroundColor: e.foregroundColor,
        padding: e.padding,
        elevation: e.elevation,
        shape: e.shape,
        gap: e.gap,
        label: e.label,
        activeColor: e.activeColor,
        isActive: _selectedButton == e.label ? true : false,
        textColor: e.textColor)
      ).toList(),
    );
  }
}
