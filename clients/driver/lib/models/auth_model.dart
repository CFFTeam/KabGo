import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:driver/.env.dart';
import 'package:driver/models/driver_account.dart';
import 'package:driver/models/driver_details.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';

class Authentication {
  Future<DriverDetails?> signInWithGoogle(BuildContext context) async {
    final googleSignIn = GoogleSignIn();

    final googleUser = await googleSignIn.signIn();

    if (googleUser == null) return null;

    final googleAuth = await googleUser.authentication;

    final credential = GoogleAuthProvider.credential(
        accessToken: googleAuth.accessToken, idToken: googleAuth.idToken);

    try {
      final UserCredential userCredential =
          await FirebaseAuth.instance.signInWithCredential(credential);

      Dio dio = Dio();
      final response = await dio.post(
          'http://$ip:4100/v1/driver/register',
          data: jsonEncode(DriverAccount(
                  avatar: userCredential.user!.photoURL!,
                  name: userCredential.user!.displayName!,
                  phonenumber: '',
                  email: userCredential.user!.email!,
                  begin_day: DateTime.now().toString(),
                  social: true)
              .toJson()));

      if (response.statusCode == 200) {
        return DriverDetails.fromJson(response.data);
      } 
    } on FirebaseAuthException catch (e) {
      print(e.toString());
      // await showDialog(
      //   context: context,
      //   builder: (ctx) => AlertDialog(
      //     title: const Text('Error Occured'),
      //     content: Text(e.toString()),
      //     actions: [
      //       TextButton(
      //           onPressed: () {
      //             Navigator.of(ctx).pop();
      //           },
      //           child: const Text("OK"))
      //     ],
      //   ),
      // );
    }
    return null;
  }
}
