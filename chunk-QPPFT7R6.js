import{d as F}from"./chunk-LGCOYUID.js";import{a as k}from"./chunk-HXCBLBTN.js";import{a as I,b as f,c as L,d as w,e as O,f as T,g as N,i as M,j as R}from"./chunk-JX4KCMVS.js";import{Ba as x,Fa as g,L as h,Ma as p,Oa as n,Pa as s,Q as y,Qa as u,Sa as C,Xa as a,a as b,b as v,qb as P,rb as S,sa as l,wa as m,xb as _}from"./chunk-BN5C3YFC.js";var c=class o{constructor(e){this.http=e}baseUrl="https://dummyjson.com";login(e){return this.http.post(`${this.baseUrl}/auth/login`,e)}getAllPosts(){return this.http.get(`${this.baseUrl}/posts`)}getUserPosts(e){return this.http.get(`${this.baseUrl}/posts/user/${e}`)}deletePost(e){return this.http.delete(`${this.baseUrl}/posts/${e}`)}getProfile(){let e=localStorage.getItem("authToken");return this.http.get(`${this.baseUrl}/auth/me`,{headers:{Authorization:`Bearer ${e}`}})}static \u0275fac=function(r){return new(r||o)(y(_))};static \u0275prov=h({token:o,factory:o.\u0275fac,providedIn:"root"})};function j(o,e){o&1&&(n(0,"div",8),a(1," Identity is required. "),s())}function $(o,e){o&1&&(n(0,"div",8),a(1," Password is required. "),s())}function G(o,e){o&1&&(n(0,"p",8),a(1,"Invalid credentials. Please try again."),s())}var U=class o{constructor(e,r,t,i){this.fb=e;this.router=r;this.api=t;this.authService=i;this.loginForm=this.fb.group({identity:["",f.required],password:["",f.required]}),localStorage.removeItem("authUser"),localStorage.removeItem("authToken")}loginForm;error=!1;token=null;login(){let e={username:this.loginForm.value.identity,password:this.loginForm.value.password};this.api.login(e).subscribe({next:r=>{let t=r.accessToken;localStorage.setItem("authToken",t),this.token=t,this.api.getProfile().subscribe({next:i=>{console.log("Token:",t),this.authService.setUser(v(b({},i),{accessToken:t})),this.router.navigateByUrl("/dashboard")},error:i=>{this.error=!0,console.error("\u274C Failed to fetch profile:",i)}})},error:()=>{this.error=!0,console.log("\u274C Invalid credentials")}})}static \u0275fac=function(r){return new(r||o)(m(M),m(F),m(c),m(k))};static \u0275cmp=x({type:o,selectors:[["app-login"]],decls:15,vars:5,consts:[[1,"login-container"],[3,"ngSubmit","formGroup"],["for","identity"],["type","text","id","identity","formControlName","identity"],["class","error-message",4,"ngIf"],["for","password"],["type","password","id","password","formControlName","password"],["type","submit",3,"disabled"],[1,"error-message"]],template:function(r,t){if(r&1&&(n(0,"div",0)(1,"h2"),a(2,"Login"),s(),n(3,"form",1),C("ngSubmit",function(){return t.login()}),n(4,"label",2),a(5,"Email or Username"),s(),u(6,"input",3),g(7,j,2,0,"div",4),n(8,"label",5),a(9,"Password"),s(),u(10,"input",6),g(11,$,2,0,"div",4),n(12,"button",7),a(13,"Login"),s()(),g(14,G,2,0,"p",4),s()),r&2){let i,d;l(3),p("formGroup",t.loginForm),l(4),p("ngIf",((i=t.loginForm.get("identity"))==null?null:i.invalid)&&((i=t.loginForm.get("identity"))==null?null:i.touched)),l(4),p("ngIf",((d=t.loginForm.get("password"))==null?null:d.invalid)&&((d=t.loginForm.get("password"))==null?null:d.touched)),l(),p("disabled",t.loginForm.invalid),l(2),p("ngIf",t.error)}},dependencies:[S,P,R,O,I,L,w,T,N],styles:[".login-container[_ngcontent-%COMP%]{max-width:400px;margin:80px auto;padding:20px;border:1px solid #ccc;border-radius:8px}label[_ngcontent-%COMP%]{display:block;margin-top:10px}input[_ngcontent-%COMP%]{width:100%;padding:8px;margin-top:4px;margin-bottom:10px;box-sizing:border-box}button[_ngcontent-%COMP%]{width:100%;padding:10px;background-color:#06c;color:#fff;border:none;cursor:pointer;border-radius:4px}button[_ngcontent-%COMP%]:hover{background-color:#004999}.error-message[_ngcontent-%COMP%]{color:red;margin-top:10px}.token-display[_ngcontent-%COMP%]{margin-top:10px;word-break:break-all;font-size:14px;background-color:#e0f7fa;padding:10px;border-radius:4px;color:#004d40;border:1px dashed #00acc1}"]})};export{U as LoginComponent};
