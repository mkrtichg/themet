
const contentPreview = document.getElementById("contentPreview")
const ul = document.getElementById("content");
const picture = document.getElementById("picture");
const description = document.getElementById("description");
// URLs
const urlByDepartments = "https://collectionapi.metmuseum.org/public/collection/v1/departments";
const objectsUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects";
const urlByDepartmentId = (depId) => `https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${depId}`;
const urlByObjectId = (id) => `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
let i = 0;
const objectIDs = [];





async function getObjectById(imgUrlById) {
    // debugger;

    try {
        const response = await fetch(imgUrlById);
        const data = await response.json();

        const imgUrl = data.primaryImage;
        const img = document.createElement('img');
        img.src = imgUrl;
        img.alt = data.title;
        img.id = "img"
        picture.innerHTML = "";
        description.innerHTML = "";
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

    } catch (error) {
        console.log(error.message);
    }
}


async function previewImage(url) {

    try {
        const response = await fetch(url);
        const data = await response.json();
        const imgUrl = data.primaryImageSmall;
        const img = document.createElement('img');
        img.src = imgUrl;
        img.alt = data.title;
        img.className = "currViewimg";
        contentPreview.innerHTML = "";
        contentPreview.append(img);


    } catch (error) {
        console.log(error.message);
    }
}


async function createPreviewImages(params = []) {
    // debugger;
    // picture.innerHTML = "";
    // contentPreview.innerHTML = "";
    // description.innerHTML = "";

    for (let i = 0; i < params.length; i++) {
        await previewImage(params[i])
    }
}

async function getArrayOfObjectIds(urlByDep) {
    // debugger;



    try {

        const response = await fetch(urlByDep);
        const data = await response.json();
        data.objectIDs.forEach(objectID => objectIDs.push(objectID));

    } catch (error) {
        console.log(error.message);
    }
}




async function getAndCreateListByDepartments(url) {
    // debugger;

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
        description.innerText = "To start viewing the departments' materials please click to choose the department.";



        departments.forEach(department => {


            const li = document.createElement('li');
            li.className = "department";
            li.innerText = department.displayName;
            const id = department.departmentId;
            ul.append(li);

            //adding event listener to choose the department


            li.addEventListener("click", function () {
                // debugger;
                i = 0;
                objectIDs.splice(0);
                picture.innerHTML = "";
                contentPreview.innerHTML = "";
                description.innerHTML = "";

                getArrayOfObjectIds(urlByDepartmentId(id));

                getObjectById(urlByObjectId(objectIDs[i]));
                createPreviewImages([urlByObjectId(objectIDs[i + 1]), urlByObjectId(objectIDs[i + 2]), urlByObjectId(objectIDs[i + 3])]);

             



            })
        })



    } catch (error) {
        console.log(error.message);
    }
}

document.addEventListener('keydown', (event) => {
    debugger;
    picture.innerHTML = "";
    contentPreview.innerHTML = "";
    description.innerHTML = "";

    switch (event.code) {
        case 'ArrowLeft': {
            if (i === 0) { break };
            i--;
            break;
        }
        case 'ArrowRight': {
            if (i === objectIDs.length - 1) { break };
            i++;
            break;
        }
    }
    getObjectById(urlByObjectId(objectIDs[i]));
    createPreviewImages([urlByObjectId(objectIDs[i + 1]), urlByObjectId(objectIDs[i + 2]), urlByObjectId(objectIDs[i + 3])]);

});

getAndCreateListByDepartments(urlByDepartments);




