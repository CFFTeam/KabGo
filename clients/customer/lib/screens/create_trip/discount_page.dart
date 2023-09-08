import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import '../../data/data.dart';
import '../../functions/setHexColor.dart';
import '../../widgets/discount_item.dart';

class DiscountPage extends StatefulWidget {
  const DiscountPage({Key? key, required this.chooseItem}) : super(key: key);

  final void Function(String value) chooseItem;

  @override
  _DiscountPageState createState() => _DiscountPageState();
}

class _DiscountPageState extends State<DiscountPage> {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 600,
      padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 15),
      decoration: const BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(20),
          topRight: Radius.circular(20),
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'Danh sách ưu đãi',
                style: Theme.of(context).textTheme.bodySmall,
              ),
              const Spacer(),
              InkWell(
                onTap: () {
                  Navigator.pop(context);
                },
                child: FaIcon(
                  FontAwesomeIcons.xmark,
                  size: 28,
                  color: HexColor('fe8248'),
                ),
              ),
            ],
          ),
          const SizedBox(
            height: 24,
          ),
          Expanded(
            child: ListView.builder(
              padding: const EdgeInsets.all(0),
              itemCount: discountList.length,
              itemBuilder: (context, index) => Column(
                children: [
                  DiscountItem(
                    data: discountList[index],
                    chooseDiscount: () {
                      widget.chooseItem(discountList[index]['name']!);
                      Navigator.pop(context);
                    },
                  ),
                  const SizedBox(
                    height: 15,
                  ),
                ],
              ),
            ),
          )
        ],
      ),
    );
  }
}
