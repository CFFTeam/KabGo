import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import 'hours.dart';
import 'minutes.dart';

class HomeLock extends StatefulWidget {
  const HomeLock({
    super.key,
    required this.popDialog,
    required this.propTime,
    required this.initHour,
    required this.initMinute,
  });
  final void Function() popDialog;
  final void Function(int currentMinutes, int currentHours) propTime;
  final int initHour;
  final int initMinute;

  @override
  State<HomeLock> createState() => _HomeLockState();
}

class _HomeLockState extends State<HomeLock> {
  late FixedExtentScrollController _controller;
  int? currentMinutes;
  int? currentHours;
  @override
  void initState() {
    super.initState();
    currentHours = widget.initHour;
    currentMinutes = widget.initMinute;
    _controller = FixedExtentScrollController();
  }

  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: Text(
        'Chọn thời gian',
        style: Theme.of(context).textTheme.titleSmall,
        textAlign: TextAlign.center,
      ),
      content: SizedBox(
        height: 300,
        child: Column(
          children: [
            Expanded(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(
                    width: 80,
                    child: ListWheelScrollView.useDelegate(
                      onSelectedItemChanged: (value) {
                        setState(() {
                          currentHours = value + widget.initHour;
                        });
                      },
                      controller: _controller,
                      itemExtent: 55,
                      perspective: 0.004,
                      diameterRatio: 1.2,
                      physics: const FixedExtentScrollPhysics(),
                      childDelegate: ListWheelChildBuilderDelegate(
                        childCount: 24 - widget.initHour,
                        builder: (context, index) {
                          return MyHours(
                            hours: index + widget.initHour,
                          );
                        },
                      ),
                    ),
                  ),
                  Container(
                    alignment: Alignment.center,
                    width: 10,
                    child: Text(
                      ":",
                      style: GoogleFonts.montserrat(
                          fontSize: 30,
                          fontWeight: FontWeight.w800,
                          color: Colors.black),
                    ),
                  ),
                  SizedBox(
                    width: 80,
                    child: ListWheelScrollView.useDelegate(
                      onSelectedItemChanged: (value) {
                        setState(() {
                          currentMinutes = value + widget.initMinute;
                        });
                      },
                      itemExtent: 55,
                      perspective: 0.004,
                      diameterRatio: 1.2,
                      physics: const FixedExtentScrollPhysics(),
                      childDelegate: ListWheelChildBuilderDelegate(
                        childCount: 60 - widget.initMinute,
                        builder: (context, index) {
                          return MyMinutes(
                            mins: index + widget.initMinute,
                          );
                        },
                      ),
                    ),
                  ),
                ],
              ),
            ),
            ElevatedButton(
              child: Text(
                'Xong',
                style: Theme.of(context).textTheme.labelMedium,
              ),
              onPressed: () {
                widget.popDialog();
                widget.propTime(currentHours!, currentMinutes!);
              },
            )
          ],
        ),
      ),
    );
  }
}
