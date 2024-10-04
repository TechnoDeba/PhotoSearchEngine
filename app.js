const access_key=`wzAsQH5dDljjkcCL3bRpVwbmxqSFFiYiqwK8ApkHQCc`;
let ijk=document.querySelector(".images");
let page=1;
let item="";
let inpu=document.querySelector(".search-box input");
let btn=document.querySelector(".search-box button");
let more=document.querySelector("#more");

async function replyResponse(){
    item=inpu.value;
let url=`https://api.unsplash.com/search/collections?page=${page}&query=${item}&client_id=${access_key}&per_page=17`;
let response=await fetch(url);
let data=await response.json();
let results=data.results;
if(page==1){
    ijk.innerHTML="";
}
setTimeout(()=>{
    more.style.display="block";
   },1000);
results.map((result)=>{
    let li=document.createElement("li");
    li.classList.add("image");
    let html=`<img src="${result.preview_photos[0].urls.small}" alt="" class="stylish-photos">
                <div class="details">
                    <div class="photo-details">
                        <img src="./camera.svg" alt="...">
                        <p>${result.cover_photo.slug}</p>
                    </div>
                    <div class="download" onclick=download("${result.preview_photos[0].urls.small}")>
                        <img src="./download.svg" alt="..." class="stylish-photos">
                    </div>
                </div>`;
                li.innerHTML=html;
                ijk.appendChild(li);
})
}

function download(imgurl){
   fetch(imgurl).then(res=>res.blob()).then(file=> {
    let a=document.createElement("a");
    a.href=URL.createObjectURL(file);
    a.download=new Date().getTime();
    a.click();

   }).catch(()=>
alert("failed to download"))
}
btn.addEventListener("click",()=>{
    replyResponse();
})

more.addEventListener("click",()=>{
    page++;
    replyResponse();
})