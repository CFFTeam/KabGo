import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:driver/models/driver_account.dart';
import 'package:driver/models/driver_details.dart';
import 'package:driver/providers/auth_provider.dart';
import 'package:driver/providers/driver_provider.dart';
import 'package:driver/screens/customer_request/customer_request.dart';
import 'package:driver/screens/customer_request/customer_request_accept.dart';
import 'package:driver/screens/customer_request/customer_request_comming.dart';
import 'package:driver/screens/home_dashboard/home_dashboard.dart';
import 'package:driver/screens/home_income/home_income.dart';
import 'package:driver/screens/home_screen/index.dart';
import 'package:driver/screens/home_wallet/home_wallet.dart';
import 'package:driver/screens/splash_screen/index.dart';
import 'package:driver/screens/welcome_screen/index.dart';
import 'package:driver/widgets/driver_panel/driver_panel.dart';
import 'package:driver/widgets/home_panel/home_panel.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';

import 'animations/animation.dart';

final _key = GlobalKey<NavigatorState>(debugLabel: 'Main Navigator');
final _shellkey = GlobalKey<NavigatorState>(debugLabel: 'Shell Navigator');
final _shellStatusKey =
    GlobalKey<NavigatorState>(debugLabel: 'Shell Status Navigator');
final _shellDriverKey =
    GlobalKey<NavigatorState>(debugLabel: 'Shell Driver Navigator');

final routerProvider = Provider<GoRouter>((ref) {
  // final appState = ref.watch(appNotifierProvider);
  final authState = ref.watch(authProvider);
  final driverDetails = ref.watch(driverDetailsProvider);
  final driverDetailsNotifier = ref.read(driverDetailsProvider.notifier);

  return GoRouter(
      debugLogDiagnostics: true,
      navigatorKey: _key,
      initialLocation: SplashScreen.path,
      routes: [
        GoRoute(
          parentNavigatorKey: _key,
          name: SplashScreen.name,
          path: SplashScreen.path,
          builder: (context, state) => const SplashScreen(),
        ),
        GoRoute(
            parentNavigatorKey: _key,
            name: WelcomeScreen.name,
            path: WelcomeScreen.path,
            pageBuilder: (context, state) =>
                buildPageWithDefaultTransition<void>(
                    context: context,
                    key: state.pageKey,
                    transitionDuration: const Duration(milliseconds: 800),
                    child: const WelcomeScreen())),
        ShellRoute(
            navigatorKey: _shellkey,
            pageBuilder: (context, state, child) =>
                buildPageWithDefaultTransition(
                    context: context,
                    key: state.pageKey,
                    child: HomeScreen(child: child),
                    transitionDuration: const Duration(milliseconds: 800)),
            routes: [
              ShellRoute(
                  navigatorKey: _shellStatusKey,
                  parentNavigatorKey: _shellkey,
                  pageBuilder: (context, state, child) =>
                      buildPageWithSlideUpTransition(
                          context: context,
                          key: state.pageKey,
                          child: HomePanel(child: child),
                          transitionDuration:
                              const Duration(milliseconds: 400)),
                  routes: [
                    GoRoute(
                        parentNavigatorKey: _shellStatusKey,
                        name: HomeDashboard.name,
                        path: HomeDashboard.path,
                        pageBuilder: (context, state) =>
                            buildPageWithDefaultTransition(
                                context: context,
                                key: state.pageKey,
                                child: const HomeDashboard(),
                                transitionDuration:
                                    const Duration(milliseconds: 800)),
                        routes: [
                          GoRoute(
                              parentNavigatorKey: _shellStatusKey,
                              name: HomeWallet.name,
                              path: HomeWallet.path,
                              pageBuilder: (context, state) =>
                                  buildPageWithDefaultTransition(
                                    context: context,
                                    key: state.pageKey,
                                    child: const HomeWallet(),
                                    transitionDuration:
                                        const Duration(milliseconds: 800),
                                  ),
                              routes: [
                                GoRoute(
                                  parentNavigatorKey: _shellStatusKey,
                                  name: HomeIncome.name,
                                  path: HomeIncome.path,
                                  pageBuilder: (context, state) =>
                                      buildPageWithDefaultTransition(
                                          context: context,
                                          key: state.pageKey,
                                          child: const HomeIncome(),
                                          transitionDuration: const Duration(
                                              milliseconds: 800)),
                                ),
                              ]),
                        ]),
                  ]),
              ShellRoute(
                  navigatorKey: _shellDriverKey,
                  parentNavigatorKey: _shellkey,
                  pageBuilder: (context, state, child) =>
                      buildPageWithSlideUpTransition(
                          context: context,
                          key: state.pageKey,
                          child: DriverPanel(child: child),
                          transitionDuration:
                              const Duration(milliseconds: 300)),
                  routes: [
                    GoRoute(
                      parentNavigatorKey: _shellDriverKey,
                      name: CustomerRequest.name,
                      path: CustomerRequest.path,
                      pageBuilder: (context, state) => NoTransitionPage(
                        // context: context,
                        key: state.pageKey,
                        child: const CustomerRequest(),
                        // transitionDuration: const Duration(milliseconds: 800)
                      ),
                    ),
                    GoRoute(
                      parentNavigatorKey: _shellDriverKey,
                      name: CustomerRequestAccept.name,
                      path: CustomerRequestAccept.path,
                      pageBuilder: (context, state) => NoTransitionPage(
                        // context: context,
                        key: state.pageKey,
                        child: const CustomerRequestAccept(),
                        // transitionDuration: const Duration(milliseconds: 800)
                      ),
                    ),
                    GoRoute(
                      parentNavigatorKey: _shellDriverKey,
                      name: CustomerRequestComming.name,
                      path: CustomerRequestComming.path,
                      pageBuilder: (context, state) => NoTransitionPage(
                        // context: context,
                        key: state.pageKey,
                        child: const CustomerRequestComming(),
                        // transitionDuration: const Duration(milliseconds: 800)
                      ),
                    ),
                  ])
            ])
      ],
      redirect: (context, state) {
        final currentLocation = state.uri.toString();

        if (authState.isLoading || authState.hasError) {
          return null;
        }

        final isAuth = authState.valueOrNull != null;

        final isSplash = currentLocation == SplashScreen.path;

        if (isSplash) {
          if (isAuth) {

            if (driverDetailsNotifier.hasValue) {
              return HomeDashboard.path;
            }
            
            Dio dio = Dio();
            dio.post(
                'http://192.168.2.68:4100/v1/driver/register',
                data: jsonEncode(DriverAccount(
                        avatar: authState.value!.photoURL!,
                        name: authState.value!.displayName!,
                        phonenumber: '',
                        email: authState.value!.email!,
                        begin_day: DateTime.now().toString(),
                        social: true)
                    .toJson())).then((response) => {
                      if (response.statusCode == 200) {
                        ref
                            .read(driverDetailsProvider.notifier)
                            .setDriverDetails(DriverDetails.fromJson(response.data))
                      }
                    });  

            return null;
          }
          return WelcomeScreen.path;
        }

        final isLoggingIn = currentLocation == WelcomeScreen.path;
        if (isLoggingIn) return isAuth ? HomeDashboard.path : null;

        return isAuth ? null : SplashScreen.path;
      });
});
