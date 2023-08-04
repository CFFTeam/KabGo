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
    reverseTransitionDuration: transitionDuration,
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      final Animatable<Offset> slideInTween =
          Tween<Offset>(begin: const Offset(1.0, 0.0), end: Offset.zero).chain(
        CurveTween(curve: Curves.easeInOutCubic),
      );
      final Animation<Offset> slideInAnimation =
          slideInTween.animate(animation);

      final Animatable<Offset> slideOutTween =
          Tween<Offset>(begin: Offset.zero, end: const Offset(-1.0, 0.0)).chain(
        CurveTween(curve: Curves.easeInOutCubic),
      );

      final Animation<Offset> slideOutAnimation =
          slideOutTween.animate(secondaryAnimation);

      return SlideTransition(
        position: slideOutAnimation,
        child: SlideTransition(
          position: slideInAnimation,
          child: child,
        ),
      );
    },
  );
}

CustomTransitionPage buildPageWithSlideUpTransition<T>({
  required BuildContext context,
  required LocalKey key,
  required Widget child,
  required Duration transitionDuration,
}) {
  return CustomTransitionPage<T>(
    key: key,
    child: child,
    transitionDuration: transitionDuration,
    reverseTransitionDuration: transitionDuration,
    transitionsBuilder: (context, animation, secondaryAnimation, child) {
      final Animatable<Offset> slideInTween =
          Tween<Offset>(begin: const Offset(0.0, 1.0), end: Offset.zero).chain(
        CurveTween(curve: Curves.easeInOutCubic),
      );
      final Animation<Offset> slideInAnimation =
          slideInTween.animate(animation);

      final Animatable<Offset> slideOutTween =
          Tween<Offset>(begin: Offset.zero, end: const Offset(0.0, 1.0)).chain(
        CurveTween(curve: Curves.easeInOutCubic),
      );

      final Animation<Offset> slideOutAnimation =
          slideOutTween.animate(secondaryAnimation);

      return SlideTransition(
        position: slideOutAnimation,
        child: SlideTransition(
          position: slideInAnimation,
          child: child,
        ),
      );
    },
  );
}
