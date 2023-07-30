import 'package:driver/providers/app_provider.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/auth_model.dart';

final authenticationProvider = Provider<Authentication>((ref) => Authentication());

final authProvider = StreamProvider<User?>((ref) {
  ref.watch(appNotifierProvider).whenData((value) => FirebaseAuth.instance.authStateChanges());

  return FirebaseAuth.instance.authStateChanges();
});
