import 'package:driver/widgets/google_map/google_map.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({Key? key, required this.child}) : super(key: key);

  final Widget child;

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final List<String> acceptPath = ['/', '/wallet', '/wallet/income', '/customer/request', '/customer/request/accept'];

  @override
  Widget build(BuildContext context) {
    String? currentLocation =
        GoRouterState.of(context).fullPath!;

    double panelHeight = 400;
    if (acceptPath.contains(currentLocation)) {
      panelHeight = 400;
    } else {
      panelHeight = 500;
    }

    return SafeArea(
        child: Scaffold(
      body: Stack(
        children: [
          Container(
            padding: EdgeInsets.only(bottom: (panelHeight - 100)),
            child: const KGoogleMap()),
          Align(
            alignment: Alignment.bottomCenter,
            child: AnimatedContainer(
              duration: const Duration(milliseconds: 250),
              curve: Curves.easeInOut,
              height: panelHeight,
              decoration: const BoxDecoration(
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(20),
                  topRight: Radius.circular(20),
                ),
              ),
              child: widget.child
            ),
          ),
        ],
      ),
    ));
  }
}
