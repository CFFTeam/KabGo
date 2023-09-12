import 'package:driver/screens/home_dashboard/styles.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class HomeDashboard extends ConsumerStatefulWidget {
  const HomeDashboard({Key? key}) : super(key: key);

  static const String name = 'HomeDashboard';
  static const String path = '/';

  @override
  ConsumerState<HomeDashboard> createState() => _HomeDashboardState();
}

class _HomeDashboardState extends ConsumerState<HomeDashboard> {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 16, horizontal: 20),
      decoration: const BoxDecoration(
        color: Color(0xFFF9F9F9)
      ),
      child: SingleChildScrollView(
        child: SizedBox(
          height: 200,
          child: Column(
            children: [
              const Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Mô hình', style: ThemeText.titleText),
                      SizedBox(height: 5),
                      Text('Xe Oto con', style: ThemeText.vehicleText),
                    ],
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Text('Tài khoản', style: ThemeText.titleText),
                      SizedBox(height: 5),
                      Text('100.000đ', style: ThemeText.accountText),
                    ],
                  ),
                ]
              ),
              const SizedBox(height: 16),
              Expanded(
                child: Container(
                  padding: const EdgeInsets.symmetric(vertical: 14, horizontal: 22),
                  decoration: const BoxDecoration(
                    color: Color.fromARGB(255, 226, 125, 78),
                    borderRadius: BorderRadius.all(Radius.circular(8)),
                  ),
                  child: const Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Spacer(),
                          Text('Tỉ lệ nhận', style: ThemeText.analysisTitleText),
                          Spacer(),
                          Spacer(),
                          Icon(FontAwesomeIcons.check, color: Colors.white, size: 28),
                          SizedBox(height: 6),
                          Text('0.0%', style: ThemeText.analysisPercentTextText),
                          Spacer(),
                        ],
                      ),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Spacer(),
                          Text('Tỉ lệ hủy', style: ThemeText.analysisTitleText),
                          Spacer(),
                          Spacer(),
                          Icon(FontAwesomeIcons.ban, color: Colors.white, size: 28),
                          SizedBox(height: 6),
                          Text('0.0%', style: ThemeText.analysisPercentTextText),
                          Spacer(),
                        ],
                      ),
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Spacer(),
                          Text('Đánh giá', style: ThemeText.analysisTitleText),
                          Spacer(),
                          Spacer(),
                          Icon(FontAwesomeIcons.star, color: Colors.white, size: 28),
                          SizedBox(height: 6),
                          Text('5.00', style: ThemeText.analysisPercentTextText),
                          Spacer(),
                        ],
                      ),
                    ]
                  ),
                )
              ),
            ],
          ),
        ),
      ),
    );
  }
}
