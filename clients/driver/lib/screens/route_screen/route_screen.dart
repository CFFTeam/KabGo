import 'package:driver/providers/route_provider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_html/flutter_html.dart';
import 'package:html/dom.dart' as dom;

import 'styles.dart';

class RouteScreen extends ConsumerStatefulWidget {
  const RouteScreen({Key? key}) : super(key: key);

  static String name = 'RouteScreen';
  static String path = '/route';

  @override
  ConsumerState<RouteScreen> createState() => _RouteScreenState();
}

class _RouteScreenState extends ConsumerState<RouteScreen> {
  @override
  Widget build(BuildContext context) {
    final route = ref.watch(routeProvider);

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
      child: SingleChildScrollView(
        child: SizedBox(
          height: 200,
          child: Column(
            children: <Widget>[
              const Padding(
                padding: EdgeInsets.all(18),
                child: Text('Chỉ dẫn hành trình', style: ThemeText.headingTitle),
              ),
              Padding(
                padding:
                    const EdgeInsets.symmetric(horizontal: 12, vertical: 0),
                child: Html(data: """${route.instruction}"""),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
