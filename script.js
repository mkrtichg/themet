
const contentPreview = document.getElementById("contentPreview")
const ul = document.getElementById("content");
const picture = document.getElementById("picture");
const description = document.getElementById("description");
// URLs
const urlByDepartments = "https://collectionapi.metmuseum.org/public/collection/v1/departments";
const objectsUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects";
const urlByDepartmentId = (depId) => `https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${depId}`;
const urlByObjectId = (id) => `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`




async function getObjectById(imgUrlById) {
    picture.innerHTML = "";
    contentPreview.innerHTML = "";               
    description.innerHTML = "";
    // debugger;
    try {
        picture.innerHTML = "";
        contentPreview.innerHTML = "";               
        description.innerHTML = "";

        const response = await fetch(imgUrlById);
        const data = await response.json();
        if (data.isPublicDomain) {
            const imgUrl = data.primaryImage;
            const img = document.createElement('img');
            img.src = imgUrl;
            img.alt = data.title;
            img.id = "img"
            picture.append(img);
            const span = document.createElement('span')
            span.id = 'descText';
            span.innerText = "",
                span.innerText = `        
         Title: ${data.title}
         Artist: ${data.artistDisplayName} (${data.artistDisplayBio})
         Department: ${data.department}
         Date: ${data.objectDate}
         Culture: ${data.culture}
         Medium: ${data.medium}
         Dimensions: ${data.dimensions}
         Classification: ${data.classification}
         Repository: ${data.repository}
         
         
         
         To view the next or previous picture please press the RIGHT or Left arrow on the keyboard.
         `;

            description.append(span);
        } else {
            alert('the image is not public');
        }

    } catch (error) {
        console.log(error.message);
    }
}

async function previewImage(url) {
    picture.innerHTML = "";
    contentPreview.innerHTML = "";               
    description.innerHTML = "";

    try {
        const response = await fetch(url);
        const data = await response.json();
        const imgUrl = data.primaryImageSmall;
        const img = document.createElement('img');
        img.src = imgUrl;
        img.alt = data.title;
        img.className = "currViewimg";
        contentPreview.append(img);


    } catch (error) {
        console.log(error.message);
    }
}

async function createPreviewImages(params = []) {
    picture.innerHTML = "";
    contentPreview.innerHTML = "";               
    description.innerHTML = "";

    params.forEach(param => {
        previewImage(param)
    })
}

async function getArrayOfObjectIds(urlByDep, i = 0) {

    try {

        const response = await fetch(urlByDep);
        const data = await response.json();
        const objectIDs = data.objectIDs;

        getObjectById(urlByObjectId(objectIDs[i]));
        createPreviewImages([urlByObjectId(objectIDs[i]), urlByObjectId(objectIDs[i + 1]), urlByObjectId(objectIDs[i + 2])]);
        document.addEventListener('keydown', (event) => {
            picture.innerHTML = "";
            contentPreview.innerHTML = "";               
            description.innerHTML = "";
            // debugger;
            // let i = 0;
            switch (event.code) {
                case 'ArrowLeft':
                    if (i === 0) { break };
                    i--;
                    break;
                case 'ArrowRight':
                    if (i === objectIDs.length - 1) { break };
                    i++;
                    break;
            }

            getObjectById(urlByObjectId(objectIDs[i]));
            createPreviewImages([urlByObjectId(objectIDs[i]), urlByObjectId(objectIDs[i + 1]), urlByObjectId(objectIDs[i + 2])]);


        });

    } catch (error) {
        console.log(error.message);
    }
}




async function getAndCreateListByDepartments(url) {
    debugger;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const departments = data.departments;
        const img = document.createElement('img');
        img.src = 'https://cdn.sanity.io/images/cctd4ker/production/b8a5e07c166342e1c7f6fe30b8c45d64fea69ea5-4096x2326.jpg?w=3840&q=75&fit=clip&auto=format';
        picture.append(img);
        contentPreview.innerHTML = "";
        const h1 = document.createElement('h1')
        h1.innerText = "The Exhibitions of Metropolitan Museum of Art";
        contentPreview.append(h1);
        description.innerText = "To start viewing the departments' materials please click to choose the department."



        departments.forEach(department => {


            const li = document.createElement('li');
            li.className = "department";
            li.innerText = department.displayName;
            const id = department.departmentId;
            ul.append(li);

            //adding event listener to choose the department
            // description.innerText = "To start viewing the departments' materials please click to choose the department."

            li.addEventListener("click", function () {
                picture.innerHTML = "";
                contentPreview.innerHTML = "";               
                description.innerHTML = "";

                getArrayOfObjectIds(urlByDepartmentId(id));

            })
        })

    } catch (error) {
        console.log(error.message);
    }
}




//creating function for getting data by department ID
//and creating sublist for departments
/*
async function getDataObjByObjId(url,list) {
    debugger;
    const subUl = document.createElement("ul");
    list.append(subUl);    
   try{
    const response = await fetch(url);
    const data = await response.json();
    const objectIDs = data.objectIDs;
    objectIDs.forEach(objectID => {
        const subLi = createElement("li");
        subLi.append(objectID);
        subUl.append(subLi);
        subLi.addEventListener('click', () => {
            getObjectById(urlByObjectId(objectID));

        });

    });
   } catch (error) {
    console.log(error.message);
}

}

*/



// function creatingListByDepartments() {
//     debugger;
//     const departments = gettingDepartments(urlByDepartments);
//     departments.forEach(department => {
//         const li = document.createElement('li');
//         li.className = "department";
//         li.innerText = department.displayName;
//         ul.append(li);

// })
//     }
getAndCreateListByDepartments(urlByDepartments);














