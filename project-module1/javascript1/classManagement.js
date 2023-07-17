function courseManagement(){
    window.location.href="courseManagement.html";
}
function dashboard(){
    window.location.href="dashboard.html";
}
function classManagement(){
    window.location.href="classManagement.html";
}
function studentManagement(){
    window.location.href="studentManagement.html";
}
let currentPage= 1;
let recordsPerPage=3;
let studentManagementStore = localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
let arrClasses=[];
        studentManagementStore.forEach(course=>{
             course.arrClass.forEach(classOfStudent=>{
                arrClasses.push(classOfStudent);
             })
        });
        console.log("-->",arrClasses);

function renderData(page,studentManagementStore){
   
    //Tham so studentManagementStore la tham so gi, em chua su dung no trong funtion nay
    //Ma tham so do chinh la tham so de minh render du lieu
    // e da luu ben ngoai o dong 15 a
    // Thu 1: dang lam vie voi lop de render ra cac lop ma dat ten bien nay rat khong ro rang
    // Thu 2: da khong su dung thi xay dung tham so nay lam gi
    //let studentManagementStore = localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
    let pageMax = getTotalPage(arrClasses);
    if (page<1) {
        page= 1;
    }
    if (page > pageMax) {
        page= pageMax;
    }
    let tbody = document.getElementById("content");
    tbody.innerHTML="";
    let indexMinOnPage = (page-1)*recordsPerPage;
    let indexMaxOnPage;
    if (page*recordsPerPage>arrClasses.length) {
        indexMaxOnPage = arrClasses.length;
    }else{
        indexMaxOnPage= page*recordsPerPage;
    }
    for (let index = indexMinOnPage; index < indexMaxOnPage; index++) {
        
        tbody.innerHTML+=`
        <tr>
        <td>${index+1}</td>
        <td>${arrClasses[index].classId}</td>
        <td>${arrClasses[index].className}</td>
        <td>${arrClasses[index].classTeacher}</td>
        <td>${arrClasses[index].description}</td>
        <td>${arrClasses[index].classOfStudent}</td>
        <td>${arrClasses[index].status}</td>
        <td>
          <button id="edit" onclick=initEdit('${arrClasses[index].classId}')><i class="fa-solid fa-pen-to-square"></i></button>
          <button id="delete" onclick=deleteClass('${arrClasses[index].classId}')><i class="fa-solid fa-trash-can"></i></button>
        </td>
      </tr>
        `
    }
    let listPage = document.getElementById("listPage");
    listPage.innerHTML="";
    for (let i = 1; i <= pageMax; i++) {
       listPage.innerHTML+=`<li><a href="javascript:clickPage('${i}')">${i}</a></li>`
    }
    let preview = document.getElementById("preview");
    let next = document.getElementById("next");
    if (currentPage == 1) {
        preview.style.visibility = "hidden";
    } else {
        preview.style.visibility = "visible";
    }
    if (currentPage == pageMax) {
        next.style.visibility = "hidden";
    } else {
        next.style.visibility = "visible";
    }
}
function previewPage() {
    currentPage--;
    // render lại dữ liệu lên table
    renderData(currentPage,studentManagementStore);
}
// Hàm nextPage
function nextPage() {
    currentPage++;
    renderData(currentPage,studentManagementStore);
}
function getTotalPage(arrClasses){
    return Math.ceil(arrClasses.length/recordsPerPage);
}
function clickPage(page){
    currentPage= page;
    renderData(page,studentManagementStore);
}
let btnButtonNewClass = document.getElementById("btnButtonNewClass");
btnButtonNewClass.onclick = ()=>{
    let arrCourse = localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
    let courseComboBox = document.getElementById("course");
    courseComboBox.innerHTML="";
    arrCourse.forEach(course => {
        courseComboBox.innerHTML+=`<option value="${course.courseId}">${course.courseName}</option>`
    });
}
function validateClass() {
    let classId = document.getElementById("classId").value;
    let className = document.getElementById("className").value;
    let classTeacher = document.getElementById("classTeacher").value;
    let description = document.getElementById("description").value;
    let classOfStudent = document.getElementById("classOfStudent").value;
    let errorId = document.getElementById("errorId");
    if (classId=="") {
        errorId.innerHTML="Vui lòng không để trống mã lớp học"
        errorId.style.color="red";
        return false;
    } else {
        errorId.innerHTML ="";
    }
    let errorName = document.getElementById("errorName");
    if (className=="") {
        errorName.innerHTML="Vui lòng không để trống tên lớp học"
        errorName.style.color="red";
        return false;
    } else {
        errorName.innerHTML ="";
    }
    let errorTeacher = document.getElementById("errorTeacher");
    if (classTeacher=="") {
        errorTeacher.innerHTML="Vui lòng không để trống tên giảng viên"
        errorTeacher.style.color="red";
        return false;
    } else {
        errorTeacher.innerHTML ="";
    }
    let errorDescription = document.getElementById("errorDescription");
    if (description=="") {
        errorDescription.innerHTML="Vui lòng không để trống mô tả"
        errorDescription.style.color="red";
        return false;
    } else {
        errorDescription.innerHTML ="";
    }
    let errorStudent = document.getElementById("errorClassOfStudent");
    if (classOfStudent=="") { 
        errorStudent.innerHTML="Vui lòng không để trống sĩ số lớp "
        errorStudent.style.color="red";
        return false;
    }else {
        errorStudent.innerHTML="";
    }
    return true;
}
//tao moi lop moi
let btnCreateClass = document.getElementById("btnCreateClass");
btnCreateClass.onclick = (event)=>{
    event.preventDefault();
    if (validateClass()) {
        let classId = document.getElementById("classId").value;
    let className = document.getElementById("className").value;
    let classTeacher = document.getElementById("classTeacher").value;
    let description = document.getElementById("description").value;
    let classOfStudent = document.getElementById("classOfStudent").value;
    let status = document.querySelector("input[type='radio']:checked").value;
    let arrStudent = [];
    let courseId = document.getElementById("course").value;
    let studentManagementStore =localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
    let index= getIndexCourseByCourseId(studentManagementStore,courseId);
    if (index>-1) {
        let newClass = {classId,className,classTeacher,description,classOfStudent,status,arrStudent};
        studentManagementStore[index].arrClass.push(newClass);
    }
    localStorage.setItem("studentManagementStore",JSON.stringify(studentManagementStore));
    window.location.reload();
    renderData(1,studentManagementStore);
    }
    
}
var editClassModal = new bootstrap.Modal(document.getElementById('editClassModal'), {
  keyboard: false
});
function initEdit(classId){
   editClassModal.show();    
   let index = getIndexClassId(arrClasses,classId);
    document.getElementById("updateClassId").value=arrClasses[index].classId;
    document.getElementById("updateClassId").readOnly= true;
    document.getElementById("updateClassName").value=arrClasses[index].className;
    document.getElementById("updateClassTeacher").value=arrClasses[index].classTeacher;
    document.getElementById("updateDescription").value= arrClasses[index].description;
    document.getElementById("updateClassOfStudent").value = arrClasses[index].classOfStudent;
    if (arrClasses[index].status=="Hoạt động") {
        document.getElementById("updateStudding").checked= true;
    }else if (arrClasses[index].status=="Chờ lớp") {
        document.getElementById("updatePending").checked= true;
    } else {
        document.getElementById("updateEnding").checked= true;
    }
}
let btnUpdateClass = document.getElementById("btnUpdateClass");
btnUpdateClass.onclick=(e)=>{
    e.preventDefault();
    

        let classId = document.getElementById("updateClassId").value;
        let className = document.getElementById("updateClassName").value;
        let classTeacher = document.getElementById("updateClassTeacher").value;
        let description = document.getElementById("updateDescription").value;
        let classOfStudent = document.getElementById("updateClassOfStudent").value;
        let status = document.querySelector("input[name='updateStatus']:checked").value;
        //let updateClass= {classId,className,classTeacher,description,classOfStudent,status,"arrStudent":[]};
        studentManagementStore.map(course =>{
            course.arrClass?.find(classRoom=>{
                if (classRoom.classId==classId) {
                    classRoom.className=className;
                    classRoom.classTeacher= classTeacher;
                    classRoom.description= description;
                    classRoom.classOfStudent= classOfStudent;
                    classRoom.status= status;
                }
            })
        });
        localStorage.setItem("studentManagementStore",JSON.stringify(studentManagementStore));
        window.location.reload();
        renderData(1,studentManagementStore);
    
}
var deleteClassModal = new bootstrap.Modal(document.getElementById('deleteModal'), {
    keyboard: false
});
function deleteClass(classId){
    deleteClassModal.show();
    let btnDeleteClass = document.getElementById("btnDeleteClass");
    btnDeleteClass.onclick=()=>{
     studentManagementStore.map(course=>{
        course.arrClass?.find(classRoom=>{
            if (classRoom.classId==classId) {
                course.arrClass.splice(classRoom);
            }
        })
     })
     localStorage.setItem("studentManagementStore",JSON.stringify(studentManagementStore));
        window.location.reload();
    }
}

let btnSearchClass = document.getElementById("btnSearchClass");
btnSearchClass.onclick= (e)=>{
    e.preventDefault();
 // let studentManagementStore= localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
    //1. Lay du lieu tim kiem   
    let searchClassName= document.getElementById("searchClass").value;
    console.log("Gia tri search--->",searchClassName);
    //2. Lay du lieu tim kiem tu local storage
    let arrClassManagement = [];
    studentManagementStore.forEach(course=>{
             course.arrClass.forEach(classOfStudent=>{
                arrClassManagement.push(classOfStudent);
             })
        });
    //3. Tim kiem du lieu theo ten lop va luu vao arrSearch
    let arrSearch = [];
    if (searchClassName.length>0) {
        arrSearch = arrClassManagement.filter(classRoom=>classRoom.className.includes(searchClassName));
    }else{
        arrSearch = [...arrClassManagement];
    }
    
    console.log("Mang tim kiem-->",arrSearch);
    //4. day du lieu tim kiem ra du lieu render la 1 bien toan cuc arrClasses
    arrClasses = [...arrSearch];
    // Da lay ra duoc du lieu can tim
    console.log("Mang render-->",arrClasses);
    //5. render lai du lieu
     renderData(1);
     
}

function handSortClass(){
    let sortClass = document.getElementById("sortClass").value;
    switch (sortClass) {
        case "classNameASC":
            //Tang dan
            arrClasses.sort((a,b)=>(a.className>b.className)?1:(a.className<b.className)?-1:0);
            break;
    
        case "classNameDESC":
            arrClasses.sort((a,b)=>(a.className>b.className)?-1:(a.className<b.className)?1:0);
            break;
    }
    //localStorage.setItem("studentManagementStore",JSON.stringify(studentManagementStore));
    renderData(1,studentManagementStore);
}
function getIndexCourseByCourseId(studentManagementStore,courseId){
    for (let index = 0; index < studentManagementStore.length; index++) {
       if (studentManagementStore[index].courseId==courseId) {
        return index;
       }
    }
    return -1;
}
function getIndexClassId(arrClasses,classId){
    for (let index = 0; index < arrClasses.length; index++) {
        if (arrClasses[index].classId==classId) {
            return index;
        }
    } 
    return -1;
}
let studentManagementStoreOnLoad = localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
document.onload = renderData(1,studentManagementStoreOnLoad);