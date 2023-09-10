
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class RoutePanel extends ConsumerStatefulWidget {
  const RoutePanel({Key? key, required this.child}) : super(key: key);

  final Widget child;

  @override
  ConsumerState<RoutePanel> createState() => _RoutePanelState();
}

class _RoutePanelState extends ConsumerState<RoutePanel> {
  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(20),
          topRight: Radius.circular(20),
        ),
        boxShadow: [
          BoxShadow(
            color: Color.fromRGBO(0, 0, 0, 0.1),
            blurRadius: 10,
            offset: Offset(0, 0),
          ),
        ],
      ),
      child: Center(
        child: widget.child,
      ),
    );
  }
}