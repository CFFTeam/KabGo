import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:google_fonts/google_fonts.dart';
import '../../data/data.dart';
import '../../functions/setHexColor.dart';
import '../../models/customer_model.dart';
import '../../models/location_model.dart';
import '../../models/route_model.dart';
import '../../providers/arrivalLocationProvider.dart';
import '../../providers/coupon_provider.dart';
import '../../providers/customerProvider.dart';
import '../../providers/departureLocationProvider.dart';
import '../../providers/mapProvider.dart';
import '../../providers/routeProvider.dart';
import '../../providers/socketProvider.dart';
import '../../providers/stepProvider.dart';
import '../../widgets/bottom_button.dart';
import '../../widgets/car_card_item.dart';
import '../../widgets/home_lock/homelock.dart';
import 'choose_payment_method.dart';
import 'discount_page.dart';

class SetSchedule extends ConsumerStatefulWidget {
  const SetSchedule({
    Key? key,
  }) : super(key: key);

  @override
  // ignore: library_private_types_in_public_api
  _SetScheduleState createState() => _SetScheduleState();
}

class _SetScheduleState extends ConsumerState<SetSchedule> {
  bool now = true;
  String? _selectedTime;
  String? hour;
  String? minute;
  dynamic listCoupon;

  void setTimeNow() {
    setState(() {
      now = true;
    });
  }

  void setTimeSchedule() {
    setState(() {
      now = false;
      DateTime time = DateTime.now();
      hour = time.hour.toString().padLeft(2, '0');
      minute = time.minute.toString().padLeft(2, '0');
      _selectedTime = '$hour : $minute';
    });
  }

  _selectedTimeAdd(StateSetter setStateTimeStart) {
    showDialog(
      context: context,
      builder: (context) => HomeLock(
        popDialog: () {
          Navigator.pop(context);
        },
        initHour: int.tryParse(hour!)!,
        initMinute: int.tryParse(minute!)!,
        propTime: (currentHour, currentMinute) {
          setStateTimeStart(
            () {
              _selectedTime =
                  "${currentHour.toString().padLeft(2, '0')} : ${currentMinute.toString().padLeft(2, '0')}";
            },
          );
        },
      ),
    );
  }

  int chosenItem = 0;
  void setChoseItem(int index, StateSetter stateSetter) {
    stateSetter(() {
      chosenItem = index;
    });
  }

  String paymentMethod = 'Tiền mặt';
  String paymentImage = 'lib/assets/cash_icon.png';
  String discount = '';

  Future<void> bookCar() async {
    SocketClient socketClient = ref.read(socketClientProvider.notifier);
    LocationModel departure = ref.read(departureLocationProvider);
    LocationModel arrival = ref.read(arrivalLocationProvider);
    RouteModel routeModel = ref.read(routeProvider);
    CustomerModel customerModel = ref.read(customerProvider);
    socketClient.emitBookingCar(departure, arrival, routeModel, customerModel);
    ref.read(stepProvider.notifier).setStep('find_driver');
    ref.read(mapProvider.notifier).setMapAction('FIND_DRIVER');
    ref.read(couponProvider.notifier).setCoupon(0);
  }

  // var dio = Dio();
  // var response = await dio.request(
  //   'http://192.168.2.165:4600/user/booking-car',
  //   data: json.encode({
  //     "data": {"message": "Dat xe thanh cong!"}
  //   }),
  //   options: Options(
  //     method: 'POST',
  //   ),
  // );

  // if (response.statusCode == 200) {
  //   print(json.encode(response.data));
  // } else {
  //   print(response.statusMessage);
  // }

  // IO.Socket socket = IO.io('http://192.168.2.165:4600');
  // socket.onConnect((_) {
  //   print('connect');
  //   socket.emit('msg', 'test');
  // });
  // socket.on('event', (data) => print(data));
  // socket.onDisconnect((_) => print('disconnect'));
  // socket.on('fromServer', (_) => print(_));

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    RouteModel routeModal = ref.read(routeProvider);

    void showPaymentMethod(StateSetter stateSetter) {
      showModalBottomSheet(
          backgroundColor: Colors.transparent,
          context: context,
          builder: (ctx) => ChoosePaymentMethod((int value) {
                stateSetter(
                  () {
                    if (value == 1) {
                      paymentMethod = 'Tiền mặt';
                      paymentImage = 'lib/assets/cash_icon.png';
                    } else if (value == 2) {
                      paymentMethod = 'Thẻ ngân hàng';
                      paymentImage = 'lib/assets/master_card_icon.png';
                    } else if (value == 3) {
                      paymentMethod = 'ZaloPay';
                      paymentImage = 'lib/assets/zalo_pay_icon.png';
                    }
                  },
                );
              }));
    }

    void showDiscountList(StateSetter stateSetter) {
      showModalBottomSheet(
          backgroundColor: Colors.transparent,
          context: context,
          builder: (ctx) => DiscountPage(chooseItem: (String value) {
                stateSetter(
                  () {
                    discount = value;
                  },
                );
              }));
    }

    return Container(
      decoration: BoxDecoration(
        color: HexColor('fe8248'),
        borderRadius: const BorderRadius.vertical(
          top: Radius.circular(20),
        ),
      ),
      padding: const EdgeInsets.only(top: 16),
      alignment: Alignment.topLeft,
      child: Column(
        children: [
          Row(
            children: [
              const SizedBox(
                width: 15,
              ),
              Text(
                'Tạo chuyến',
                style: GoogleFonts.montserrat(
                    color: Colors.white,
                    fontWeight: FontWeight.w700,
                    fontSize: 18),
              ),
              const Spacer(),
              InkWell(
                onTap: () {
                  ref.read(stepProvider.notifier).setStep('home');
                  ref.read(mapProvider.notifier).setMapAction('SET_DEFAULT');
                },
                child: const FaIcon(
                  FontAwesomeIcons.xmark,
                  size: 32,
                  color: Colors.white,
                ),
              ),
              const SizedBox(
                width: 15,
              ),
            ],
          ),
          const SizedBox(
            height: 28,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                width: 42,
                height: 42,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Text(
                  '1',
                  style: Theme.of(context).textTheme.titleLarge,
                ),
              ),
              const SizedBox(
                width: 4,
              ),
              Image.asset(
                'lib/assets/step_line.png',
                width: 90,
              ),
              const SizedBox(
                width: 4,
              ),
              Container(
                width: 42,
                height: 42,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Text(
                  '2',
                  style: Theme.of(context).textTheme.titleLarge,
                ),
              ),
              const SizedBox(
                width: 4,
              ),
              Image.asset(
                'lib/assets/step_line.png',
                width: 90,
              ),
              const SizedBox(
                width: 4,
              ),
              Container(
                width: 42,
                height: 42,
                alignment: Alignment.center,
                decoration: BoxDecoration(
                  color: HexColor('F3D3B3'),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Text(
                  '3',
                  style: Theme.of(context).textTheme.titleLarge,
                ),
              ),
              const SizedBox(
                height: 20,
              ),
            ],
          ),
          const Spacer(),
          Container(
            decoration: const BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.vertical(
                top: Radius.circular(20),
              ),
            ),
            width: MediaQuery.of(context).size.width,
            height: 610,
            alignment: Alignment.topLeft,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.fromLTRB(15, 20, 15, 0),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          'Đặt lịch đón',
                          style: Theme.of(context).textTheme.bodySmall,
                        ),
                        const SizedBox(
                          height: 20,
                        ),
                        InkWell(
                          onTap: setTimeNow,
                          child: Row(
                            children: [
                              Row(
                                children: [
                                  now
                                      ? Image.asset(
                                          'lib/assets/chosen_icon.png',
                                          width: 21,
                                        )
                                      : Image.asset(
                                          'lib/assets/not_chosen_icon.png',
                                          width: 21,
                                        ),
                                  const SizedBox(
                                    width: 8,
                                  ),
                                  Text(
                                    'Bây giờ',
                                    style: GoogleFonts.montserrat(
                                        color: Colors.black,
                                        fontWeight: FontWeight.w600,
                                        fontSize: 16),
                                  )
                                ],
                              ),
                              const SizedBox(
                                width: 20,
                              ),
                              InkWell(
                                onTap: setTimeSchedule,
                                child: Row(
                                  children: [
                                    now
                                        ? Image.asset(
                                            'lib/assets/not_chosen_icon.png',
                                            width: 21,
                                          )
                                        : Image.asset(
                                            'lib/assets/chosen_icon.png',
                                            width: 21,
                                          ),
                                    const SizedBox(
                                      width: 8,
                                    ),
                                    Text(
                                      'Hẹn giờ',
                                      style: GoogleFonts.montserrat(
                                          color: Colors.black,
                                          fontWeight: FontWeight.w600,
                                          fontSize: 16),
                                    )
                                  ],
                                ),
                              ),
                            ],
                          ),
                        ),
                        if (!now)
                          Column(
                            children: [
                              const SizedBox(
                                height: 24,
                              ),
                              Row(
                                mainAxisAlignment: MainAxisAlignment.start,
                                children: [
                                  Text(
                                    'Chọn giờ: ',
                                    style: GoogleFonts.montserrat(
                                      color: HexColor('F86C1D'),
                                      fontWeight: FontWeight.w700,
                                      fontSize: 16,
                                    ),
                                  ),
                                  const SizedBox(
                                    width: 15,
                                  ),
                                  StatefulBuilder(
                                    builder: (context, setStateTime) => InkWell(
                                      onTap: () {
                                        _selectedTimeAdd(setStateTime);
                                      },
                                      child: Container(
                                        padding: const EdgeInsets.symmetric(
                                            horizontal: 16, vertical: 10),
                                        decoration: BoxDecoration(
                                          color: HexColor('FE8248'),
                                          borderRadius: const BorderRadius.all(
                                            Radius.circular(10),
                                          ),
                                        ),
                                        child: Text(
                                          _selectedTime.toString(),
                                          style: GoogleFonts.montserrat(
                                              color: Colors.white,
                                              fontWeight: FontWeight.w700,
                                              fontSize: 21),
                                        ),
                                      ),
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
                          'Chọn xe',
                          style: Theme.of(context).textTheme.bodySmall,
                        ),
                        const SizedBox(
                          height: 20,
                        ),
                        StatefulBuilder(
                          builder: (context, setChooseItemState) => Expanded(
                            child: ListView.builder(
                              padding: const EdgeInsets.only(top: 0),
                              shrinkWrap: true,
                              itemCount: listCarCard.length,
                              itemBuilder: (context, index) {
                                return Column(
                                  children: [
                                    InkWell(
                                      onTap: () {
                                        setChoseItem(index, setChooseItemState);
                                      },
                                      child: CarCardItem(
                                        isChosen: chosenItem == index,
                                        data: listCarCard[index],
                                        distance: routeModal.distance!,
                                      ),
                                    ),
                                    const SizedBox(
                                      height: 14,
                                    )
                                  ],
                                );
                              },
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
                Container(
                  height: 142,
                  padding: const EdgeInsets.fromLTRB(15, 0, 15, 30),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    border: Border(
                      top: BorderSide(
                        color: HexColor('EAEAEA'), // Màu của border top
                        width: 1, // Độ dày của border top
                      ),
                    ),
                    boxShadow: const [
                      BoxShadow(
                        color: Color.fromARGB(80, 230, 230, 230),
                        spreadRadius: 5,
                        blurRadius: 5,
                        offset: Offset(1, 0),
                      ),
                    ],
                  ),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Spacer(),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          StatefulBuilder(
                            builder: (context, setPaymentMethodState) =>
                                InkWell(
                              onTap: () {
                                showPaymentMethod(setPaymentMethodState);
                              },
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Image.asset(
                                    paymentImage,
                                    width: 24,
                                  ),
                                  const SizedBox(
                                    width: 6,
                                  ),
                                  Text(
                                    paymentMethod,
                                    style:
                                        Theme.of(context).textTheme.bodyLarge,
                                  ),
                                  const SizedBox(
                                    width: 6,
                                  ),
                                  const FaIcon(
                                    FontAwesomeIcons.angleDown,
                                    size: 18,
                                    color: Color.fromARGB(255, 93, 93, 93),
                                  )
                                ],
                              ),
                            ),
                          ),
                          StatefulBuilder(
                            builder: (context, setDiscountState) => InkWell(
                              onTap: () {
                                showDiscountList(setDiscountState);
                              },
                              child: Row(
                                children: [
                                  Image.asset(
                                    'lib/assets/discount_icon.png',
                                    width: 24,
                                  ),
                                  const SizedBox(
                                    width: 6,
                                  ),
                                  Container(
                                    constraints:
                                        const BoxConstraints(maxWidth: 160),
                                    child: Text(
                                      discount.isEmpty ? 'Ưu đãi' : discount,
                                      overflow: TextOverflow.ellipsis,
                                      style:
                                          Theme.of(context).textTheme.bodyLarge,
                                    ),
                                  )
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(
                        height: 24,
                      ),
                      BottomButton(
                          backButton: () {
                            ref
                                .read(stepProvider.notifier)
                                .setStep('confirm_route');
                          },
                          nextButton: bookCar,
                          nextButtonText: 'đặt xe'),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
