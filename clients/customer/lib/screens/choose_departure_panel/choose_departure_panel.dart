import 'package:customer_app/models/location_model.dart';
import 'package:customer_app/providers/departureLocationProvider.dart';
import 'package:customer_app/providers/stepProvider.dart';
import 'package:customer_app/widgets/bottom_button.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../data/data.dart';
import '../../providers/mapProvider.dart';
import '../../widgets/input_custom.dart';
import '../../widgets/favorite_location_item.dart';

class ChooseDeparturePanel extends ConsumerStatefulWidget {
  const ChooseDeparturePanel({Key? key, required this.backButton})
      : super(key: key);

  // final void Function(LocationModel value) getLocation;
  // final void Function() chooseLocation;
  final void Function(BuildContext context) backButton;

  @override
  // ignore: library_private_types_in_public_api
  _ChooseDeparturePanelState createState() => _ChooseDeparturePanelState();
}

class _ChooseDeparturePanelState extends ConsumerState<ChooseDeparturePanel> {
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

    return Consumer(builder: (context, ref, child) {
      ref.listen(departureLocationProvider, (previous, next) {
        setState(() {
          departureValue =
              '${next.structuredFormatting!.mainText!}, ${next.structuredFormatting!.secondaryText!}';
        });
      });
      return Container(
        decoration: const BoxDecoration(
          color: Color.fromARGB(255, 255, 255, 255),
          borderRadius: BorderRadius.vertical(
            top: Radius.circular(20),
          ),
        ),
        padding: const EdgeInsets.symmetric(horizontal: 15),
        width: MediaQuery.of(context).size.width,
        height: 420,
        alignment: Alignment.topLeft,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(
              height: 20,
            ),
            Text(
              'Chọn điểm đón',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(
              height: 14,
            ),
            Text(
              'Chọn điểm đón để tài xế của chúng tôi có thể đến đón bạn',
              style: Theme.of(context).textTheme.bodyMedium,
            ),
            const SizedBox(
              height: 24,
            ),
            Row(
              children: [
                Image.asset(
                  'assets/departure_icon.png',
                  width: 36,
                ),
                const SizedBox(
                  width: 10,
                ),
                Expanded(
                  child: InputCustom(
                    placeHolder: 'Nhập điểm đón...',
                    value: departureValue!,
                    choosePoint: (LocationModel locationValue) {
                      // ref.read(stepProvider.notifier).setStep('choose_departure');
                      ref
                          .read(departureLocationProvider.notifier)
                          .setDepartureLocation(locationValue);
                      ref
                          .read(mapProvider.notifier)
                          .setMapAction('GET_DEPARTURE_LOCATION');
                    },
                  ),
                )
              ],
            ),
            const SizedBox(
              height: 24,
            ),
            /////////////////////////////////////////////////// FAVORITE ARRIVAL
            Align(
              alignment: Alignment.centerLeft,
              child: Text(
                'Các địa điểm yêu thích',
                style: Theme.of(context).textTheme.titleMedium,
              ),
            ),
            const SizedBox(
              height: 16,
            ),
            SizedBox(
              width: double.infinity,
              height: 80,
              child: ListView.builder(
                scrollDirection: Axis.horizontal,
                itemCount: favoriteLocationData.length,
                itemBuilder: (context, index) => FavoriteLocationItem(
                  data: favoriteLocationData[index],
                ),
              ),
            ),
            const SizedBox(
              height: 36,
            ),
            BottomButton(
                backButton: () {
                  widget.backButton(context);
                },
                nextButton: () {
                  ref.read(stepProvider.notifier).setStep('confirm_route');
                  ref.read(mapProvider.notifier).setMapAction('DRAW_ROUTE');
                },
                nextButtonText: 'chọn điểm đón này'),
          ],
        ),
      );
    });
  }
}
