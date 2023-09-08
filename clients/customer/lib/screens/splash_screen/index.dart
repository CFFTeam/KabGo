import 'package:flutter/material.dart';
import 'styles.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';

class SplashScreen extends StatelessWidget {
  static const String path = '/splash';
  static const String name = 'SplashPage';

  const SplashScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
        backgroundColor: Color(0xFFFFFFFF),
        body: Center(
          child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Spacer(),
                Spacer(),
                Spacer(),
                Image(
                  image: AssetImage('lib/assets/logo.png'),
                ),
                SizedBox(height: 15),
                Text(
                  "KabGo",
                  style: ThemeText.headingText,
                ),
                SizedBox(height: 15),
                Text(
                  "Chào mừng bạn trở lại!",
                  textAlign: TextAlign.center,
                  style: ThemeText.descriptionText,
                ),
                Spacer(),
                SpinKitThreeBounce(
                  color: Color(0xFFF86C1D),
                  size: 30.0,
                ),
                Spacer(),
                Text(
                  'ĐANG KHỞI ĐỘNG\nVUI LÒNG CHỜ TRONG GIÂY LÁT',
                  textAlign: TextAlign.center,
                  style: ThemeText.startupText,
                ),
                Spacer(),
                Spacer(),
                Spacer(),
                Spacer(),
              ]),
        ));
  }
}
