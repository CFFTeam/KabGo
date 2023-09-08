String convertTimeFormat(String input) {
  List<String> parts = input.split(' ');
  if (parts.length == 4) {
    int hours = int.parse(parts[0]);
    int mins = int.parse(parts[2]);
    return '$hours giờ $mins phút';
  } else if (parts.length == 2) {
    if (parts[1] == 'mins') {
      int mins = int.parse(parts[0]);
      return '$mins phút';
    } else if (parts[1] == 'min') {
      int mins = int.parse(parts[0]);
      return '$mins phút';
    }
  }
  return input;
}
