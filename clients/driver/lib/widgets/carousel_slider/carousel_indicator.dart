import 'package:smooth_page_indicator/smooth_page_indicator.dart';
import 'package:flutter/material.dart';

class CIndicator extends StatelessWidget {
  final int? activeIndex;
  final int? count;

  const CIndicator({Key? key, @required this.activeIndex, @required this.count})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return AnimatedSmoothIndicator(
      activeIndex: activeIndex!,
      count: count!,
      effect: const ExpandingDotsEffect(
        activeDotColor: Color(0xFFF86C1D),
        dotColor: Color(0xFFFFF4EF),
        dotHeight: 8,
        dotWidth: 8,
        spacing: 9,
      ),
    );
  }
}