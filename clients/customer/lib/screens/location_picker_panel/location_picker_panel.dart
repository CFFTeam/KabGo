import 'package:customer_app/models/location_model.dart';
import 'package:customer_app/providers/arrivalLocationProvider.dart';
import 'package:customer_app/providers/departureLocationProvider.dart';
import 'package:customer_app/providers/locationPickerInMap.dart';
import 'package:customer_app/providers/stepProvider.dart';
import 'package:customer_app/widgets/bottom_button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../functions/setHexColor.dart';
import '../../providers/mapProvider.dart';
import '../find_arrival_page/find_arrival_page.dart';

class LocationPickerPanel extends ConsumerStatefulWidget {
  const LocationPickerPanel(this.parrentPage, {Key? key}) : super(key: key);

  final String parrentPage;

  @override
  // ignore: library_private_types_in_public_api
  _ChooseDeparturePanelState createState() => _ChooseDeparturePanelState();
}

class _ChooseDeparturePanelState extends ConsumerState<LocationPickerPanel> {
  String? departureValue;

  @override
  void initState() {
    // TODO: implement initState
    StructuredFormatting? structuredFormatting =
        ref.read(departureLocationProvider).structuredFormatting;
    departureValue = structuredFormatting == null
        ? ''
        : '${structuredFormatting.mainText!}, ${structuredFormatting.secondaryText!}';
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    print('===========> CHOOSE_DEPARTURE_PANEL BUILD');

    return Container(
      decoration: const BoxDecoration(
        color: Color.fromARGB(255, 255, 255, 255),
        borderRadius: BorderRadius.vertical(
          top: Radius.circular(20),
        ),
      ),
      padding: const EdgeInsets.fromLTRB(15, 20, 15, 30),
      alignment: Alignment.topLeft,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Chọn trên bảng đồ',
                style: Theme.of(context).textTheme.titleLarge,
              ),
              const SizedBox(
                height: 20,
              ),
              Row(
                children: [
                  Image.asset(
                    'lib/assets/departure_icon.png',
                    width: 36,
                  ),
                  const SizedBox(
                    width: 10,
                  ),
                  Expanded(
                    child: Container(
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
                      child: Consumer(
                        builder: (context, ref, child) {
                          StructuredFormatting structuredFormatting = ref
                              .watch(pickerLocationProvider)
                              .structuredFormatting!;

                          return Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Text(structuredFormatting.mainText!,
                                  overflow: TextOverflow.ellipsis,
                                  maxLines: 1,
                                  style: Theme.of(context)
                                      .textTheme
                                      .displayMedium),
                              const SizedBox(
                                height: 5,
                              ),
                              Text(
                                  '${structuredFormatting.mainText!}, ${(structuredFormatting.secondaryText!).replaceFirst(RegExp(r',[^,]*$'), ', TP.HCM')}',
                                  style:
                                      Theme.of(context).textTheme.displaySmall),
                            ],
                          );
                        },
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
          BottomButton(
              backButton: () {
                if (widget.parrentPage == 'find_arrival') {
                  ref.read(stepProvider.notifier).setStep('find_arrival');
                  ref
                      .read(mapProvider.notifier)
                      .setMapAction('FIND_ARRIVAL_LOCATION');
                  Navigator.push(
                    context,
                    PageRouteBuilder(
                      transitionDuration: const Duration(milliseconds: 400),
                      pageBuilder: (context, animation, secondaryAnimation) =>
                          const FindArrivalPage(),
                      transitionsBuilder:
                          (context, animation, secondaryAnimation, child) {
                        const begin = Offset(0.0, 1.0);
                        const end = Offset.zero;

                        final tween = Tween(begin: begin, end: end);

                        return SlideTransition(
                          position: tween.animate(animation),
                          child: child,
                        );
                      },
                    ),
                  );
                } else {
                  ref
                      .read(mapProvider.notifier)
                      .setMapAction('GET_NEW_DEPARTURE_LOCATION');
                  ref.read(stepProvider.notifier).setStep('choose_departure');
                }
              },
              nextButton: () async {
                if (widget.parrentPage == 'find_arrival') {
                  ref
                      .read(arrivalLocationProvider.notifier)
                      .setArrivalLocation(ref.read(pickerLocationProvider));
                  ref.read(stepProvider.notifier).setStep('choose_departure');
                  ref
                      .read(mapProvider.notifier)
                      .setMapAction('GET_CURRENT_DEPARTURE_LOCATION');
                } else {
                  ref
                      .read(departureLocationProvider.notifier)
                      .setDepartureLocation(ref.read(pickerLocationProvider));
                  ref.read(mapProvider.notifier).setMapAction('DRAW_ROUTE');
                  ref.read(stepProvider.notifier).setStep('confirm_route');
                }
              },
              nextButtonText: widget.parrentPage == 'find_arrival'
                  ? 'chọn điểm đến này'
                  : 'chọn điểm đón này'),
        ],
      ),
    );
  }
}
