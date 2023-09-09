import 'package:flutter/material.dart';
import '../models/location_model.dart';

class SuggestionItem extends StatelessWidget {
  const SuggestionItem({Key? key, required this.data}) : super(key: key);
  final StructuredFormatting data;
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(left: 15, top: 7, bottom: 7),
      // color: Colors.black,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            data.mainText.toString(),
            style: Theme.of(context).textTheme.headlineMedium,
          ),
          const SizedBox(
            height: 4,
          ),
          Text(
            data.secondaryText.toString(),
            style: Theme.of(context).textTheme.headlineSmall,
          ),
        ],
      ),
    );
  }
}
