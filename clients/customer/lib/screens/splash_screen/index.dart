import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'styles.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';

class SplashScreen extends ConsumerStatefulWidget {
  const SplashScreen({Key? key}) : super(key: key);

  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends ConsumerState<SplashScreen> {
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
  }

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
