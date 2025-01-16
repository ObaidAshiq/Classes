let myPromise = new Promise(function(myResolve, myReject) {
    // "Producing Code" (May take some time)
    
      myResolve(onResolve); // when successful
      myReject(onReject);  // when error
    });
//3 states
// Pending
// Fulfilled
// Rejected

    Product.create()  //==>Promise 
    Product.create().then().catch()  //==>Promise 
    Product.create().then((res)=>{console.log(res)})  //==>Promise 
    Product.create().catch((err)=>{console.log(err)})  //==>Promise 