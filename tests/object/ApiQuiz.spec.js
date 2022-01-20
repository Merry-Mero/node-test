const _=require("lodash"),MESSAGE_DEFAULT_RETURN="형식에 맞게 반환해야합니다",MESSAGE_IS_FUNCTION="함수를 반환해야합니다",MESSAGE_PARAMETER_LENGTH="함수가 인자의 개수가 맞아야합니다",MESSAGE_RIGHT_ANSWER="정답을 반환해야합니다",MESSAGE_CALL_COUNT="함수가 필요한 만큼 호출되어야합니다",MESSAGE_NO_MUTATION="원본 데이터에 영향을 주지 않아야합니다",isFunctionMessage=e=>`함수를 반환해야하는데, ${e.toString()}을 반환했습니다.`,paramLengthMessage=(e,t)=>`인자의 개수가 ${t}여야 하는데, ${e}입니다.`,callCounterMessage=(e,t,n)=>`${e}: ${t}번 호출되어야하는데, ${n}번 호출됐습니다`,callCounterMessageGEQ=(e,t,n)=>`${e}: ${t}번 이상 호출되어야하는데, ${n}번 호출됐습니다`,callCounterMessageLEQ=(e,t,n)=>`${e}: ${t}번 이하 호출되어야하는데, ${n}번 호출됐습니다`,iterateIt=(e,t,n)=>{let r=n||10;for(let n=0;n<r;n++)it(`${e} - #${n+1}`,t)},assertCallCounter=(e,t,n)=>{expect(t[e]).toBe(n[e],callCounterMessage(e,n[e],t[e]))},assertFunction=e=>{it("함수를 반환해야합니다",function(){let t=_.isFunction(e);expect(t).toBe(!0,isFunctionMessage(e))})},assertParamLength=(e,t)=>{it("함수가 인자의 개수가 맞아야합니다",function(){let n=e.length,r=t.length;expect(n).toBe(r,paramLengthMessage(n,r))})},assertDefaultReturn=(e,t,n)=>{it("형식에 맞게 반환해야합니다",function(){let{isValid:r,message:a}=t(e,n);expect(r).toBe(!0,a)})},assertDefault=(e,t)=>{assertFunction(e),assertParamLength(e,t)};function randomStringGenerator(e){let t="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";return _.range(e).map(e=>t[_.random(t.length)]).join("")}function getCallCounter(){let e={},t={},n={},r=Array.from(arguments),a=r[0],o=r[1],c=r[2],l=r.slice(3);for(let r=0;r<o.length;r++){let c=o[r];t[c]=a[c],n[c]=0,e[c]=function(){return n[c]+=1,t[c].call(this,...arguments)},a[c]=e[c]}c(...l);for(let e=0,n=o.length;e<n;e++){let n=o[e];a[n]=t[n]}return n}const randomUtils={randomArray:(e,t,n)=>_.range(e).map(e=>_.random(t,n)),randomFunctionArray:e=>_.range(e).map(e=>randomUtils.randomSimpleFunction(1,10)),randomSimpleFunction:(e,t)=>{let n=_.random(4),r=_.random(e,t);return 0==n?function(e){return e+r}:1==n?function(e){return e-r}:2==n?function(e){return e*r}:function(e){return e}},randomBoolean:()=>_.random(1)%2==0};describe("[Object]",function(){const e=require("../../src/object/ApiQuiz");describe("[API]",function(){describe("[Object.create - 1 (createObject1)]",function(){const{createObject1:t}=e,n=e=>Object.create(e),r=function(){};it("형식에 맞게 반환해야합니다",function(){let e=t(r.prototype);expect(e).toBeTruthy(),null==e&&fail(`객체를 반환해야하는데, ${e}이 반환됨`)}),it("프로토타입 chain이 맞아야합니다",function(){let e=t(r.prototype),n=r.prototype.isPrototypeOf(e);expect(n).toBe(!0,"전달된 프로토입으로 객체를 생성하고 있지 않은 것 같습니다")}),it(MESSAGE_CALL_COUNT,function(){let e=getCallCounter(Object,"create",t,r.prototype),a=getCallCounter(Object,"create",n,r.prototype);assertCallCounter("create",e,a)})}),describe("[Object.create - 2 (createObject2)]",function(){const{createObject2:t}=e,n=()=>Object.create(null),r=["toString","valueOf","hasOwnProperty","constructor","isPrototypeOf","propertyIsEnumerable","toLocaleString"];it("형식에 맞게 반환해야합니다",function(){let e=t();expect(e).toBeTruthy(),null==e&&fail(`객체를 반환해야하는데, ${e}이 반환됨`)}),it("완전히 빈 객체를 반환해야합니다",function(){let e=t(),n=r.every(t=>t in e);expect(n).toBe(!1,"Object.prototype의 어떤 함수도 가지고 있어서는 안됩니다")}),it("어떠한 프로토타입 계층도 형성하지 않는 객체를 만들어야합니다",function(){let e=t();expect(Object.getPrototypeOf(e)).toBeNull(),null!==Object.getPrototypeOf(e)&&fail(`프로토타입이 형성되어있습니다. ${Object.getPrototypeOf(e)}`)}),it(MESSAGE_CALL_COUNT,function(){let e=getCallCounter(Object,"create",t),r=getCallCounter(Object,"create",n);assertCallCounter("create",e,r)})}),describe("[Object.keys - 1 (listingKeys)]",function(){const{listingKeys:t}=e,n=e=>Object.keys(e);it("형식에 맞게 반환해야합니다",function(){let e=t({});expect(e).toBeTruthy(),"object"!=typeof e||"pop"in e||fail(`배열을 반환해야하는데, ${e}이 반환됨`)}),iterateIt("정답을 반환해야합니다",function(){let e=_.range(5).map(e=>randomStringGenerator(3)).reduce((e,t)=>(e[t]=_.random(1,10),e),{}),r=t(e),a=n(e);expect(r).toEqual(a)},3),iterateIt(MESSAGE_CALL_COUNT,function(){let e=_.range(5).map(e=>randomStringGenerator(3)).reduce((e,t)=>(e[t]=_.random(1,10),e),{}),r=getCallCounter(Object,"keys",t,e),a=getCallCounter(Object,"keys",n,e);assertCallCounter("keys",r,a)},3)}),describe("[Object.keys - 2 (invert)]",function(){const{invert:t}=e,n=e=>Object.keys(e).reduce((t,n)=>(t[e[n]]=n,t),Object.create(null));it("형식에 맞게 반환해야합니다",function(){let e=t({});expect(e).toBeTruthy(),null==e&&fail(`객체를 반환해야하는데, ${e}을 반환함`)}),iterateIt("정답을 반환해야합니다",function(){let e=_.range(5).map(e=>randomStringGenerator(3)).reduce((e,t)=>(e[t]=_.random(1,10),e),{}),r=t(e),a=n(e);expect(r).toEqual(a)},5),iterateIt(MESSAGE_CALL_COUNT,function(){let e=_.range(5).map(e=>randomStringGenerator(3)).reduce((e,t)=>(e[t]=_.random(1,10),e),{}),r=getCallCounter(Object,["keys","create"],t,e),a=getCallCounter(Object,["keys","create"],n,e);assertCallCounter("keys",r,a),assertCallCounter("create",r,a)},3),it("결과 객체가 완전히 빈 객체로 부터 만들어져야합니다",function(){let e=t({});let n=["toString","valueOf","hasOwnProperty","constructor","isPrototypeOf","propertyIsEnumerable","toLocaleString"].every(t=>t in e);expect(n).toBe(!1,"Object.prototype의 어떤 함수도 가지고 있어서는 안됩니다")})}),describe("[Object.values - 1 (sumOfEvenValues)]",function(){const{sumOfEvenValues:t}=e,n=e=>Object.values(e).filter(e=>e%2==0).reduce((e,t)=>e+t,0);it("형식에 맞게 반환해야합니다",function(){let e=t({});expect(e).toBe(0),null!=e&&"number"==typeof e||fail(`결과가 없거나 숫자를 반환하지 않고 있습니다: ${e}`)}),iterateIt("정답을 반환해야합니다",function(){let e=_.range(10).map(e=>randomStringGenerator(3)).reduce((e,t)=>(e[t]=_.random(1,10),e),{}),n=t(e),r=t(e);expect(n).toBe(r,`${r}이 나와야하는데, ${n}이 나옴`)}),iterateIt(MESSAGE_CALL_COUNT,function(){let e=_.range(10).map(e=>randomStringGenerator(3)).reduce((e,t)=>(e[t]=_.random(1,10),e),{}),r=getCallCounter(Object,["values"],t,e),a=getCallCounter(Object,["values"],n,e);assertCallCounter("values",r,a)})}),describe("[Object.entries - 1 (sumOfValuesOfUpperCasedKey)]",function(){const{sumOfValuesOfUpperCasedKey:t}=e,n=e=>{return Object.entries(e).reduce((e,[t,n])=>t.split("").every(e=>"ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(e)>=0)?e+n:e,0)};it("형식에 맞게 반환해야합니다",function(){let e=t({});expect(e).toBe(0),null!=e&&"number"==typeof e||fail(`결과가 없거나 숫자를 반환하지 않고 있습니다: ${e}`)});let r=t;iterateIt("정답을 반환해야합니다",function(){let e=_.range(10).map(e=>randomStringGenerator(3)).reduce((e,t)=>(e[t]=_.random(1,10),e),{});if(_.random(1)%2==0){let t=_.range(10).map(e=>randomStringGenerator(3).toUpperCase()).reduce((e,t)=>(e[t]=_.random(1,10),e),{});e=Object.assign({},e,t)}let t=r(e),a=n(e);expect(t).toBe(a,`${a}가 나와야하는데 ${t}이 나옴`)}),iterateIt(MESSAGE_CALL_COUNT,function(){let e=_.range(10).map(e=>randomStringGenerator(3)).reduce((e,t)=>(e[t]=_.random(1,10),e),{});if(_.random(1)%2==0){let t=_.range(10).map(e=>randomStringGenerator(3).toUpperCase()).reduce((e,t)=>(e[t]=_.random(1,10),e),{});e=Object.assign({},e,t)}let t=getCallCounter(Object,["entries"],r,e),a=getCallCounter(Object,["entries"],n,e);assertCallCounter("entries",t,a)})}),describe("[Object.assign - 1 (assignObject)]",function(){const{assignObject:t}=e,n=e=>Object.assign({},e);it("형식에 맞게 반환해야합니다",function(){let e=t();expect(e).toBeTruthy(),null==e&&fail(`객체를 반환해야하는데, ${e}이 반환됨`)});const r=t;it("정답을 반환해야합니다",function(){let e={a:1,b:2,c:3},t=r(e),a=n(e);expect(t).toEqual(a)}),it(MESSAGE_NO_MUTATION,function(){let e={a:1,b:2,c:3},t=r(e);t.a=100,expect(t.a===e.a).toBe(!1,"복사본을 바꿨는데, 원본이 영향을 받음")}),it(MESSAGE_CALL_COUNT,function(){let e={a:1,b:2,c:3},t=getCallCounter(Object,["assign"],r,e),a=getCallCounter(Object,["assign"],n,e);assertCallCounter("assign",t,a)})}),describe("[Object.assign - 2 (assignMultipleObjects)]",function(){const{assignMultipleObjects:t}=e,n=e=>Object.assign({},...e);it("형식에 맞게 반환해야합니다",function(){let e=t([]);expect(e).toBeTruthy(),null==e&&fail(`객체를 반환해야하는데, ${e}이 반환됨`)});const r=t;it("정답을 반환해야합니다",function(){let e={a:1,b:2},t={c:3,d:4},a={x:1,y:2},o={a:10,y:22},c=n([e,t]),l=n([t,a]),i=n([e,o]),s=n([a,o]),u=r([e,t]),p=r([t,a]),f=r([e,o]),g=r([a,o]);expect(u).toEqual(c),expect(p).toEqual(l),expect(f).toEqual(i),expect(g).toEqual(s)}),it(MESSAGE_NO_MUTATION,function(){let e={a:1,b:2,c:3},t=r([e]);t.a=100,expect(t.a===e.a).toBe(!1,"복사본을 바꿨는데, 원본이 영향을 받음")}),it(MESSAGE_CALL_COUNT,function(){let e={a:1,b:2,c:3},t=getCallCounter(Object,["assign"],r,[e]),a=getCallCounter(Object,["assign"],n,[e]);assertCallCounter("assign",t,a)})})})});