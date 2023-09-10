// import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
// import 'notification/notifications.dart';
import 'app.dart';

void main() async {
  // WidgetsFlutterBinding.ensureInitialized();
  // await Firebase.initializeApp();
  // await Notifications().initNotifications();
  runApp(
    const ProviderScope(
      child: App(),
    ),
  );
}
