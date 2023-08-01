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
  final List<String> acceptPath = ['dashboard', 'wallet', 'income', 'menu'];

  @override
  Widget build(BuildContext context) {
    String? currentLocation = GoRouterState.of(context).fullPath!.split('/').last;
    
    double panelHeight = 400;
    if (acceptPath.contains(currentLocation)) panelHeight = 400;

    return SafeArea(
      child: Scaffold(
      body: Stack(
        children: [
          const KGoogleMap(),
          Align(
            alignment: Alignment.bottomCenter,
            child: Container(
              height: panelHeight,
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
              child: widget.child
            )
          ),
        ],
      ),
    ));
  }
}
