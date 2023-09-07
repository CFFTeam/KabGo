// import 'dart:io';
// import 'package:dio/dio.dart';

// import '../.env.dart';

// class DioClient {
//   final Dio _api;
//   String baseURL = API_AUTH_BASE_URL;

//   DioClient() : _api = Dio() {
//     _configureInterceptors();
//   }

//   void _configureInterceptors() {
//     _api.interceptors.add(InterceptorsWrapper(
//       onRequest: (options, handler) async {
//         options.baseUrl = baseURL;
//         options.headers = {
//           'Access-Token': accessToken,
//           'Content-Type': 'application/json; charset=UTF-8',
//         };

//         return handler.next(options);
//       },
//       onResponse: (response, handler) {
//         return handler.next(response);
//       },
//       onError: (error, handler) async {
//         return handler.next(error);
//       },
//     ));
//   }

//   Future<Response<T>> request<T>(
//     String uri, {
//     Object? data,
//     Map<String, dynamic>? queryParameters,
//     CancelToken? cancelToken,
//     Options? options,
//     ProgressCallback? onSendProgress,
//     ProgressCallback? onReceiveProgress,
//   }) async {
//     try {
//       final response = await _api.request<T>(
//         uri,
//         data: data,
//         queryParameters: queryParameters,
//         cancelToken: cancelToken,
//         options: options,
//         onSendProgress: onSendProgress,
//         onReceiveProgress: onReceiveProgress,
//       );
//       return response;
//     } on SocketException catch (e) {
//       throw SocketException(e.toString());
//     } on FormatException catch (_) {
//       throw const FormatException('Unable to process the data');
//     } catch (e) {
//       rethrow;
//     }
//   }
// }
