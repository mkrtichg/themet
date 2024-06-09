
const contentPreview = document.getElementById("contentPreview")
const ul = document.getElementById("content");
const picture = document.getElementById("picture");
const description = document.getElementById("description");

const imgL = document.createElement('img');
const imgR = document.createElement('img');

// URLs
const urlByDepartments = "https://collectionapi.metmuseum.org/public/collection/v1/departments";
const objectsUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects";
const urlByDepartmentId = (depId) => `https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${depId}`;
const urlByObjectId = (id) => `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
// 
let i = 0;
let objectIDs;





async function getObjectById(imgUrlById) {
    // debugger;

    try {
        const response = await fetch(imgUrlById);
        const data = await response.json();

        const imgUrl = data.primaryImage;
        const img = document.createElement('img');

        img.src = imgUrl;
        img.alt = data.title;
        img.id = "mainViewImage";
        imgL.src = "./images/slide-left.png";
        imgL.alt = "LeftArrow";
        imgL.id = "imgLeftArrow";
        imgR.src = "./images/slide-right.png";
        imgR.alt = "RightdArrow";
        imgR.id = "imgRightArrow";
        const sourceLink = data.objectURL;
        const source = document.createElement('a');
        source.href = sourceLink;
        source.target = "_blank"
        picture.innerHTML = "";
        description.innerHTML = "";
        source.append(img)
        picture.append(imgL);
        picture.append(source);
        picture.append(imgR);
        const titleP = document.createElement('p');
        const titleS = document.createElement('strong');
        titleP.className = 'descCont';
        const artistP = document.createElement('p');
        const artistS = document.createElement('strong');
        artistP.id = 'descCont';
        const departmentP = document.createElement('p');
        const departmentS = document.createElement('strong');
        departmentP.id = 'descCont';
        const dateP = document.createElement('p');
        const dateS = document.createElement('strong');
        dateP.id = 'descCont';
        const cultureP = document.createElement('p');
        const cultureS = document.createElement('strong');
        cultureP.id = 'descCont';
        const mediumP = document.createElement('p');
        const mediumS = document.createElement('strong');
        mediumP.id = 'descCont';
        const dimensionsP = document.createElement('p');
        const dimensionsS = document.createElement('strong');
        dimensionsP.id = 'descCont';
        const classificationP = document.createElement('p');
        const classificationS = document.createElement('strong');
        classificationP.id = 'descCont';
        const repositoryP = document.createElement('p');
        const repositoryS = document.createElement('strong');
        repositoryP.id = 'descCont';

        const span = document.createElement('span');
        
        const strong = document.createElement('strong');
        span.id = 'desctiptionText';
        titleP.innerHTML = "";
        artistP.innerHTML = "";
        departmentP.innerHTML = "";
        dateP.innerHTML = "";
        cultureP.innerHTML = "";
        mediumP.innerHTML = "";
        dimensionsP.innerHTML = "";
        classificationP.innerHTML = "";
        repositoryP.innerHTML = "";
        titleS.innerText = "Title:";
        artistS.innerText = "Artist:";
        departmentS.innerText = "Department:";
        dateS.innerText = "Date:";
        cultureS.innerText = "Culture:";
        mediumS.innerText = "Medium:";
        dimensionsS.innerText = "Dimensions:";
        classificationS.innerText = "Classification:";
        repositoryS.innerText = "Repository:";
        titleP.append(titleS, ` ${data.title}`)
        artistP.append(artistS, ` ${data.artistDisplayName} (${data.artistDisplayBio})`)
        departmentP.append(departmentS, ` ${data.department}`);
        dateP.append(dateS, ` ${data.objectDate}`);
        cultureP.append(cultureS, ` ${data.culture}`);
        mediumP.append(mediumS, ` ${data.medium}`);
        dimensionsP.append(dimensionsS, ` ${data.dimensions}`);
        classificationP.append(classificationS, ` ${data.classification}`);
        repositoryP.append(repositoryS, ` ${data.repository}`);

        span.innerText = "";
        // paragraph.append(

        // )
            span.innerText = `        
       











         
         
         
         To view the next or previous picture please press the RIGHT or Left arrow on the keyboard.
         `;

        description.append(titleP,artistP, departmentP, dateP, cultureP, mediumP, dimensionsP, classificationP, repositoryP, span);

    } catch (error) {
        console.log(error.message);
    }
}


async function previewImage(url) {
    // debugger;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const imgUrl = data.primaryImageSmall;
        const img = document.createElement('img');
        img.src = imgUrl;
        img.alt = data.title;
        img.className = "currViewimg";
        // contentPreview.innerHTML = "";
        contentPreview.append(img);


    } catch (error) {
        console.log(error.message);
    }
}


async function createPreviewImages(params = []) {
    // debugger;    
    contentPreview.innerHTML = "";

    for (let i = 0; i < params.length; i++) {
        await previewImage(params[i])
    }
}



async function getArrayOfObjectIds(urlByDep) {
    // debugger;

    try {
        const response = await fetch(urlByDep);
        const data = await response.json();
        // data.objectIDs.forEach(objectID => objectIDs.push(objectID));
        objectIDs = [...data.objectIDs];

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
        img.id = "mainViewImage";
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
                // objectIDs.splice(0);


                getArrayOfObjectIds(urlByDepartmentId(id));

                getObjectById(urlByObjectId(objectIDs[i]));
                createPreviewImages([urlByObjectId(objectIDs[i + 1]), urlByObjectId(objectIDs[i + 2]), urlByObjectId(objectIDs[i + 3])]);





            })
        })



    } catch (error) {
        console.log(error.message);
    }


    document.addEventListener('keydown', (event) => {
        // debugger;


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

    imgL.addEventListener('click', () => {
        // debugger;

        if (i === 0) {
            return
        } else {
            i--;

        }
        getObjectById(urlByObjectId(objectIDs[i]));
        createPreviewImages([urlByObjectId(objectIDs[i + 1]), urlByObjectId(objectIDs[i + 2]), urlByObjectId(objectIDs[i + 3])]);

    });


    imgR.addEventListener('click', () => {
        // debugger;

        if (i === objectIDs.length - 1) {
            return
        } else {
            i++;
        }
        getObjectById(urlByObjectId(objectIDs[i]));
        createPreviewImages([urlByObjectId(objectIDs[i + 1]), urlByObjectId(objectIDs[i + 2]), urlByObjectId(objectIDs[i + 3])]);

    })

}



getAndCreateListByDepartments(urlByDepartments);




