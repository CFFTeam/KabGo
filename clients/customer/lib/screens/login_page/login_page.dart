// import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
// import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../functions/setHexColor.dart';
import '../../providers/auth_provider.dart';
import '../../providers/stepProvider.dart';

class LoginPage extends ConsumerStatefulWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends ConsumerState<LoginPage> {
  final FocusNode _phoneNumberFocus = FocusNode();
  final FocusNode _passwordFocus = FocusNode();

  @override
  Widget build(BuildContext context) {
    ref.read(stepProvider.notifier).setStep('login_page');
    return Scaffold(
      body: SingleChildScrollView(
        child: Container(
          padding: const EdgeInsets.fromLTRB(15, 70, 15, 0),
          color: Colors.white,
          child: Form(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // const FaIcon(
                //   FontAwesomeIcons.arrowLeft,
                //   color: Colors.black,
                //   size: 32,
                // ),
                const SizedBox(
                  height: 20,
                ),
                Text(
                  'Đăng nhập',
                  style: GoogleFonts.montserrat(
                      color: Colors.black,
                      fontSize: 24,
                      fontWeight: FontWeight.w700,
                      decoration: TextDecoration.none),
                ),
                const SizedBox(
                  height: 16,
                ),
                Text(
                  'Chào mừng bạn đến với ứng dụng Kab Go! \nHãy đăng nhập để khám phá sự tiện lợi tuyệt vời khi bạn lựa chọn chúng tôi là đối tác di chuyển đáng tin cậy của bạn.',
                  style: GoogleFonts.montserrat(
                    color: HexColor('A7A7A7'),
                    fontSize: 14,
                    fontWeight: FontWeight.w500,
                    decoration: TextDecoration.none,
                    letterSpacing: 0.5,
                  ),
                ),
                const SizedBox(height: 36),
                InkWell(
                  onTap: () {
                    FocusScope.of(context).requestFocus(_phoneNumberFocus);
                  },
                  child: Container(
                    height: 70,
                    width: double.infinity,
                    padding: const EdgeInsets.symmetric(
                      horizontal: 12,
                    ),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10),
                      color: HexColor('F9F9F9'),
                      border: Border.all(
                        width: 1,
                        color: HexColor('F2F2F2'),
                      ),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          'Số điện thoại',
                          style: GoogleFonts.montserrat(
                            color: Colors.black,
                            fontWeight: FontWeight.w600,
                            fontSize: 15,
                            decoration: TextDecoration.none,
                          ),
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        TextFormField(
                          focusNode: _phoneNumberFocus,
                          style: GoogleFonts.montserrat(
                              fontSize: 15,
                              color: Colors.black,
                              fontWeight: FontWeight.w500),
                          cursorColor: const Color.fromARGB(255, 106, 106, 106),
                          keyboardType: TextInputType.number,
                          maxLines: 1,
                          decoration: InputDecoration(
                            contentPadding: EdgeInsets.zero,
                            isDense: true,
                            border: InputBorder.none,
                            hintText: 'Nhập số điện thoại...',
                            hintStyle: GoogleFonts.montserrat(
                                fontSize: 14,
                                color: const Color.fromARGB(255, 197, 197, 197),
                                fontWeight: FontWeight.w500),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(
                  height: 28,
                ),
                InkWell(
                  onTap: () {
                    FocusScope.of(context).requestFocus(_passwordFocus);
                  },
                  child: Container(
                    height: 70,
                    width: double.infinity,
                    padding: const EdgeInsets.symmetric(
                      horizontal: 12,
                    ),
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10),
                      color: HexColor('F9F9F9'),
                      border: Border.all(
                        width: 1,
                        color: HexColor('F2F2F2'),
                      ),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(
                          'Mật khẩu',
                          style: GoogleFonts.montserrat(
                            color: Colors.black,
                            fontWeight: FontWeight.w600,
                            fontSize: 15,
                            decoration: TextDecoration.none,
                          ),
                        ),
                        const SizedBox(
                          height: 10,
                        ),
                        TextFormField(
                          focusNode: _passwordFocus,
                          style: GoogleFonts.montserrat(
                              fontSize: 15,
                              color: Colors.black,
                              fontWeight: FontWeight.w500),
                          cursorColor: const Color.fromARGB(255, 106, 106, 106),
                          maxLines: 1,
                          decoration: InputDecoration(
                            contentPadding: EdgeInsets.zero,
                            isDense: true,
                            border: InputBorder.none,
                            hintText: 'Nhập mật khẩu...',
                            hintStyle: GoogleFonts.montserrat(
                                fontSize: 14,
                                color: const Color.fromARGB(255, 197, 197, 197),
                                fontWeight: FontWeight.w500),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(
                  height: 15,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    InkWell(
                      onTap: () {},
                      child: Text(
                        'Bạn quên mật khẩu?',
                        style: GoogleFonts.montserrat(
                          color: HexColor('F86C1D'),
                          fontSize: 15,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    )
                  ],
                ),
                const SizedBox(
                  height: 50,
                ),
                SizedBox(
                  width: double.infinity,
                  height: 54,
                  child: ElevatedButton(
                    onPressed: () {},
                    child: Text('đăng nhập'.toUpperCase(),
                        style: Theme.of(context).textTheme.labelMedium),
                  ),
                ),
                const SizedBox(
                  height: 15,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    Text(
                      'Bạn chưa có tài khoản?',
                      style: GoogleFonts.montserrat(
                        color: Colors.black,
                        fontSize: 15,
                        fontWeight: FontWeight.w500,
                      ),
                    ),
                    const SizedBox(
                      width: 5,
                    ),
                    InkWell(
                      onTap: () {},
                      child: Text(
                        'Đăng kí',
                        style: GoogleFonts.montserrat(
                          color: HexColor('F86C1D'),
                          fontSize: 15,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    )
                  ],
                ),
                const SizedBox(
                  height: 36,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Container(
                      width: 150,
                      height: 2,
                      decoration: BoxDecoration(
                        color: HexColor('D9D9D9'),
                      ),
                    ),
                    const SizedBox(
                      width: 10,
                    ),
                    Text(
                      'OR',
                      style: GoogleFonts.montserrat(
                          color: HexColor('D9D9D9'),
                          fontWeight: FontWeight.w600),
                    ),
                    const SizedBox(
                      width: 10,
                    ),
                    Container(
                      width: 150,
                      height: 2,
                      decoration: BoxDecoration(
                        color: HexColor('D9D9D9'),
                      ),
                    ),
                  ],
                ),
                const SizedBox(
                  height: 28,
                ),
                Consumer(builder: (context, ref, _) {
                  final auth = ref.watch(authenticationProvider);

                  return SizedBox(
                    width: double.infinity,
                    height: 54,
                    child: OutlinedButton.icon(
                      onPressed: () async {
                        await auth.signInWithGoogle(context);
                      },
                      icon: Image.asset(
                        'lib/assets/google_logo.png',
                        width: 24,
                      ),
                      label: Text(
                        'Đăng nhập bằng Google',
                        style: GoogleFonts.montserrat(
                          color: HexColor('F86C1D'),
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ),
                  );
                }),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
