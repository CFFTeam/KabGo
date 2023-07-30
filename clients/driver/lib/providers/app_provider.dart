import 'package:firebase_core/firebase_core.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class AppNotifier {
  static Future<void> init() async {
    return await Future.delayed(const Duration(seconds: 6), () async {
      await Firebase.initializeApp();
    });
  }
}

final appNotifierProvider = FutureProvider((ref) async => await AppNotifier.init());
