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
let studentManagementStore = localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
 let arrStudents= [];
 studentManagementStore.map(course=>{
    course.arrClass?.map(classRoom=>{
        classRoom.arrStudent?.map(student=>{
            arrStudents.push(student);
        })
    })
})
console.log("-->",arrStudents);
let img = document.getElementById("img");
if (arrStudents.length==0) {
    img.innerHTML+=`<img
    src="./img/quanlysinhvien.png"
    alt="Hinh anh"
    srcset="./img/quanlysinhvien.png 2x"
  />`
}else{
    img.innerHTML+=`<table>
    <thead>
      <tr>
        <th>STT</th>
        <th>Mã SV</th>
        <th>Tên SV</th>
        <th>Năm sinh</th>
        <th>Địa chỉ</th>
        <th>Trạng thái</th>
        <th>Hành động</th>
      </tr>
    </thead>
    <tbody id= "content"></tbody>
  </table>
  <div id="page">
              <a id="preview" href="javascript:previewPage()">Preview</a>
              <ul id="listPage"></ul>
              <a id="next" href="javascript:nextPage()">Next</a>
            </div>`
}
let arrClasses = [];
let btnNewStudent= document.getElementById("btnNewStudent");
var studentCreateModal = new bootstrap.Modal(document.getElementById('newStudent'), {
    keyboard: false
});
let currentPage=1;
let recordsPerPage=3;
function renderDataStudent(page,studentManagementStore){
    let pageMax= getTotalPage(arrStudents);
    if (page<1) {
        page=1;
    }
    if (page>pageMax) {
        page= pageMax;
    }
    let tbody =document.getElementById("content");
    tbody.innerHTML="";
    let indexMinOnPage= (page-1)*recordsPerPage;
    let indexMaxOnPage;
    if (page*recordsPerPage>arrStudents.length) {
        indexMaxOnPage= arrStudents.length;
    }else{
        indexMaxOnPage= page*recordsPerPage;
    }
    for (let index = indexMinOnPage; index < indexMaxOnPage; index++) {
        tbody.innerHTML+=` <tr>
        <td>${index+1}</td>
        <td>${arrStudents[index].studentId}</td>
        <td>${arrStudents[index].studentName}</td>
        <td>${arrStudents[index].studentBorn}</td>
        <td>${arrStudents[index].address}</td>
        <td>${arrStudents[index].status}</td>
        <td>
        <button id="edit" onclick=initEdit('${arrStudents[index].studentId}')><i class="fa-solid fa-pen-to-square"></i></button>
          <button id="delete" onclick=deleteStudent('${arrStudents[index].studentId}')><i class="fa-solid fa-trash-can"></i></button>
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
    renderDataStudent(currentPage,studentManagementStore);
}
// Hàm nextPage
function nextPage() {
    currentPage++;
    renderDataStudent(currentPage,studentManagementStore);
}
function clickPage(page){
    currentPage= page;
    renderDataStudent(page,studentManagementStore);
}
function getTotalPage(arrStudents){
    return Math.ceil(arrStudents.length/recordsPerPage);
}
btnNewStudent.onclick=()=>{
    studentCreateModal.show();
   
   studentManagementStore.map(course=>{
        course.arrClass?.map(classOfStudent=>{
            arrClasses.push(classOfStudent);
        })
    })
    let classComboBox = document.getElementById("class");
    classComboBox.innerHTML="";
    arrClasses.forEach(classOfStudent=>{
        classComboBox.innerHTML+=`<option value="${classOfStudent.classId}">${classOfStudent.className}</option>`
    })
}
function validateStudent(){
    let studentId = document.getElementById("studentId").value;
    let studentName = document.getElementById("studentName").value;
    let studentBorn = document.getElementById("studentBorn").value;
    let address = document.getElementById("address").value;
    let errorId = document.getElementById("errorId");
    if (studentId=="") {
        errorId.innerHTML="Vui lòng không để trống mã sinh viên"
        errorId.style.color="red";
        return false;
    }else{
        errorId.innerHTML="";
    }
    let errorName = document.getElementById("errorName");
    if (studentName=="") {
        errorName.innerHTML="Vui lòng không để trống tên sinh viên";
        errorName.style.color="red";
        return false;
    } else {
       errorName.innerHTML=""; 
    }
    let errorBorn = document.getElementById("errorBorn");
    if (studentBorn=="") {
        errorBorn.innerHTML="Vui lòng không để trống năm sinh";
        errorBorn.style.color="red";
        return false;
    } else {
        errorBorn.innerHTML="";
    }
    let errorAddress = document.getElementById("errorAddress");
    if (address=="") {
        errorAddress.innerHTML="Vui lòng không để trống địa chỉ";
        errorAddress.style.color="red";
        return false;
    } else {
        errorAddress.innerHTML="";
    }
    return true;
}
let btnCreateStudent = document.getElementById("btnCreateStudent");
btnCreateStudent.onclick=(e)=>{
    e.preventDefault();
    if (validateStudent()) {
        let studentId = document.getElementById("studentId").value;
        let studentName = document.getElementById("studentName").value;
        let studentBorn = document.getElementById("studentBorn").value;
        let address = document.getElementById("address").value;
        let status = document.querySelector("input[type='radio']:checked").value;
        let classId = document.getElementById("class").value;
       
        studentManagementStore.map(course=>{
            course.arrClass?.find(classRoom=>{
                if (classRoom.classId==classId) {
                    let newStudent = {studentId,studentName,studentBorn,address,status};
                    classRoom.arrStudent.push(newStudent);
                }
            })
        })
        localStorage.setItem("studentManagementStore",JSON.stringify(studentManagementStore));
        window.location.reload();
    }
}
var editStudentModal = new bootstrap.Modal(document.getElementById('editStudentModal'), {
    keyboard: false
  });
function initEdit(studentId){
    editStudentModal.show();
    let index= getIndexStudentId(arrStudents,studentId);
    document.getElementById("updateStudentId").value= arrStudents[index].studentId;
    document.getElementById("updateStudentId").readOnly= true;
    document.getElementById("updateStudentName").value= arrStudents[index].studentName;
    document.getElementById("updateStudentBorn").value= arrStudents[index].studentBorn;
    document.getElementById("updateAddress").value= arrStudents[index].address;
    switch (arrStudents[index].status) {
        case "Đang học":
            document.getElementById("updateStudding").checked= true;
            break;
        case "Chờ lớp":
            document.getElementById("updatePending").checked= true;
            break;
        case "Bảo lưu":
            document.getElementById("updateReserve").checked= true;
            break;
        case "Đình chỉ":
            document.getElementById("updateSuspended").checked= true;
            break;
        case "Tốt nghiệp":
            document.getElementById("updateEnding").checked= true;
            break;
    }
}
let btnUpdateStudent = document.getElementById("btnUpdateStudent");
btnUpdateStudent.onclick=(e)=>{
    e.preventDefault();
    let studentId = document.getElementById("updateStudentId").value;
    let studentName= document.getElementById("updateStudentName").value;
    let studentBorn = document.getElementById("updateStudentBorn").value;
    let address = document.getElementById("updateAddress").value;
    let status = document.querySelector("input[name='updateStatus']:checked").value;
    studentManagementStore.map(course=>{
        course.arrClass?.map(classRoom=>{
            classRoom.arrStudent?.find(student=>{
                if (student.studentId==studentId) {
                    student.studentName=studentName;
                    student.studentBorn=studentBorn;
                    student.address=address;
                    student.status=status;
                }
            })
        })
        localStorage.setItem("studentManagementStore",JSON.stringify(studentManagementStore));
        window.location.reload();
    })
}
var deleteStudentModal = new bootstrap.Modal(document.getElementById('deleteStudentModal'), {
    keyboard: false
});
function deleteStudent(studentId){
    deleteStudentModal.show();
    let btnDeleteStudent = document.getElementById("btnDeleteStudent");
    btnDeleteStudent.onclick=()=>{
        studentManagementStore.map(course=>{
            course.arrClass.map(classRoom=>{
                classRoom.arrStudent?.find(student=>{
                    if (student.studentId==studentId) {
                        classRoom.arrStudent.splice(student);
                    }
                })
            })
        })
        localStorage.setItem("studentManagementStore",JSON.stringify(studentManagementStore));
        window.location.reload();
    }
}
let btnSearchStudent = document.getElementById("btnSearchStudent");
btnSearchStudent.onclick=(e)=>{
    e.preventDefault;
    let searchStudentName = document.getElementById("searchStudent").value;
    console.log("Gia tri search--->",searchStudentName);
    let arrStudentManagement = [];
    studentManagementStore.forEach(course=>{
        course.arrClass?.forEach(classRoom=>{
            classRoom.arrStudent?.forEach(student=>{
                arrStudentManagement.push(student);
            })
        })
    })
    let arrSearch = [];
    if (searchStudentName.length>0) {
        arrSearch= arrStudentManagement.filter(student=>student.studentName.includes(searchStudentName));
    }else{
        arrSearch= [...arrStudentManagement];
    }
    console.log("Mang tim kiem-->",arrSearch);
    arrStudents= [...arrSearch];
    console.log("Mang render-->",arrStudents);
    renderDataStudent(1);
}
function handSortStudent(){
    let sortStudent = document.getElementById("sortStudent").value;
    switch (sortStudent) {
        case "studentNameASC":
            arrStudents.sort((a,b)=>(a.studentName>b.studentName)?1:(a.studentName<b.studentName)?-1:0);
            break;
        case "studentNameDESC":
            arrStudents.sort((a,b)=>(a.studentName>b.studentName)?-1:(a.studentName<b.studentName)?1:0);
            break;
    }
    renderDataStudent(1,studentManagementStore)
}
function getIndexStudentId(arrStudents,studentId){
    for (let index = 0; index < arrStudents.length; index++) {
        if (arrStudents[index].studentId==studentId) {
            return index;
        }
    } 
    return -1;
}
let studentManagementStoreOnLoad = localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
document.onload= renderDataStudent(1,studentManagementStoreOnLoad);