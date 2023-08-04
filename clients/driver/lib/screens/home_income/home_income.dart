import 'package:driver/widgets/icon_button/icon_button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class HomeIncome extends ConsumerStatefulWidget {
  const HomeIncome({Key? key}) : super(key: key);

  static const String name = 'HomeIncome';
  static const String path = 'income';

  @override
  ConsumerState<HomeIncome> createState() => _HomeIncomeState();
}

class _HomeIncomeState extends ConsumerState<HomeIncome> {
  @override
  Widget build(BuildContext context) {
    return Container(
        padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 12),
        decoration: const BoxDecoration(color: Color.fromARGB(255, 226, 125, 78)),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: <Widget>[
            const Text('Truy cập nhanh', 
              style: TextStyle(
                color: Colors.white,
                fontSize: 13,
                fontWeight: FontWeight.bold
              ),
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 14),
            Container(
              padding: const EdgeInsets.symmetric(vertical: 0, horizontal: 28),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: <Widget>[
                  Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      CIconButton(
                        padding: const EdgeInsets.only(right: 17, left: 12, top: 12, bottom: 12),
                        borderSide: const BorderSide(
                          color: Color(0xFFFFB393),
                          width: 1,
                        ),
                        backgroundColor: Colors.white,
                        foregroundColor: const Color(0xFFF86C1D),
                        onPressed: () {}, 
                        icon: const Icon(FontAwesomeIcons.moneyBillTransfer, size: 20),
                      ),
                      const SizedBox(height: 6),
                      const Text('Chuyển tiền', style: TextStyle(
                          color: Colors.white,
                          fontSize: 12,
                          fontWeight: FontWeight.w600
                        )
                      )
                    ],
                  ),
                  Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      CIconButton(
                        padding: const EdgeInsets.only(right: 12, left: 12, top: 12, bottom: 12),
                        borderSide: const BorderSide(
                          color: Color(0xFFFFB393),
                          width: 1,
                        ),
                        backgroundColor: Colors.white,
                        foregroundColor: const Color(0xFFF86C1D),
                        onPressed: () {}, 
                        icon: const Icon(FontAwesomeIcons.clockRotateLeft, size: 20),
                      ),
                      const SizedBox(height: 6),
                      const Text('Lịch sử', style: TextStyle(
                          color: Colors.white,
                          fontSize: 12,
                          fontWeight: FontWeight.w600
                        )
                      )
                    ],
                  ),
                  Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: <Widget>[
                      CIconButton(
                        padding: const EdgeInsets.only(right: 12, left: 12, top: 12, bottom: 12),
                        borderSide: const BorderSide(
                          color: Color(0xFFFFB393),
                          width: 1,
                        ),
                        backgroundColor: Colors.white,
                        foregroundColor: const Color(0xFFF86C1D),
                        onPressed: () {}, 
                        icon: const Icon(FontAwesomeIcons.gem, size: 20),
                      ),
                      const SizedBox(height: 6),
                      const Text('Tiền thưởng', style: TextStyle(
                          color: Colors.white,
                          fontSize: 12,
                          fontWeight: FontWeight.w600
                        )
                      )
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 18),
            Expanded(child: Row(
                children: <Widget>[
                  Expanded(
                    child: Container(
                      padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 12),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(5)
                      ),
                      child: const Column(
                        children: <Widget>[
                          Text('Thu nhập hôm nay',
                            style: TextStyle(
                              color: Colors.black,
                              fontSize: 12,
                              fontWeight: FontWeight.w500
                            ),
                          ),
                          Spacer(),
                          Text('40.000 VND',
                            style: TextStyle(
                              color: Colors.black,
                              fontSize: 16,
                              fontWeight: FontWeight.bold
                            ),
                          ),
                          Spacer(),
                        ],
                      ),
                    ),
                  ),
                  const SizedBox(width: 12),
                  Expanded(
                    child: Container(
                      padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 12),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(5)
                      ),
                      child: const Column(
                        children: <Widget>[
                          Text('Thu nhập tuần này',
                            style: TextStyle(
                              color: Colors.black,
                              fontSize: 12,
                              fontWeight: FontWeight.w500
                            ),
                          ),
                          Spacer(),
                          Text('100.000 VND',
                            style: TextStyle(
                              color: Colors.black,
                              fontSize: 16,
                              fontWeight: FontWeight.bold
                            ),
                          ),
                          Spacer(),
                        ],
                      ),
                    ),
                  ),
                ],
              )
            ),
          ],
        ),
      );
  }
}
