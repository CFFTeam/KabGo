import 'package:driver/providers/auth_provider.dart';
import 'package:driver/widgets/carousel/carousel.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../firebase/auth/google_sign_in.dart';
import '../../widgets/button/button.dart';
import 'styles.dart';

class WelcomeScreen extends StatelessWidget {
  static const String path = '/welcome';
  static const String name = 'WelcomePage';

  const WelcomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: const Color(0xFFFFFFFF),
        body: Center(
          child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: <Widget>[
                const Column(
                  children: <Widget>[
                    SizedBox(height: 39),
                    Image(
                      image: AssetImage('lib/assets/logo.png'),
                    ),
                    SizedBox(height: 15),
                    Text(
                      "KabGo Driver",
                      style: ThemeText.headingText,
                    ),
                    SizedBox(height: 8),
                    Text(
                      "Nâng tầm trải nghiệm\nMở rộng cơ hội tìm kiếm thu nhập",
                      textAlign: TextAlign.center,
                      style: ThemeText.descriptionText,
                    ),
                    SizedBox(height: 25),
                  ],
                ),
                const Carousel(),
                Column(children: <Widget>[
                  const SizedBox(height: 35),
                  const Text("THAM GIA NGAY VỚI CHÚNG TÔI",
                      style: ThemeText.joinusText),
                  const SizedBox(height: 24),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 25),
                    child: Column(
                      children: [
                        Consumer(builder: (context, ref, _) {
                          final auth = ref.watch(authenticationProvider);

                          return WButton(
                              width: double.infinity,
                              text: 'Tiếp tục với tài khoản Google',
                              onPressed: () async {
                                await auth.signInWithGoogle(context);
                              },
                              assetImage: 'lib/assets/images/auths/google.png');
                        }),
                        const SizedBox(height: 16),
                        WButton(
                            width: double.infinity,
                            text: 'Đăng ký tài khoản KabGo',
                            onPressed: () {},
                            assetImage: 'lib/assets/images/auths/kabgo.png',
                            buttonStyle: ThemeButton.cLoginButton)
                      ],
                    ),
                  ),
                ]),
              ]),
        ));
  }
}
