import 'package:driver/widgets/account_card/account_card.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class HomeVehicle extends ConsumerStatefulWidget {
  const HomeVehicle({Key? key}) : super(key: key);

  static const String name = 'HomeVehicle';
  static const String path = 'vehicle';

  @override
  ConsumerState<HomeVehicle> createState() => _HomeVehicleState();
}

class _HomeVehicleState extends ConsumerState<HomeVehicle> {
  @override
  Widget build(BuildContext context) {
    return Container(
        padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 12),
        decoration: const BoxDecoration(color: Color(0xFFF9F9F9)),
        child: Container(
          decoration: const BoxDecoration(
              color: Color(0xFFFFFFFF),
              borderRadius: BorderRadius.all(Radius.circular(5))),
          child: ListView(
            children: <Widget>[
              AccountCard(
                  iconPath: 'lib/assets/icons/money.png',
                  accountType: 'Tài khoản tiền mặt',
                  accountBalance: '40.000',
                  onPressed: () {}),
              AccountCard(
                iconPath: 'lib/assets/icons/credit.png',
                accountType: 'Tài khoản tín dụng',
                accountBalance: '60.000',
                onPressed: () {},
              ),
              AccountCard(
                iconPath: 'lib/assets/icons/zalo.png',
                accountType: 'Tài khoản ZaloPay',
                accountBalance: '00.000',
                onPressed: () {},
              ),
            ],
          ),
        ));
  }
}
