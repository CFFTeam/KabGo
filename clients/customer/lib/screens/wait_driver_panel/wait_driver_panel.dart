import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_fonts/google_fonts.dart';

import '../../functions/convertTimeFormat.dart';
import '../../functions/setHexColor.dart';
import '../../models/driver_model.dart';
import '../../models/location_model.dart';
import '../../models/route_model.dart';
import '../../providers/arrivalLocationProvider.dart';
import '../../providers/departureLocationProvider.dart';
import '../../providers/driverProvider.dart';
import '../../providers/routeProvider.dart';
import '../../providers/stepProvider.dart';

class WaitDriverPanel extends ConsumerStatefulWidget {
  const WaitDriverPanel({Key? key}) : super(key: key);

  @override
  _WaitDriverPanelState createState() => _WaitDriverPanelState();
}

class _WaitDriverPanelState extends ConsumerState<WaitDriverPanel> {
  Widget widgetText = Text(
    'Tài xế của bạn đang đến...',
    style: GoogleFonts.montserrat(
        color: HexColor('6A6A6A'), fontWeight: FontWeight.w600, fontSize: 18),
    textAlign: TextAlign.start,
  );
  @override
  Widget build(BuildContext context) {
    print('===========> WAIT_DRIVER_PANEL BUILD');
    RouteModel routeModel = ref.read(routeProvider);
    LocationModel departure = ref.read(departureLocationProvider);
    LocationModel arrival = ref.read(arrivalLocationProvider);
    DriverModel driverModel = ref.read(driverProvider);

    return Container(
      decoration: const BoxDecoration(
        color: Color.fromARGB(255, 255, 255, 255),
        borderRadius: BorderRadius.vertical(
          top: Radius.circular(20),
        ),
        boxShadow: [
          BoxShadow(
            color: Color.fromARGB(80, 190, 190, 190),
            spreadRadius: 2,
            blurRadius: 5,
            offset: Offset(1, 0),
          ),
        ],
      ),
      padding: const EdgeInsets.symmetric(horizontal: 0, vertical: 12),
      width: MediaQuery.of(context).size.width,
      height: 215,
      // alignment: Alignment.topLeft,
      child: Column(
        // mainAxisAlignment: MainAxisAlignment.start,
        // mainAxisSize: MainAxisSize.min,
        children: [
          Center(
            child: Container(
              width: 50,
              height: 4,
              decoration: BoxDecoration(
                color: HexColor('D9D9D9'),
                borderRadius: const BorderRadius.all(
                  Radius.circular(50),
                ),
              ),
            ),
          ),
          const SizedBox(
            height: 24,
          ),
          ///////////////////////////////////////////////////// LOCATION INPUT
          Align(
            alignment: Alignment.topLeft,
            child: Consumer(
              builder: (context, ref, child) {
                ref.listen(stepProvider, ((previous, next) {
                  setState(() {
                    if (next == 'wait_driver') {
                      widgetText = Text(
                        'Tài xế của bạn đang đến...',
                        style: Theme.of(context).textTheme.titleSmall,
                        textAlign: TextAlign.start,
                      );
                    } else if (next == 'comming_driver') {
                      widgetText = Text(
                        'Tài xế của bạn đã đến',
                        style: GoogleFonts.montserrat(
                            color: HexColor('29BD11'),
                            fontWeight: FontWeight.w600,
                            fontSize: 18),
                        textAlign: TextAlign.start,
                      );
                    } else {}
                  });
                }));
                return Row(
                  children: [
                    const SizedBox(
                      width: 15,
                    ),
                    widgetText
                  ],
                );
              },
            ),
          ),
          const SizedBox(
            height: 21,
          ),
          Row(
            children: [
              const SizedBox(
                width: 15,
              ),
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
              const SizedBox(
                width: 15,
              ),
            ],
          ),
          const SizedBox(
            height: 30,
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 15, vertical: 15),
            decoration: BoxDecoration(
              color: Colors.white,
              border: Border(
                top: BorderSide(
                  color: HexColor('EAEAEA'), // Màu của border top
                  width: 1, // Độ dày của border top
                ),
                bottom: BorderSide(
                  color: HexColor('EAEAEA'), // Màu của border top
                  width: 1, // Độ dày của border top
                ),
              ),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    FaIcon(
                      FontAwesomeIcons.solidMap,
                      color: HexColor('FE8248'),
                    ),
                    const SizedBox(
                      width: 10,
                    ),
                    Text(
                      routeModel.distance!,
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                  ],
                ),
                Row(
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    FaIcon(
                      FontAwesomeIcons.solidClock,
                      color: HexColor('FE8248'),
                    ),
                    const SizedBox(
                      width: 10,
                    ),
                    Text(
                      convertTimeFormat(routeModel.time!),
                      style: Theme.of(context).textTheme.titleLarge,
                    ),
                  ],
                ),
                Text(
                  routeModel.price,
                  style: Theme.of(context).textTheme.titleLarge,
                )
              ],
            ),
          ),
          const SizedBox(
            height: 21,
          ),
          Row(
            children: [
              const SizedBox(
                width: 15,
              ),
              Align(
                alignment: Alignment.topLeft,
                child: Text(
                  'Lộ trình của bạn',
                  style: Theme.of(context).textTheme.titleSmall,
                  textAlign: TextAlign.start,
                ),
              ),
            ],
          ),
          const SizedBox(
            height: 24,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const SizedBox(
                width: 15,
              ),
              Image.asset(
                'lib/assets/trip_icon.png',
                height: 120,
              ),
              const SizedBox(
                width: 13,
              ),
              Expanded(
                child: Column(
                  children: [
                    Container(
                      height: 70,
                      width: double.infinity,
                      padding: const EdgeInsets.symmetric(
                        horizontal: 14,
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
                          Text(departure.structuredFormatting!.mainText!,
                              overflow: TextOverflow.ellipsis,
                              maxLines: 1,
                              style: Theme.of(context).textTheme.displayMedium),
                          const SizedBox(
                            height: 5,
                          ),
                          Text(
                              '${departure.structuredFormatting!.mainText!}, ${(departure.structuredFormatting!.secondaryText!).replaceFirst(RegExp(r',[^,]*$'), ', TP.HCM')}',
                              style: Theme.of(context).textTheme.displaySmall),
                        ],
                      ),
                    ),
                    const SizedBox(
                      height: 14,
                    ),
                    Container(
                      height: 70,
                      width: double.infinity,
                      padding: const EdgeInsets.symmetric(
                        horizontal: 14,
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
                            arrival.structuredFormatting!.mainText!,
                            overflow: TextOverflow.ellipsis,
                            maxLines: 1,
                            style: Theme.of(context).textTheme.displayMedium,
                          ),
                          const SizedBox(
                            height: 5,
                          ),
                          Text(
                            '${arrival.structuredFormatting!.mainText!}, ${(arrival.structuredFormatting!.secondaryText!).replaceFirst(RegExp(r',[^,]*$'), ', TP.HCM')}',
                            style: Theme.of(context).textTheme.displaySmall,
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
              const SizedBox(
                width: 15,
              ),
            ],
          ),
        ],
      ),
    );
  }
}
