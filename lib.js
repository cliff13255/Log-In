let formLogin=document.querySelector(".login")
let loginReg=document.getElementById("RegNo")
let userName=document.getElementById("name")
let userPwd=document.getElementById("pdw")
let checkBtn=document.getElementById("check")
let libReg=document.getElementById("reg")
let bookName=document.getElementById("book-name")
let dayTaken=document.getElementById("day")
let libForm=document.getElementById("lib-form")
let details=document.getElementById("details")
let newDiv=document.querySelector(".new")
let libName=document.getElementById("libName")

let logForm=document.getElementById("log")
let logReg=document.getElementById("logReg")
let logPwd=document.getElementById("logPwd")
let checkBtnLog=document.getElementById("checkLog")
let confirm=document.getElementById("conf")
let registarBtn= document.getElementById("registar")

let data=JSON.parse(localStorage.getItem("data")) || [];
let library=JSON.parse(localStorage.getItem("library")) || [];

checkBtn.addEventListener("click",check)
checkBtnLog.addEventListener("click",checkLog)
registarBtn.addEventListener("click",(e)=>{
e.preventDefault();

formLogin.style.display="flex"
formLogin.style.flexDirection="column"
logForm.style.display="none"
});

//password show
    function check(e){
    e.preventDefault();
    
    if(userPwd.type==="password" && userPwd.value!==""){
        userPwd.type="text"
        checkBtn.innerHTML="close"
    }else{
        userPwd.type="password";
        checkBtn.innerHTML="open";
    }
    return;
}




   function checkLog(e){
    e.preventDefault();
    
    if(logPwd.type==="password" && logPwd.value!==""){
        logPwd.type="text"
        checkBtnLog.innerHTML="close"
    }else{
        logPwd.type="password";
        checkBtnLog.innerHTML="open";
    }
    return;
}

//login form
logForm.addEventListener('submit',(e)=>{
    e.preventDefault()
     let reg=logReg.value.trim()
    let password=logPwd.value

    let found=data.find(x=>x.password===password && x.reg===reg)

    if(!found){
        confirm.innerHTML="invalid reg no or password"
        logForm.reset()
        return;
    }

        alert("log in successfull");
    libForm.style.display="flex"
    logForm.style.display="none"
    libForm.style.flexDirection="column"
    details.style.display="flex";
    details.style.flexDirection="column"

    
    logForm.reset()
    record()

})

//registration

formLogin.addEventListener("submit",(e)=>{
    e.preventDefault()

    let reg=loginReg.value.trim()
    let user=userName.value
    let password=userPwd.value
    password=password.toString();
    

    if(reg==="" || user==="" || password=="") return;

    let exist=data.some(x=>x.reg===reg);
    if(exist){
        alert("The reg No already exists");
        formLogin.reset()
        return;
    }


    data.push({
        reg:reg,
        user:user,
        password:password
    })

    localStorage.setItem("data",JSON.stringify(data));
    formLogin.reset();
    alert(`Account created`);
    
    libReg.value=reg;
    libName.value=user;

    // libReg.value=libReg.fill(`${data.user}`);
    libForm.style.display="flex"
    formLogin.style.display="none"
    libForm.style.flexDirection="column"
    details.style.display="flex";
    details.style.flexDirection="column"
    record()

});

libForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let libUser=libReg.value.trim()
    let book=bookName.value
    let date=dayTaken.value

    if(date==="" || libUser==="" || book==="") return;

    library.push({
        book:book,
        date:date,
        libUser:libUser
    });

    // localStorage.setItem("library",JSON.stringify(library));
    libForm.reset();

    record()
    
    

});

function record(){
     details.innerHTML=""
    
   library.forEach((item,index)=> {

     let today=new Date();
     let then= new Date(item.date);

     let diff=today-then;

     let duration=Math.floor(diff/(1000*60*60*24));
     //console.log(duration)

     let pay=  duration>=5? `You have a due pay of ${duration*5}.ksh you never returned the book on time` : "You have no charges,,it was on time"


    let div=document.createElement('div')
     div.innerHTML=`
     <div class="new" style="display: flex;flex-direction:column;margin-top:20px;">
     <span>${item.libUser}</span><br>
     <span>${item.book}</span><br>
     <span>${item.date}</span><br>
     <p>${pay}</p>
     </div>
     <button onclick="deleteRecord(${item.index})">delete</button>
     `
     details.appendChild(div);
   });
     
    localStorage.setItem("library",JSON.stringify(library));
}

function deleteRecord(index){
    library.splice(index,1)
    record();
}
record()
