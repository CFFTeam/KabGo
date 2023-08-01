import 'package:flutter/material.dart';

class OptionsButton extends StatelessWidget {
  const OptionsButton({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 50,
      decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(50),
          boxShadow: const [
            BoxShadow(
              color: Color.fromARGB(120, 217, 217, 217),
              spreadRadius: 1,
              blurRadius: 2,
              offset: Offset(0, 1),
            ),
          ]),
      child: IconButton(
        onPressed: () {
          // print('abchcdhdhh');
        },
        padding: EdgeInsets.zero,
        icon: Image.asset('assets/options_button.png'),
        iconSize: 50,
      ),
    );
  }
}
