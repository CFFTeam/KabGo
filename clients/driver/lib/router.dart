import 'package:driver/providers/auth_provider.dart';
import 'package:driver/screens/home_screen/index.dart';
import 'package:driver/screens/splash_screen/index.dart';
import 'package:driver/screens/welcome_screen/index.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import 'animations/animation.dart';

final _key = GlobalKey<NavigatorState>();

final routerProvider = Provider<GoRouter>((ref) {
  // final appState = ref.watch(appNotifierProvider);
  final authState = ref.watch(authProvider);

  return GoRouter(
    navigatorKey: _key,
    debugLogDiagnostics: true,
    initialLocation: SplashScreen.path,
    routes: [
      GoRoute(
        name: SplashScreen.name,
        path: SplashScreen.path,
        pageBuilder: (context, state) => buildPageWithDefaultTransition<void>(
          context: context,
          key: state.pageKey,
          transitionDuration: const Duration(milliseconds: 300),
          child: const SplashScreen()
        )
      ),
      GoRoute(
        name: WelcomeScreen.name,
        path: WelcomeScreen.path,
        pageBuilder: (context, state) => buildPageWithDefaultTransition<void>(
          context: context,
          key: state.pageKey,
          transitionDuration: const Duration(milliseconds: 1150),
          child: const WelcomeScreen()
        )
      ),
      GoRoute(
        name: HomeScreen.name,
        path: HomeScreen.path,
        pageBuilder: (context, state) => buildPageWithDefaultTransition<void>(
          context: context,
          key: state.pageKey,
          transitionDuration: const Duration(milliseconds: 1150),
          child: const HomeScreen()
        )
      )
    ],
    redirect: (context, state) {
      final currentLocation = state.uri.toString();

      if (authState.isLoading || authState.hasError) {
        return null;
      }

      final isAuth = !authState.hasError && authState.valueOrNull != null;

      final isSplash = currentLocation == SplashScreen.path;

      if (isSplash) {
        return (isAuth) ? HomeScreen.path : WelcomeScreen.path;
      }

      final isLoggingIn = currentLocation == WelcomeScreen.path;
      if (isLoggingIn) return isAuth ? HomeScreen.path : null;

      return isAuth ? null : SplashScreen.path;
    });
});
