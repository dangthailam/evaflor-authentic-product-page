function persistence(num) {
   //code me
   var total = 0;
   var sNum = num.toString();
   while(sNum.length > 1)
   {
     total++;
     sNum = sNum.split('');
     sNum = sNum.map((a) => parseInt(a));
     sNum = sNum.reduce((a, b) => a * b);
     console.log(sNum);
   }
   return total;
}
persistence(39);
