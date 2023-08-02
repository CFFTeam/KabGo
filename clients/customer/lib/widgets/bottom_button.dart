import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

import '../functions/setHexColor.dart';

class BottomButton extends StatelessWidget {
  const BottomButton(
      {Key? key,
      required this.backButton,
      required this.nextButton,
      required this.nextButtonText})
      : super(key: key);

  final void Function() backButton;
  final void Function() nextButton;
  final String nextButtonText;

  @override
  Widget build(BuildContext context) {
    return Row(
      // mainAxisAlignment: MainAxisAlignment.start,
      children: [
        SizedBox(
          width: 54,
          height: 54,
          child: OutlinedButton(
            onPressed: backButton,
            child: FaIcon(
              FontAwesomeIcons.arrowLeft,
              color: HexColor('FE8248'),
            ),
          ),
        ),
        const SizedBox(
          width: 15,
        ),
        Expanded(
          child: SizedBox(
            height: 54,
            child: ElevatedButton(
              onPressed: nextButton,
              child: Text(nextButtonText.toUpperCase(),
                  style: Theme.of(context).textTheme.labelMedium),
            ),
          ),
        )
      ],
    );
  }
}
