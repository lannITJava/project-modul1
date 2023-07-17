// render Page
let currentPage = 1;
let recordsPerPage = 3;
//let action = "create";
function renderData(page,studentManagementStore){
    
    //let studentManagementStore= localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
    let pageMax = getTotalPage(studentManagementStore);
    if (page<-1) {
        page = 1;
    }
    if (page>pageMax) {
        page = pageMax;
    }
    let tbody = document.getElementById("content");
    tbody.innerHTML="";
    let indexMinOnPage = (page-1)*recordsPerPage;
    let indexMaxOnPage;
    if (page*recordsPerPage>studentManagementStore.length) {
        indexMaxOnPage= studentManagementStore.length;
    }else{
        indexMaxOnPage = page*recordsPerPage;
    }
    for (let index = indexMinOnPage; index < indexMaxOnPage; index++) {
       tbody.innerHTML+=`<tr>
                           <td>${studentManagementStore[index].courseId}</td>
                           <td>${studentManagementStore[index].courseName}</td>
                           <td>${studentManagementStore[index].courseTime}</td>
                           <td>${studentManagementStore[index].status}</td>
                           <td>
                                  <button id="edit" onclick=initEdit('${studentManagementStore[index].courseId}')><i class="fa-solid fa-pen-to-square"></i></button>
                                  <button id="delete" onclick=deleteCourse('${studentManagementStore[index].courseId}')><i class="fa-solid fa-trash-can"></i></button>
                           </td>
                         </tr>`
    }
    let listPage = document.getElementById("listPage");
    listPage.innerHTML="";
    for (let i = 1; i <= pageMax; i++) {
       listPage.innerHTML+=`<li><a href="javascript:clickPage('${i}')">${i}</a></li>`
    }
    let preview = document.getElementById("preview");
    let next = document.getElementById("next");
    if (currentPage==1) {
        preview.style.visibility="hidden";
    }else{
        preview.style.visibility="visible";
    }
    if (currentPage==pageMax) {
        next.style.visibility="hidden";
    } else {
        next.style.visibility="visible";
    }
}

function previewPage(){
    currentPage--;
    let studentManagementStore= localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
    renderData(currentPage,studentManagementStore);
}
function nextPage() {
    currentPage++;
    let studentManagementStore= localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
    renderData(currentPage,studentManagementStore);
}
function getTotalPage(studentManagementStore){
    return Math.ceil(studentManagementStore.length/recordsPerPage);
}
function clickPage(page){
    currentPage= page;
    let studentManagementStore= localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
    renderData(page,studentManagementStore);
}