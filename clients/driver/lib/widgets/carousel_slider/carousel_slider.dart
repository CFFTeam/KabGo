import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'styles.dart';


class CSlider extends StatelessWidget {
  final List<Map<String, String>>? slideList;
  final Function(int, CarouselPageChangedReason)? onPageChanged;

  const CSlider({Key? key, @required this.slideList, @required this.onPageChanged}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return CarouselSlider(
      options: CarouselOptions(
        autoPlay: true,
        viewportFraction: 1,
        height: MediaQuery.of(context).size.height / 3,
        autoPlayInterval: const Duration(seconds: 4),
        autoPlayAnimationDuration: const Duration(milliseconds: 800),
        autoPlayCurve: Curves.easeInOut,
        scrollDirection: Axis.horizontal,
        onPageChanged: onPageChanged,
      ),
      items: slideList?.map((el) {
        return Builder(
          builder: (BuildContext context) {
            return Column(
              children: <Widget>[
                Image.asset(el.values.first),
                const SizedBox(height: 15),
                SizedBox(
                  width: 300,
                  child: Text(
                    el.values.last,
                    textAlign: TextAlign.center,
                    style: ThemeText.descriptionTextLight,
                  ),
                ),
              ],
            );
          },
        );
      }).toList(),
    );
  }
}
