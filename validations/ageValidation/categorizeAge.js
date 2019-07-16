module.exports = (age) => {
  if(1<=age<=10) {
    return '1-10 yrs yrs'
  }
  if(11<=age<=20) {
    return '11-20 yrs'
  }
  if(21<=age<=30) {
    return '21-30 yrs'
  }
  if(31<=age<=40) {
    return '31-40 yrs'
  }
  if(41<=age<=50) {
    return '41-50 yrs'
  }
  if(51<=age<=60) {
    return '51-60 yrs'
  }
  if(61<=age<=70) {
    return '61-70 yrs'
  }
  if(71<=age<=80) {
    return '71-80 yrs'
  }
  if(81<=age<=90) {
    return '81-90 yrs'
  }
  if(91<=age<=100) {
    return '91-100 yrs'
  }
  if(101<=age<=110) {
    return '101-110 yrs'
  }
  if(111<=age<=120) {
    return '111-120 yrs'
  }
  return 0;
}
