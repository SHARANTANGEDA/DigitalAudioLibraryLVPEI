module.exports = (age) => {
  console.log({inside:age})
  if(age>=1 && age<=10) {
    console.log("here")
    return '1-10 yrs'
  }
  if(age>=11 && age<=20) {
    return '11-20 yrs'
  }
  if(age>=21&& age<=30) {
    return '21-30 yrs'
  }
  if(age>=31 && age<=40) {
    return '31-40 yrs'
  }
  if(age>=41 && age<=50) {
    return '41-50 yrs'
  }
  if(age>=51 && age<=60) {
    return '51-60 yrs'
  }
  if(age>=61 && age<=70) {
    return '61-70 yrs'
  }
  if(age>=71 && age<=80) {
    return '71-80 yrs'
  }
  if(age>=81 && age<=90) {
    return '81-90 yrs'
  }
  if(age>=91 && age<=100) {
    return '91-100 yrs'
  }
  if(age>=101 && age<=110) {
    return '101-110 yrs'
  }
  if(age>=111 && age<=120) {
    return '111-120 yrs'
  }
  return 'Extreme';
}
