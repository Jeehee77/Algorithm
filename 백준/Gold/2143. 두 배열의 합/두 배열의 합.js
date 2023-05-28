const input = require('fs').readFileSync('./dev/stdin').toString().trim().split('\n').map(v=>v.trim())
const T = +input[0]
const a = input[2].split(' ').map(Number)
const b = input[4].split(' ').map(Number)


const X= a.reduce((r,v,i)=>{ r.push(r[i]+v); return r; },[0])
const Y= b.reduce((r,v,i)=>{ r.push(r[i]+v); return r; },[0])


let answer = 0;

let A = new Map();
for(let i = 0; i<X.length-1; i++){
  for(let j = i+1; j<X.length; j++){
    const subSum = X[j]-X[i]
    if(!A.has(subSum)){
      A.set(subSum, 1)
    }else{
      A.set(subSum,A.get(subSum)+1)
    }
  }
}
let B = [];


for(let i = 0; i<Y.length-1; i++){
  for(let j = i+1; j<Y.length; j++){
    const subSum = Y[j]-Y[i]
    B.push(subSum)
  }
}

const BB = B.sort((a,b)=>a-b)


A.forEach((v,k)=>{
  const target = T-k;
  let cnt = 0;

  const index = find(target-1,BB);
  
    for(let i = index; i<BB.length; i++){
      if(BB[i]==target){
        cnt++;
      }else if(BB[i]>target){
        break;
      }
    }
  
  answer+=cnt*v;
})


console.log(answer)


function find(x,arr){
  let min = 0;
  let max = arr.length-1;
  let mid;
  while(min<=max){
    mid = Math.floor((min+max)/2);
    if(arr[mid]>x){
      max = mid-1;
    }else if(arr[mid]<x){
      min = mid+1;
    }else{
      break;
    }
  }
  return mid;
}