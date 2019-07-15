module.exports = () => {
  let today = new Date();
  let month = today.getMonth();
  if(1<=month<=3) {
    return 'Q1'
  }else if(month<=6) {
    return 'Q2'
  }else if(month<=9) {
    return 'Q3'
  }else if(month<=12) {
    return 'Q4'
  }
    return 'ERR'
}
