import 'package:customer_app/providers/paymentProvider.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../../data/data.dart';
import '../../widgets/payment_method_item.dart';

class ChoosePaymentMethod extends ConsumerStatefulWidget {
  const ChoosePaymentMethod(this.chooseItem, {Key? key}) : super(key: key);

  final void Function(int value) chooseItem;
  @override
  _ChoosePaymentMethodState createState() => _ChoosePaymentMethodState();
}

class _ChoosePaymentMethodState extends ConsumerState<ChoosePaymentMethod> {
  int chosenItem = 0;

  void setChoseItem(int index) {
    setState(() {
      chosenItem = index;
      ref
          .read(paymentProvider.notifier)
          .setPaymentMethod((index + 1).toString());
      widget.chooseItem(index + 1);
    });
  }

  @override
  void initState() {
    // TODO: implement initState
    if (ref.read(paymentProvider).paymentMethod.length == 1) {
      chosenItem = int.parse(ref.read(paymentProvider).paymentMethod) - 1;
    }
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 420,
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
          Text(
            'Chọn phương thức thanh toán',
            style: Theme.of(context).textTheme.bodySmall,
          ),
          const SizedBox(
            height: 24,
          ),
          StatefulBuilder(
            builder: (context, setChooseItemState) => Expanded(
              child: ListView.builder(
                padding: const EdgeInsets.only(top: 1),
                itemCount: paymentMethodList.length,
                itemBuilder: (context, index) {
                  return Column(
                    children: [
                      InkWell(
                        onTap: () {
                          setChoseItem(index);
                        },
                        child: PaymentMethodItem(
                          isChosen: index == chosenItem,
                          data: paymentMethodList[index],
                        ),
                      ),
                      const SizedBox(
                        height: 15,
                      )
                    ],
                  );
                },
              ),
            ),
          ),
          SizedBox(
            width: double.infinity,
            height: 54,
            child: ElevatedButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: Text('xong'.toUpperCase(),
                  style: Theme.of(context).textTheme.labelMedium),
            ),
          ),
        ],
      ),
    );
  }
}
