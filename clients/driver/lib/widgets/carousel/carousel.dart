import 'package:driver/widgets/carousel_slider/carousel_indicator.dart';
import 'package:driver/widgets/carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';

const slideList = [
  {
    'image': 'lib/assets/images/welcomes/welcome1.png',
    'description':
        'Bạn đã sẵn sàng khám phá hành trình linh hoạt và tăng thu nhập?'
  },
  {
    'image': 'lib/assets/images/welcomes/welcome2.png',
    'description':
        'Chúng tôi sẵn lòng hỗ trợ bạn trên con đường lái xe thành công.'
  },
  {
    'image': 'lib/assets/images/welcomes/welcome3.png',
    'description':
        'Hãy cùng nhau khởi động và tận hưởng trải nghiệm lái xe đáng giá nhé!'
  }
];

class Carousel extends StatefulWidget {
  const Carousel({Key? key}) : super(key: key);

  @override
  State<Carousel> createState() => _CarouselState();
}

class _CarouselState extends State<Carousel> {
  int activeIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        CSlider(
          slideList: slideList,
          onPageChanged: (index, reason) => {
            setState(() {
              activeIndex = index;
            })
          }
        ),
        const SizedBox(height: 18),
        CIndicator(activeIndex: activeIndex, count: slideList.length),
      ],
    );
  }
}
