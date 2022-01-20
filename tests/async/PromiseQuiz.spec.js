const _=require("lodash"),fnKeys=["bind","apply","call"],MESSAGE_DEFAULT_RETURN="형식에 맞게 반환해야합니다",MESSAGE_IS_FUNCTION="함수를 반환해야합니다",MESSAGE_PARAMETER_LENGTH="함수 인자의 개수가 맞아야합니다",MESSAGE_RIGHT_ANSWER="정답을 반환해야합니다",MESSAGE_CALL_COUNT="함수가 필요한 만큼 호출되어야합니다",MESSAGE_NO_MUTATION="원본 데이터에 영향을 주지 않아야합니다",MESSAGE_PROTOTYPE_PROPERTY="프로토타입의 프로퍼티가 맞아야합니다",MESSAGE_WRONG_INHERITANCE="상속을 정확히 구현해야합니다",MESSAGE_PROMISE="결과가 Promise를 반환해야합니다",isFunctionMessage=e=>`함수를 반환해야하는데, ${e.toString()}을 반환했습니다.`,paramLengthMessage=(e,t)=>`인자의 개수가 ${t}여야 하는데, ${e}입니다.`,callCounterMessage=(e,t,n)=>`${e}: ${t}번 호출되어야하는데, ${n}번 호출됐습니다`,callCounterMessageGEQ=(e,t,n)=>`${e}: ${t}번 이상 호출되어야하는데, ${n}번 호출됐습니다`,callCounterMessageLEQ=(e,t,n)=>`${e}: ${t}번 이하 호출되어야하는데, ${n}번 호출됐습니다`,inheritanceMessage=(e,t)=>`${t.name} 이 ${e.name}을 상속해야합니다`,wrongConstructorMessage=e=>`${e.name}의 prototype객체의 constructor가 ${e.name}이 아닙니다`,messageDefaultReturn=(e,t)=>`${t}을 반환해야하는데, ${e}을 반환했습니다`,iterateIt=(e,t,n)=>{let o=n||10;for(let n=0;n<o;n++)it(`${e} - #${n+1}`,t)},assertDefaultReturn=(e,t,n)=>{it("형식에 맞게 반환해야합니다",function(){let{isValid:o,message:r}=t(e,n);expect(o).toBe(!0,r)})},assertCallCounter=(e,t,n)=>{expect(t[e]).toBe(n[e],callCounterMessage(e,n[e],t[e]))},assertFunction=e=>{it("함수를 반환해야합니다",function(){let t=_.isFunction(e);expect(t).toBe(!0,isFunctionMessage(e))})},assertParamLength=(e,t)=>{it("함수 인자의 개수가 맞아야합니다",function(){let n=e.length,o=t.length;expect(n).toBe(o,paramLengthMessage(n,o))})},assertDefault=(e,t)=>{assertFunction(e),assertParamLength(e,t)},assertPrototypeEquality=(e,t)=>{it("프로토타입의 프로퍼티가 맞아야합니다",function(){let n=!0,o=Object.keys(e.prototype);Object.keys(t.prototype).forEach(e=>{o.includes(e)||(n=!1)}),expect(n).toBe(!0)})},assertInheritance=(e,t)=>{it("상속을 정확히 구현해야합니다",function(){let n=t.prototype instanceof e,o=t.prototype.constructor===t;expect(n).toBe(!0,inheritanceMessage(e,t)),expect(o).toBe(!0,wrongConstructorMessage(e))})},isNullOrUndefined=e=>null==e,assertPromise=(e,t)=>{it(MESSAGE_PROMISE,function(){let n=t?e(...t):e();expect(n).toBeTruthy(),isNullOrUndefined(n)&&fail("결과가 null이거나 undefined입니다"),expect(Object.getPrototypeOf(n)==Promise.prototype).toBe(!0,`결과가 Promise여야하는데, ${n}임`)})};function randomStringGenerator(e){let t="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";return _.range(e).map(e=>t[_.random(t.length)]).join("")}function getCallCounter(){let e={},t={},n={},o=Array.from(arguments),r=o[0],a=o[1],s=o[2],i=o.slice(3);for(let o=0;o<a.length;o++){let s=a[o];t[s]=r[s],n[s]=0,e[s]=function(){return n[s]+=1,t[s].call(this,...arguments)},r[s]=e[s]}s(...i);for(let e=0,n=a.length;e<n;e++){let n=a[e];r[n]=t[n]}return n}const randomUtils={randomArray:(e,t,n)=>_.range(e).map(e=>_.random(t,n)),randomFunctionArray:e=>_.range(e).map(e=>randomUtils.randomSimpleFunction(1,10)),randomSimpleFunction:(e,t)=>{let n=_.random(4),o=_.random(e,t);return 0==n?function(e){return e+o}:1==n?function(e){return e-o}:2==n?function(e){return e*o}:function(e){return e}},randomBoolean:()=>_.random(1)%2==0,randomStringArray:(e,t)=>_.range(e).map(e=>randomStringGenerator(t)),randomName:()=>{let e=["John","Brian","Kent","David","Kyle","Robby","TJ","Tarjan","Edsger","Dijkstra","Maria","Marcus","Miller","Jaco","Jacob","Steven","Phobie","Aaron","Banny","Bones","Bexter","Dexter"];return e[_.random(e.length)]}};describe("[Async]",function(){describe("[Promise]",function(){const e=require("../../src/async/PromiseQuiz");describe("[getPosts]",function(){const{getPosts:t}=e;assertPromise(t),it("정답을 반환해야합니다",async function(){let e=t(),n=(()=>fetch("https://jsonplaceholder.typicode.com/posts").then(e=>e.json()).then(e=>e))(),{pa:o,pe:r}=await Promise.all([e,n]).then(([e,t])=>({pa:e,pe:t}));expect(o).toEqual(r)})}),describe("[getPostById]",function(){const{getPostById:t}=e;assertPromise(t,[1]),iterateIt("정답을 반환해야합니다",async function(){let e=_.random(0,20),n=t(e),o=(e=>fetch(`https://jsonplaceholder.typicode.com/posts/${e}`).then(e=>e.json()).then(e=>e))(e),{pa:r,pe:a}=await Promise.all([n,o]).then(([e,t])=>({pa:e,pe:t}));expect(r).toEqual(a)},3)}),describe("[getPostsByUserId]",function(){const{getPostsByUserId:t}=e;assertPromise(t,[1]),iterateIt("정답을 반환해야합니다",async function(){let e=_.random(0,20),n=t(e),o=(e=>fetch(`https://jsonplaceholder.typicode.com/posts?userId=${e}`).then(e=>e.json()).then(e=>e))(e),{pa:r,pe:a}=await Promise.all([n,o]).then(([e,t])=>({pa:e,pe:t}));expect(r).toEqual(a)},3)}),describe("[createPost]",function(){const{createPost:t}=e;assertPromise(t,["a","b",1]),iterateIt("정답을 반환해야합니다",async function(){let e=randomStringGenerator(4),n=randomStringGenerator(10),o=_.random(1,10),r=t(e,n,o),a=((e,t,n)=>{let o={method:"POST",body:JSON.stringify({title:e,body:t,userId:n}),headers:{"Content-type":"application/json; charset=UTF-8"}};return fetch("https://jsonplaceholder.typicode.com/posts",o).then(e=>e.json()).then(e=>e)})(e,n,o),{pa:s,pe:i}=await Promise.all([r,a]).then(([e,t])=>({pa:e,pe:t}));expect(s).toEqual(i)},3)}),describe("[delayedPromise]",function(){const{delayedPromise:t}=e;assertPromise(t,[0,0])}),describe("[sumAfterAllPromise]",function(){const{sumAfterAllPromise:t}=e,n=(e,t)=>new Promise(n=>{setTimeout(()=>{n(e)},t)});assertPromise(t,[[1]]),it("정답을 반환해야합니다",async function(){let e=await t([n(1,100),n(2,100),n(3,200),n(4,1e3)]);expect(e).toBe(10,`10이 나와야하는데, ${e}이 나옴`)}),it("정답을 반환해야합니다",async function(){let e=_.range(5).map(e=>_.random(10)),o=e.reduce((e,t)=>e+t),r=await t(e.map(e=>n(e,_.random(1,700))));expect(r).toBe(o,`${o}이 나와야하는데 ${r}이 나옴`)})}),describe("[pickFastestValue]",function(){const{pickFastestValue:t}=e,n=(e,t)=>new Promise(n=>{setTimeout(()=>{n(e)},t)});assertPromise(t,[[1]]),it("정답을 반환해야합니다",async function(){let e=await t([n(1,200),n(2,100),n(3,200),n(100,0)]);expect(e).toBe(100,`100이 나와야하는데, ${e}이 나옴`)}),it("정답을 반환해야합니다",async function(){let e=[_.random(0,50),_.random(200,300),_.random(300,500)],o=[_.random(0,100),_.random(0,100),_.random(0,100)],r=await t(e.map((e,t)=>n(o[t],e)));expect(r).toBe(o[0],`${o[0]}이 나와야하는데 ${r}이 나옴`)})})})});