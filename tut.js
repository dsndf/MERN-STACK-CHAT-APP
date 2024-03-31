let myEveryFunction = function(cb){
    
   let ans = true;
   for(let i of arr){
    ans = ans && cb(i);
   }
    return ans;

}
