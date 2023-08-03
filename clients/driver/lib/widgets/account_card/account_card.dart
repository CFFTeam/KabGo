import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

class AccountCard extends ConsumerStatefulWidget {
  const AccountCard(
      {Key? key,
      required this.iconPath,
      required this.accountType,
      required this.accountBalance,
      required this.onPressed})
      : super(key: key);

  final String iconPath;
  final String accountType;
  final String accountBalance;
  final VoidCallback onPressed;

  @override
  ConsumerState<AccountCard> createState() => _AccountCardState();
}

class _AccountCardState extends ConsumerState<AccountCard> {
  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () {
        widget.onPressed();
      },
      style: ElevatedButton.styleFrom(
        backgroundColor: const Color(0xFFFFFFFF),
        foregroundColor: const Color(0xFF000000),
        elevation: 0,
        padding: EdgeInsets.zero,
      ),
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 40, vertical: 14),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            Image(image: AssetImage(widget.iconPath), width: 38, height: 38),
            const Spacer(),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(widget.accountType,
                    style: const TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w600,
                      color: Color(0xFF000000),
                    )),
                const SizedBox(height: 6),
                Text("VND ${widget.accountBalance}",
                    style: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w600,
                      color: Color(0xFF6A6A6A),
                    )),
              ],
            ),
            const Spacer(),
            const Spacer(),
            const Icon(FontAwesomeIcons.chevronRight,
                size: 16, color: Color(0xFF6A6A6A)),
          ],
        ),
      ),
    );
  }
}
