bool isCityHCM(String stringValue) {
  int lastIndex = stringValue.lastIndexOf(',');
  if (lastIndex == -1) {
    return false;
  }
  String city = stringValue.substring(lastIndex + 1).trim();

  return city == 'Thành phố Hồ Chí Minh';
}
