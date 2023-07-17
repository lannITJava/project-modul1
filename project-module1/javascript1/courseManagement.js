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


function validateForm(){
    let courseId = document.getElementById("courseId").value;
    let courseName = document.getElementById("courseName").value;
    let courseTime = document.getElementById("courseTime").value;
    let errorId = document.getElementById("errorId");
    if (courseId=="") {
        errorId.innerText="Vui lòng không để trống mã khóa học"
        errorId.style.color="red";
        return false;
    }else{
        errorId.innerText="";
    }
    let errorName = document.getElementById("errorName");
    if (courseName=="") {
        errorName.innerText="Vui lòng không để trống tên khóa học"
        errorName.style.color="red";
        return false;
    }else{
        errorName.innerText="";
    }
    let errorTime = document.getElementById("errorTime");
    if (courseTime=="") {
        errorTime.innerText="Vui lòng không để trống thời gian khóa học"
        errorTime.style.color="red";
        return false;
    }else{
        errorTime.innerText="";
    }
    return true;
   
}
/*function validateUpdateForm(){
    let courseId = document.getElementById("updateCourseId").value;
    let courseName = document.getElementById("updateCourseName").value;
    let courseTime = document.getElementById("updateCourseTime").value;
    let errorName = document.getElementById("errorUpdateCourseName");
    if (courseName=="") {
        errorName.innerText="Vui lòng không để trống tên khóa học"
        errorName.style.color="red";
        return false;
    }else{
        errorName.innerText="";
    }
    let errorTime = document.getElementById("errorUpdateCourseTime");
    if (courseTime=="") {
        errorTime.innerText="Vui lòng không để trống thời gian khóa học"
        errorTime.style.color="red";
        return false;
    }else{
        errorTime.innerText="";
    }
    return true;
   
}*/
var editCourseModal = new bootstrap.Modal(document.getElementById('editCourse'), {
    keyboard: false
});
let btnSubmit = document.getElementById("btnSubmit");
btnSubmit.onclick = (e)=>{
    e.preventDefault();
    if (validateForm()) {
        let newCourse = getDataForm();
    let studentManagementStore= localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
    studentManagementStore.push(newCourse);
    localStorage.setItem("studentManagementStore",JSON.stringify(studentManagementStore));
    resetForm();
   // newCourseModal.hide();
   renderData(1,studentManagementStore);
   window.location.reload();
    }
    
}

function initEdit(courseId){
    editCourseModal.show();
    let studentManagementStore= localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
    let index = getCourseId(studentManagementStore,courseId);
    document.getElementById("updateCourseId").value=studentManagementStore[index].courseId;
    document.getElementById("updateCourseId").readOnly=true;
    document.getElementById("updateCourseName").value= studentManagementStore[index].courseName;
    document.getElementById("updateCourseTime").value= studentManagementStore[index].courseTime;
    if (studentManagementStore[index].status=="Hoạt động") {
        document.getElementById("updateActive").checked=true;
    }else{
        document.getElementById("updateInactive").checked= true;
    }
}
function getCourseId(studentManagementStore,courseId){
    for (let index = 0; index < studentManagementStore.length; index++) {
        if (studentManagementStore[index].courseId==courseId) {
            console.log(index);
            return index;
        }
    } 
    return -1;
}
let btnUpdateCourse = document.getElementById("btnUpdateCourse");
btnUpdateCourse.onclick = (e)=>{
    e.preventDefault();
    
        let studentManagementStore= localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
    let courseId= document.getElementById("updateCourseId").value;
    let courseName = document.getElementById("updateCourseName").value;
    let courseTime = document.getElementById("updateCourseTime").value;
    let status = document.querySelector("input[name='updateStatus']:checked").value;
    let updateCourse={courseId,courseName,courseTime,status,"arrClass":[]};

    let index =getCourseId(studentManagementStore,updateCourse.courseId)
    if (index>-1) {
        studentManagementStore.splice(index,1,updateCourse);
    }
    localStorage.setItem("studentManagementStore",JSON.stringify(studentManagementStore));
    resetForm();
    renderData(1,studentManagementStore);
    window.location.reload();
    
    
}
var deleteCourseModal = new bootstrap.Modal(document.getElementById('deleteCourseModal'), {
    keyboard: false
});
function deleteCourse(courseId){
    deleteCourseModal.show();
    let btnDelete = document.getElementById("btnDelete");
    btnDelete.onclick = ()=>{
    let studentManagementStore= localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
    let index = getCourseId(studentManagementStore,courseId);
    studentManagementStore.splice(index,1);
    localStorage.setItem("studentManagementStore",JSON.stringify(studentManagementStore));
    deleteCourseModal.hide();
    renderData(1,studentManagementStore);
    } 
}
/*let btnDelete = document.getElementById("btnDelete");
btnDelete.onclick = ()=>{
    let studentManagementStore= localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
    let index = getCourseId(studentManagementStore,courseId);
    studentManagementStore.splice(index,1);
    localStorage.setItem("studentManagementStore",JSON.stringify(studentManagementStore));
    renderData(1,studentManagementStore);
} */
let btnSearch = document.getElementById("btnSearch");
btnSearch.onclick = (e)=>{
    e.preventDefault();
    let studentManagementStore= localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
    let searchCourseName= document.getElementById("searchCourse").value;
    let listSearchCourse= studentManagementStore.filter(course=>course.courseName.includes(searchCourseName));
    renderData(1,listSearchCourse);
}
function handSortCourse(){
    let sortCourse = document.getElementById("sortCourse").value;
    let studentManagementStore= localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
    switch (sortCourse) {
        case "courseNameASC":
            //Tang dan
            studentManagementStore.sort((a,b)=>(a.courseName>b.courseName)?1:(a.courseName<b.courseName)?-1:0);
            break;
    
        case "courseNameDESC":
            studentManagementStore.sort((a,b)=>(a.courseName>b.courseName)?-1:(a.courseName<b.courseName)?1:0);
            break;
    }
    localStorage.setItem("studentManagementStore",JSON.stringify(studentManagementStore));
    renderData(1,studentManagementStore);
}
function resetForm(){
    document.getElementById("courseId").value="";
    document.getElementById("courseName").value="";
    document.getElementById("courseTime").value="";
    document.getElementById("active").checked=true;
}
function getDataForm(){
    let courseId = document.getElementById("courseId").value;
    let courseName = document.getElementById("courseName").value;
    let courseTime = document.getElementById("courseTime").value;
    let status = document.querySelector("input[name='status']:checked").value;
    let course = {courseId,courseName,courseTime,status,"arrClass":[]};
    return course;
}
let studentManagementStoreOnLoad= localStorage.getItem("studentManagementStore")?JSON.parse(localStorage.getItem("studentManagementStore")):[];
document.onload= renderData(1,studentManagementStoreOnLoad);