const addSection = document.querySelector('#addSection');
const resultsSection = document.querySelector('#resultsSection');

let api : {courses : string, works : string, websites : string};
let imgPath : string;

//localhost for private, devnoe.com for public
if(window.location.hostname == "localhost") {
    api = {
        courses: "http://localhost/portfolio_api/api/courses",
        works: "http://localhost/portfolio_api/api/works",
        websites: "http://localhost/portfolio_api/api/website"
    };
    imgPath = "http://localhost/portfolio_admin/pub/img/";
} else {
    api = {
        courses: "https://devnoe.com/MIUN/WEBB3PROJ/portfolio_api/API/courses.php",
        works: "https://devnoe.com/MIUN/WEBB3PROJ/portfolio_api/API/works.php",
        websites: "https://devnoe.com/MIUN/WEBB3PROJ/portfolio_api/API/website.php"
    };
    imgPath = "https://devnoe.com/MIUN/WEBB3PROJ/portfolio_admin/img/";
}

function removeGeneratedHTML() {
    addSection.innerHTML = "";
    resultsSection.innerHTML = "";
}


//COURSES START HERE


//FUNCTION FOR GETTING ALL OPTIONS FOR CHOOSEN SUBJECT
function coursesOptions() {

    removeGeneratedHTML();

    //form for POST to the database
    addSection.insertAdjacentHTML("beforeend", `
        <h2>Add New Course</h2>
        <form id="add_form" method="POST">

            <div class="form_div">
                <label for="code">Code</label>
                <input id="code" name="code" type="text">
            </div>

            <div class="form_div">
                <label for="courseName">Course</label>
                <input id="courseName" name="courseName" type="text">
            </div>

            <div class="form_div">
                <label for="university">University</label>
                <input id="university" name="university" type="text">
            </div>

            <div class="form_div">
                <label for="start">Start Date</label>
                <input id="startDate" name="start" type="date">
            </div>

            <div class="form_div">
                <label for="end">End Date</label>
                <input id="endDate" name="end" type="date">
            </div>

            <div class="form_div">
            <input id="submitCourse" type="submit" value="Submit Course">
            </div>

        </form>
    `)

    const addForm = document.getElementById("add_form");
    const submitCourse = document.getElementById("submitCourse");

    //Prevent default on form
    addForm.addEventListener("submit", (e) => {
            e.preventDefault();
    })
    //Submits to database on click
    submitCourse.addEventListener("click", addCourse);

    getCourses();
}



//UPDATE FORM
const updateFormCourses = async (id: number) => {

    removeGeneratedHTML();

    //awaits fetch response
    let response = await getCourseById(id);
    let data = response[0];
    
    //Update-Form, similar to the "POST-form", values and different submit function
    addSection.insertAdjacentHTML("beforeend", `
        <h2>Update Course</h2>
        <form id="add_form" method="POST">

            <div class="form_div">
                <label for="code">Code</label>
                <input id="code" name="code" type="text" value="${data.code}">
            </div>

            <div class="form_div">
                <label for="courseName">Course</label>
                <input id="courseName" name="courseName" type="text" value="${data.courseName}">
            </div>

            <div class="form_div">
                <label for="university">University</label>
                <input id="university" name="university" type="text" value="${data.university}">
            </div>

            <div class="form_div">
                <label for="start">Start Date</label>
                <input id="startDate" name="start" type="date" value="${data.startDate}">
            </div>

            <div class="form_div">
                <label for="end">End Date</label>
                <input id="endDate" name="end" type="date" value="${data.endDate}">
            </div>

            <div class="form_div">
            <input id="updateCourseSubmit" type="submit" value="Update Course" onClick="updateCourse(${data.course_id})">
            </div>

        </form>
    `)

    const addForm = document.getElementById("add_form");

    //Prevent default on form
    addForm.addEventListener("submit", (e) => {
            e.preventDefault();
    })
}

//FUNCTION FOR UPDATING
function updateCourse(course_id:number) {

    //vars for update course
    const code = (<HTMLInputElement>document.getElementById("code")).value;
    const courseName = (<HTMLInputElement>document.getElementById("courseName")).value;
    const startDate = (<HTMLInputElement>document.getElementById("startDate")).value;
    const endDate = (<HTMLInputElement>document.getElementById("endDate")).value;
    const university = (<HTMLInputElement>document.getElementById("university")).value;

    let course = {'code': code, 'courseName': courseName, 'startDate': startDate, 'endDate': endDate, 'university': university};
    
    //fetches with ID
    fetch(`${api.courses}?id=${course_id}`, {
        method: 'PUT',
        body: JSON.stringify(course),
    })
    .then(response => response.json())
    .then(coursesOptions);
}



//GET ALL FUNCTION
function getCourses() {
    fetch(api.courses)
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error("Failed to fetch");
        }
    })
    .then(data => {
        if(!data.message) {

            resultsSection.insertAdjacentHTML("beforeend", `<h2>Courses</h2>`);
            //for each course, print html
            data.forEach((course : {course_id: number, code: string, courseName: string, startDate: string, endDate: string, university: string}) => {
                resultsSection.insertAdjacentHTML("beforeend", 
                            `
                            <div class="courses">
                                <ul>
                                    <li><span class="bold">Code: </span><span class="liData">${course.code}</span></li>
                                    <li><span class="bold">Name: </span><span class="liData">${course.courseName}</span></li>
                                    <li><span class="bold">University: </span><span class="liData">${course.university}</span></li>
                                    <li><span class="bold">Start: </span><span class="liData">${course.startDate}</span></li>
                                    <li><span class="bold">End: </span><span class="liData">${course.endDate}</span></li>
                                </ul>
                                <button id="${course.course_id}" onClick="updateFormCourses(${course.course_id})" class="editButton">Edit</button>
                                <button id="${course.course_id}" onClick="deleteCourse(${course.course_id})" class="deleteButton">Delete</button>
                            </div>`)
            })
        } else {
            console.log("API: " + data.message);
        }
    })
    .catch(err => console.log(err));
}


//ADD FUNCTION
function addCourse() {

    //vars for add course
    const code = (<HTMLInputElement>document.getElementById("code")).value;
    const courseName = (<HTMLInputElement>document.getElementById("courseName")).value;
    const startDate = (<HTMLInputElement>document.getElementById("startDate")).value;
    const endDate = (<HTMLInputElement>document.getElementById("endDate")).value;
    const university = (<HTMLInputElement>document.getElementById("university")).value;

    let course = {'code': code, 'courseName': courseName, 'startDate': startDate, 'endDate': endDate, 'university': university};
    
    fetch(api.courses, {
        method: 'POST',
        body: JSON.stringify(course),
    })
    .then(response => response.json())
    .then(data => {
        coursesOptions();
    })
    .catch(error => {
        console.log("ERROR: ", error);
    })
}

//DELETE FUNCTION
function deleteCourse(course_id:number) {
    fetch(`${api.courses}?id=${course_id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        coursesOptions();
    })
    .catch(error => {
        console.log("ERROR: ", error);
    })
}

//FUNCTION GET BY ID
const getCourseById = async (course_id:number) => {

    return await fetch(`${api.courses}?id=${course_id}`)
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error("Failed to fetch");
        }
    })
}






//COURSES END HERE


//WORKS START HERE




//FUNCTION FOR GETTING ALL OPTIONS FOR CHOOSEN SUBJECT
function worksOptions() {

    removeGeneratedHTML();

    //form for POST to the database
    addSection.insertAdjacentHTML("beforeend", `
        <h2>Add New Work</h2>
        <form id="add_form" method="POST">

            <div class="form_div">
                <label for="company">Company</label>
                <input id="company" name="company" type="text">
            </div>

            <div class="form_div">
                <label for="title">Title</label>
                <input id="title" name="title" type="text">
            </div>

            <div class="form_div">
                <label for="start">Start Date</label>
                <input id="startDate" name="start" type="date">
            </div>

            <div class="form_div">
                <label for="end">End Date</label>
                <input id="endDate" name="end" type="date">
            </div>

            <div class="form_div">
            <input id="submitWork" type="submit" value="Submit Work">
            </div>

        </form>
    `)

    const addForm = document.getElementById("add_form");
    const submitWork = document.getElementById("submitWork");

    //Prevent default on form
    addForm.addEventListener("submit", (e) => {
            e.preventDefault();
    })
    //Submits to database on click
    submitWork.addEventListener("click", addWork);

    getWorks();
}

//UPDATE FORM
async function updateFormWorks(id: number){

    removeGeneratedHTML();

    //awaits fetch response
    let response = await getWorkById(id);
    let data = response[0];
    
    //Update-Form, similar to the "POST-form", values and different submit function
    addSection.insertAdjacentHTML("beforeend", `
        <h2>Update Work</h2>
        <form id="add_form" method="POST">

            <div class="form_div">
                <label for="company">Company</label>
                <input id="company" name="company" type="text" value="${data.company}">
            </div>

            <div class="form_div">
                <label for="title">Title</label>
                <input id="title" name="title" type="text" value="${data.title}">
            </div>

            <div class="form_div">
                <label for="start">Start Date</label>
                <input id="startDate" name="start" type="date" value="${data.startDate}">
            </div>

            <div class="form_div">
                <label for="end">End Date</label>
                <input id="endDate" name="end" type="date" value="${data.endDate}">
            </div>

            <div class="form_div">
            <input id="updateWorkSubmit" type="submit" value="Update Work" onClick="updateWork(${data.work_id})">
            </div>

        </form>
    `)

    const addForm = document.getElementById("add_form");

    //Prevent default on form
    addForm.addEventListener("submit", (e) => {
            e.preventDefault();
    })
}

//FUNCTION FOR UPDATING
function updateWork(work_id:number) {

    //vars for update work
    const company = (<HTMLInputElement>document.getElementById("company")).value;
    const title = (<HTMLInputElement>document.getElementById("title")).value;
    const startDate = (<HTMLInputElement>document.getElementById("startDate")).value;
    const endDate = (<HTMLInputElement>document.getElementById("endDate")).value;

    let work = {'company': company, 'startDate': startDate, 'endDate': endDate, 'title': title};
    //fetches with ID
    fetch(`${api.works}?id=${work_id}`, {
        method: 'PUT',
        body: JSON.stringify(work),
    })
    .then(response => response.json())
    .then(worksOptions);
}




//GET ALL FUNCTION
function getWorks() {
    fetch(api.works)
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error("Failed to fetch");
        }
    })
    .then(data => {
        if(!data.message) {

            resultsSection.insertAdjacentHTML("beforeend", `<h2>Work Experience</h2>`);
            //for each work, print html
            data.forEach((work : {work_id: number, company: string, title: string, startDate: string, endDate: string}) => {
                resultsSection.insertAdjacentHTML("beforeend", 
                            `
                            <div class="courses">
                                <ul>
                                    <li><span class="bold">Company: </span><span class="liData">${work.company}</span></li>
                                    <li><span class="bold">Title: </span><span class="liData">${work.title}</span></li>
                                    <li><span class="bold">Start: </span><span class="liData">${work.startDate}</span></li>
                                    <li><span class="bold">End: </span><span class="liData">${work.endDate}</span></li>
                                </ul>
                                <button id="${work.work_id}" onClick="updateFormWorks(${work.work_id})" class="editButton">Edit</button>
                                <button id="${work.work_id}" onClick="deleteWork(${work.work_id})" class="deleteButton">Delete</button>
                            </div>`)
            })
        } else {
            console.log("API: " + data.message);
        }
    })
    .catch(err => console.log(err));
}



//ADD FUNCTION
function addWork() {

    //vars for add work
    const company = (<HTMLInputElement>document.getElementById("company")).value;
    const title = (<HTMLInputElement>document.getElementById("title")).value;
    const startDate = (<HTMLInputElement>document.getElementById("startDate")).value;
    const endDate = (<HTMLInputElement>document.getElementById("endDate")).value;

    let work = {'company': company, 'title': title, 'startDate': startDate, 'endDate': endDate};
    
    fetch(api.works, {
        method: 'POST',
        body: JSON.stringify(work),
    })
    .then(response => response.json())
    .then(data => {
        worksOptions();
    })
    .catch(error => {
        console.log("ERROR: ", error);
    })
}

//DELETE FUNCTION
function deleteWork(work_id:number) {
    fetch(`${api.works}?id=${work_id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        worksOptions();
    })
    .catch(error => {
        console.log("ERROR: ", error);
    })
}

//FUNCTION GET BY ID
const getWorkById = async (work_id:number) => {

    return await fetch(`${api.works}?id=${work_id}`)
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error("Failed to fetch");
        }
    })
}




//WORK ENDS HERE


//WEBSITES STARTS HERE




//FUNCTION FOR GETTING ALL OPTIONS FOR CHOOSEN SUBJECT
function websitesOptions() {

    removeGeneratedHTML();

    //form for POST to the database
    addSection.insertAdjacentHTML("beforeend", `
        <h2>Add New Website</h2>
        <form action="upload.php" id="add_form" method="POST" enctype="multipart/form-data">

            <div class="form_div">
                <label for="title">Title</label>
                <input id="title" name="title" type="text">
            </div>

            <div class="form_div">
                <label for="website_url">Website URL</label>
                <input id="website_url" name="website_url" type="text">
            </div>

            <div class="form_div">
                <label for="about">Description</label>
                <input id="about" name="about" type="text">
            </div>

            <div class="form_div">
                <label for="created">Created</label>
                <input id="created" name="created" type="date">
            </div>

            <div class="form_div">
                <label id="imgLabel" for="img">Image : Choose Image</label>
                <input id="img" name="img" type="file" accept="image/*">
            </div>

            <div class="form_div">
                <input name="submitWebsite" id="submitWebsite" type="submit" value="Submit Website">
            </div>

        </form>
    `)

    const addForm = document.getElementById("add_form");
    const submitWebsite = document.getElementById("submitWebsite");

  //Prevent default on form
    addForm.addEventListener("submit", (e) => {
            e.preventDefault();
    }) 

    //Submits to database on click
    submitWebsite.addEventListener("click", addWebsite);


    //Displays name of image that is choosen
    let imgLabel = document.getElementById("imgLabel");
    let img = (<HTMLInputElement>document.getElementById("img"));
    img.addEventListener("change", () => {
        if(img.files[0].name) {
            imgLabel.textContent = "Image : " + img.files[0].name;
        }
    })
    //If choose file is clicked, change text content of imgLabel to avoid confusion when accidentally clicking
    img.addEventListener("click", () => {
        imgLabel.textContent = "Image : Choose Image";
    })

    getWebsites();


}

//UPDATE FORM
async function updateFormWebsites(id: number){

    removeGeneratedHTML();

    //awaits fetch response
    let response = await getWebsiteById(id);
    let data = response[0];
    
    //Update-Form, similar to the "POST-form", values and different submit function
    addSection.insertAdjacentHTML("beforeend", `
        <h2>Update Website</h2>
        <form action="upload.php" id="add_form" method="POST" enctype="multipart/form-data">

            <div class="form_div">
                <label for="title">Title</label>
                <input id="title" name="title" type="text" value="${data.title}">
            </div>

            <div class="form_div">
                <label for="website_url">Website URL</label>
                <input id="website_url" name="website_url" type="text" value="${data.website_url}">
            </div>

            <div class="form_div">
                <label for="about">Description</label>
                <input id="about" name="about" type="text" value="${data.about}">
            </div>

            <div class="form_div">
                <label for="created">Created</label>
                <input id="created" name="created" type="date" value="${data.created}">
            </div>

            <div class="form_div">
                <label id="imgLabel" for="img">Image : Choose Image</label>
                <input id="img" name="img" type="file" accept="image/*">
            </div>

            <div class="form_div">
                <input name="updateWebsiteSubmit" id="updateWebsiteSubmit" type="submit" value="Update Website" onClick="updateWebsite(${data.website_id})">
            </div>

        </form>
    `)

    const addForm = document.getElementById("add_form");

    //Prevent default on form
    addForm.addEventListener("submit", (e) => {
            e.preventDefault();
    })

    //Displays name of image that is choosen
    let imgLabel = document.getElementById("imgLabel");
    let img = (<HTMLInputElement>document.getElementById("img"));
    img.addEventListener("change", () => {
        if(img.files[0].name) {
            imgLabel.textContent = "Image : " + img.files[0].name;
        }
    })
    //If choose file is clicked, change text content of imgLabel to avoid confusion when accidentally clicking
    img.addEventListener("click", () => {
        imgLabel.textContent = "Image : Choose Image";
    })
}


//FUNCTION FOR UPDATING
function updateWebsite(website_id:number) {

    const file = (<HTMLInputElement>document.getElementById("img"));
    const dest = "upload.php";
    const formData = new FormData();

    formData.append("img", file.files[0]);

    fetch(dest, {
        method: "post",
        body: formData
    }).catch(console.error);

    //vars for update website
    const img = (<HTMLInputElement>document.getElementById("img")).files[0].name.toLowerCase();
    const title = (<HTMLInputElement>document.getElementById("title")).value;
    const website_url = (<HTMLInputElement>document.getElementById("website_url")).value;
    const about = (<HTMLInputElement>document.getElementById("about")).value;
    const created = (<HTMLInputElement>document.getElementById("created")).value;


    let website = {'title': title, 'img': img, 'website_url': website_url, 'about': about, 'created': created};

    //fetches with ID
    fetch(`${api.websites}?id=${website_id}`, {
        method: 'PUT',
        body: JSON.stringify(website),
    })
    .then(response => response.json())
    .then(websitesOptions);
}


//GET ALL FUNCTION
function getWebsites() {
    fetch(api.websites)
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error("Failed to fetch");
        }
    })
    .then(data => {
        if(!data.message) {

            resultsSection.insertAdjacentHTML("beforeend", `<h2>My Websites</h2>`);
            //for each website, print html
            data.forEach((website : {website_id: number, title: string, img: string, website_url: string, about: string, created: string}) => {
                resultsSection.insertAdjacentHTML("beforeend", 
                            `
                            <div class="websites"><a href="${website.website_url}">
                                <picture>
                                    <img src="${imgPath}${website.img}" alt="${website.title}">
                                </picture>
                                <div>
                                    <h3>${website.title}</h3>
                                    <i>${website.created}</i>
                                    <p>${website.about}</p>
                                </div></a>
                                <button id="${website.website_id}" onClick="updateFormWebsites(${website.website_id})" class="editButton">Edit</button>
                                <button id="${website.website_id}" onClick="deleteWebsite(${website.website_id})" class="deleteButton">Delete</button>
                            </div>`)
            })
        } else {
            console.log("API: " + data.message);
        }
    })
    .catch(err => console.log(err));
}



//ADD FUNCTION
function addWebsite() {

    //vars for formData to send image to PHP for upload
    const file = (<HTMLInputElement>document.getElementById("img"));
    const dest = "upload.php";
    const formData = new FormData();

    //add file to formData
    formData.append("img", file.files[0]);

    //make post to PHP file for control and push to img-folder
    fetch(dest, {
        method: "post",
        body: formData
    }).catch(console.error);

    //vars for update website to database
    const img = (<HTMLInputElement>document.getElementById("img")).files[0].name.toLowerCase();
    const title = (<HTMLInputElement>document.getElementById("title")).value;
    const website_url = (<HTMLInputElement>document.getElementById("website_url")).value;
    const about = (<HTMLInputElement>document.getElementById("about")).value;
    const created = (<HTMLInputElement>document.getElementById("created")).value;

    let website = {'title': title, 'img': img, 'website_url': website_url, 'about': about, 'created': created};
    
    fetch(api.websites, {
        method: 'POST',
        body: JSON.stringify(website),
    })
    .then(response => response.json())
    .then(data => {
        websitesOptions();
    })
    .catch(error => {
        console.log("ERROR: ", error);
    })
}

//DELETE FUNCTION
function deleteWebsite(website_id:number) {
    fetch(`${api.websites}?id=${website_id}`, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
        websitesOptions();
    })
    .catch(error => {
        console.log("ERROR: ", error);
    })
}

//FUNCTION GET BY ID
const getWebsiteById = async (website_id:number) => {

    return await fetch(`${api.websites}?id=${website_id}`)
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            throw new Error("Failed to fetch");
        }
    })
}


