import 'package:customer/models/driver_model.dart';
import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../functions/setHexColor.dart';

class NotificationBottomSheet extends StatelessWidget {
  const NotificationBottomSheet({Key? key, required this.driverModel})
      : super(key: key);

  final DriverModel driverModel;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 300,
      padding: const EdgeInsets.symmetric(vertical: 24, horizontal: 15),
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
            children: [
              Container(
                width: 64,
                height: 64,
                clipBehavior: Clip.hardEdge,
                decoration: const BoxDecoration(
                  color: Colors.grey,
                  borderRadius: BorderRadius.all(
                    Radius.circular(10),
                  ),
                ),
                child: Image.network(driverModel.avatar!),
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
                    SizedBox(
                      width: 170,
                      child: Text(
                        driverModel.name!,
                        style: const TextStyle(
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
                        driverModel.vehicle['name'],
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
                          (index) => const Padding(
                                padding: EdgeInsets.only(bottom: 3, left: 2),
                                child: FaIcon(
                                  FontAwesomeIcons.solidStar,
                                  color: Color.fromARGB(255, 245, 221, 4),
                                  size: 14,
                                ),
                              ))
                    ],
                  ),
                  const SizedBox(
                    height: 6,
                  ),
                  Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 18, vertical: 6),
                    decoration: BoxDecoration(
                      color: HexColor('FFF4EF'),
                      border: Border.all(
                        width: 1,
                        color: HexColor('FFB393'),
                      ),
                    ),
                    child: Text(
                      driverModel.vehicle['number'],
                      style: Theme.of(context).textTheme.displayMedium,
                    ),
                  ),
                ],
              ),
            ],
          ),
          const SizedBox(
            height: 24,
          ),
          Text(
            'Tài xế của bạn đã đến',
            style: GoogleFonts.montserrat(
                color: HexColor('29BD11'),
                fontWeight: FontWeight.w600,
                fontSize: 18),
            textAlign: TextAlign.start,
          ),
          const SizedBox(
            height: 14,
          ),
          Text(
            'Hãy quan sát xung quanh hoặc liên hệ với tài xế để có thể bắt đầu chuyến xe sớm nhất',
            style: Theme.of(context).textTheme.bodyMedium,
          ),
          const Spacer(),
          SizedBox(
            width: double.infinity,
            height: 54,
            child: ElevatedButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: Text('OK'.toUpperCase(),
                  style: Theme.of(context).textTheme.labelMedium),
            ),
          ),
        ],
      ),
    );
  }
}
