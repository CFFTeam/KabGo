import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../functions/setHexColor.dart';

class CompletePanel extends StatefulWidget {
  const CompletePanel({Key? key}) : super(key: key);

  @override
  _CompletePanelState createState() => _CompletePanelState();
}

class _CompletePanelState extends State<CompletePanel> {
  var rating = -1;
  final inputController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        color: Color.fromARGB(255, 255, 255, 255),
        borderRadius: BorderRadius.vertical(
          top: Radius.circular(20),
        ),
      ),
      padding: const EdgeInsets.fromLTRB(0, 0, 0, 30),
      // height: 300,
      width: MediaQuery.of(context).size.width,
      height: 400,
      alignment: Alignment.topLeft,
      clipBehavior: Clip.hardEdge,
      child:
          Column(mainAxisAlignment: MainAxisAlignment.spaceBetween, children: [
        Container(
          width: double.infinity,
          height: 80,
          alignment: Alignment.center,
          decoration: BoxDecoration(color: HexColor('FE8248')),
          child: const Text(
            'Bạn đã đến nơi',
            style: TextStyle(
                color: Colors.white, fontSize: 20, fontWeight: FontWeight.w700),
          ),
        ),
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 15),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Row(
                children: [
                  Container(
                    width: 64,
                    height: 64,
                    decoration: const BoxDecoration(
                      color: Colors.grey,
                      borderRadius: BorderRadius.all(
                        Radius.circular(10),
                      ),
                    ),
                  ),
                  const SizedBox(
                    width: 12,
                  ),
                  SizedBox(
                    height: 64,
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        const SizedBox(
                          width: 170,
                          child: Text(
                            'Trần Gia Huy',
                            style: TextStyle(
                              color: Colors.black,
                              fontWeight: FontWeight.w700,
                              fontSize: 18,
                              height: 1,
                            ),
                          ),
                        ),
                        SizedBox(
                          width: 170,
                          child: Text(
                            // driverModel.vehicle['name'],
                            'Toyota Vios',
                            style: TextStyle(
                              color: HexColor('6A6A6A'),
                              fontWeight: FontWeight.w700,
                              fontSize: 15,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const Spacer(),
                  Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [
                          const Text(
                            '4.8',
                            style: TextStyle(
                              color: Colors.black,
                              fontWeight: FontWeight.w700,
                              fontSize: 16,
                            ),
                          ),
                          const SizedBox(
                            width: 4,
                          ),
                          ...List.generate(
                            5,
                            (index) => Container(
                              margin: const EdgeInsets.only(bottom: 3, left: 2),
                              child: const FaIcon(
                                FontAwesomeIcons.solidStar,
                                color: Color.fromARGB(255, 245, 221, 4),
                                size: 14,
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(
                        height: 6,
                      ),
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 18, vertical: 6),
                        decoration: BoxDecoration(
                          color: HexColor('FFF4EF'),
                          border: Border.all(
                            width: 1,
                            color: HexColor('FFB393'),
                          ),
                        ),
                        child: Text(
                          // driverModel.vehicle['number'],
                          '54C1-4525.12',
                          style: Theme.of(context).textTheme.displayMedium,
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              const SizedBox(
                height: 40,
              ),
              Column(
                children: [
                  const Text(
                    'Hành trình của bạn thế nào?',
                    style: TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.w700,
                      fontSize: 18,
                      height: 1,
                      wordSpacing: 2,
                    ),
                  ),
                  const SizedBox(
                    height: 12,
                  ),
                  SizedBox(
                    width: 280,
                    child: Text(
                      'Đánh giá để giúp tài xế cải thiện hơn chuyến đi của họ',
                      textAlign: TextAlign.center,
                      style: GoogleFonts.montserrat(
                          color: HexColor('6A6A6A'),
                          fontWeight: FontWeight.w500,
                          letterSpacing: 0.4,
                          fontSize: 15),
                    ),
                  ),
                  const SizedBox(
                    height: 20,
                  ),
                  StatefulBuilder(
                    builder: (context, setRatingState) => Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        ...List.generate(
                          5,
                          (index) => InkWell(
                            onTap: () {
                              setRatingState(
                                () {
                                  rating = index;
                                },
                              );
                            },
                            child: Container(
                              margin:
                                  const EdgeInsets.only(bottom: 3, left: 10),
                              child: rating < index
                                  ? const FaIcon(
                                      FontAwesomeIcons.star,
                                      color: Color.fromARGB(255, 245, 221, 4),
                                      size: 32,
                                    )
                                  : const FaIcon(
                                      FontAwesomeIcons.solidStar,
                                      color: Color.fromARGB(255, 245, 221, 4),
                                      size: 32,
                                    ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(
                    height: 24,
                  ),
                  SizedBox(
                    width: 340,
                    child: TextFormField(
                      controller: inputController,
                      maxLines: 4,
                      style: GoogleFonts.montserrat(
                          color: Colors.black,
                          fontWeight: FontWeight.w500,
                          fontSize: 14,
                          height: 1.25,
                          letterSpacing: 0.25),
                      decoration: InputDecoration(
                        hintText: 'Ghi chú cho tài xế...',
                        hintStyle: GoogleFonts.montserrat(
                          color: HexColor('A6A6A6'),
                          fontWeight: FontWeight.w500,
                          fontSize: 14,
                        ),
                        contentPadding:
                            const EdgeInsets.fromLTRB(18, 12, 18, 16),
                        fillColor: const Color.fromARGB(255, 249, 249, 249),
                        filled: true,
                        isDense: true,
                        enabledBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(10),
                          borderSide: const BorderSide(
                            width: 1,
                            color: Color.fromARGB(255, 242, 242, 242),
                          ),
                        ),
                        focusedBorder: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(10),
                          borderSide: const BorderSide(
                            width: 1,
                            color: Color.fromARGB(255, 242, 242, 242),
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
              const SizedBox(
                height: 35,
              ),
              SizedBox(
                width: double.infinity,
                height: 54,
                child: ElevatedButton(
                  onPressed: () {},
                  child: Text('hoàn tất'.toUpperCase(),
                      style: Theme.of(context).textTheme.labelMedium),
                ),
              ),
            ],
          ),
        ),
      ]),
    );
  }
}
