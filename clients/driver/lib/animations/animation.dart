import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

CustomTransitionPage buildPageWithDefaultTransition<T>({
  required BuildContext context, 
  required LocalKey key,
  required Widget child,
  required Duration transitionDuration,
}) {
  return CustomTransitionPage<T>(
    key: key,
    child: child,
    transitionDuration: transitionDuration,
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      const begin = Offset(1.0, 0.0);
      const end = Offset.zero;
      const curve = Curves.easeInOutCirc;

      return SlideTransition(
        position: animation.drive(Tween(begin: begin, end: end).chain(CurveTween(curve: curve))),
        child: child,
      );
    }
  );
}