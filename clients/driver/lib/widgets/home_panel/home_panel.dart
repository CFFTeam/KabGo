import 'package:driver/widgets/icon_button/icon_button.dart';
import 'package:driver/widgets/navigation/navigation.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'dart:math' as math;

import 'package:go_router/go_router.dart';

import 'styles.dart';

class HomePanel extends StatefulWidget {
  const HomePanel({Key? key, required this.child}) : super(key: key);

  static const String name = 'HomeScreen';
  static const String path = '/home';

  final Widget child;

  @override
  State<HomePanel> createState() => _HomePanelState();
}

class _HomePanelState extends State<HomePanel> {
  late bool _active = false;

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
        child: Column(
          children: <Widget>[
            Container(
              padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 5),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  CIconButton(
                      onPressed: () {},
                      icon: Transform.rotate(
                          angle: 180 * math.pi / 180,
                          child: const Icon(FontAwesomeIcons.sliders,
                              color: Color(0xFF6A6A6A))),
                      padding: const EdgeInsets.all(10),
                      foregroundColor: const Color(0xFF6A6A6A)),
                  Expanded(
                      child: Text(
                          _active ? 'Đang hoạt động' : 'Không hoạt động',
                          style: _active
                              ? ThemeText.statusActiveText
                              : ThemeText.statusText,
                          textAlign: TextAlign.center)),
                  CIconButton(
                    onPressed: () {
                      setState(() {
                        _active = !_active;
                      });
                    },
                    icon: Icon(FontAwesomeIcons.powerOff,
                        color: _active == true
                            ? const Color(0xFFF86C1D)
                            : const Color(0xFF6A6A6A),
                        size: 19),
                    padding: const EdgeInsets.all(12),
                    borderSide: BorderSide(
                      color: _active == true
                          ? const Color(0xFFFFB393)
                          : const Color(0xFFEDEDED),
                      width: 1,
                    ),
                    backgroundColor: _active == true
                        ? const Color(0xFFFFF4EF)
                        : const Color(0xFFEDEDED),
                    foregroundColor: _active == true
                        ? const Color(0xFFFFF4EF)
                        : const Color(0xFF6A6A6A),
                    elevation: 0,
                  ),
                ],
              ),
            ),
            Expanded(child: widget.child),
            CNavigation(items: [
              CNavigationItem(
                onPressed: () {
                  context.go('/');
                },
                // shape: const ContinuousRectangleBorder(),
                padding: const EdgeInsets.all(16),
                gap: 9,
                icon: const Icon(FontAwesomeIcons.house, size: 20),
                label: 'Trang chủ',
                textColor: const Color(0xFF6A6A6A),
                foregroundColor: const Color(0xFF6A6A6A),
                activeColor: const Color(0xFFF86C1D),
              ),
              CNavigationItem(
                onPressed: () {
                  context.go('/wallet');
                },
                // shape: const ContinuousRectangleBorder(),
                padding: const EdgeInsets.all(21),
                gap: 9,
                icon: const Icon(FontAwesomeIcons.wallet, size: 20),
                label: 'Ví tiền',
                textColor: const Color(0xFF6A6A6A),
                foregroundColor: const Color(0xFF6A6A6A),
                activeColor: const Color(0xFFF86C1D),
              ),
              CNavigationItem(
                onPressed: () {
                  context.go('/wallet/income');
                },
                // shape: const ContinuousRectangleBorder(),
                padding: const EdgeInsets.all(16),
                gap: 9,
                icon: const Icon(FontAwesomeIcons.chartSimple, size: 20),
                label: 'Thu nhập',
                textColor: const Color(0xFF6A6A6A),
                foregroundColor: const Color(0xFF6A6A6A),
                activeColor: const Color(0xFFF86C1D),
              ),
              CNavigationItem(
                onPressed: () {},
                // shape: const ContinuousRectangleBorder(),
                padding: const EdgeInsets.all(16),
                gap: 7,
                icon: const Icon(Icons.widgets, size: 24),
                label: 'Xem thêm',
                textColor: const Color(0xFF6A6A6A),
                foregroundColor: const Color(0xFF6A6A6A),
                activeColor: const Color(0xFFF86C1D),
              ),
            ]),
          ],
        ));
  }
}
