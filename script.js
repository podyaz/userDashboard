// Machine objects with all relative key value pairs

let allMachines = [
    {
        id: 1,
        status: "ONLINE",
        part_1: {
            name: 'Toner',
            total_lifetime: 90,
            total_used_lifetime: 15
        },
        part_2: {
            name: 'Roller',
            total_lifetime: 3,
            total_used_lifetime: 12
        }
    },
    {
        id: 2,
        status: "ONLINE",
        part_1: {
            name: 'Toner',
            total_lifetime: 3,
            total_used_lifetime: 30
        },
        part_2: {
            name: 'Roller',
            total_lifetime: 4,
            total_used_lifetime: 90
        }
    },
    {
        id: 3,
        status: "ONLINE",
        part_1: {
            name: 'Toner',
            total_lifetime: 30,
            total_used_lifetime: 29
        },
        part_2: {
            name: 'Roller',
            total_lifetime: 90,
            total_used_lifetime: 5
        }
    },
    {
        id: 4,
        status: "ONLINE",
        part_1: {
            name: 'Toner',
            total_lifetime: 30,
            total_used_lifetime: 15
        },
        part_2: {
            name: 'Roller',
            total_lifetime: 90,
            total_used_lifetime: 15
        }
    },
    {
        id: 5,
        status: "OFFLINE",
        part_1: {
            name: 'Toner',
            total_lifetime: 30,
            total_used_lifetime: 15
        },
        part_2: {
            name: 'Roller',
            total_lifetime: 90,
            total_used_lifetime: 15
        }
    }
]

// First we take value from each input element, then we insert it in coresponding object

handleAddNewPart = function (e) {
    let inputName = document.getElementById('inputName').value
    let inputTotalLifetime = document.getElementById('inputTotalLifetime').value
    let inputUsedLifetime = document.getElementById('inputUsedLifetime').value

    // console.log(inputName, inputTotalLifetime,  inputUsedLifetime)

    let parentId = parseInt(this.parentNode.parentNode.id);
    let latestPart = inputName;

    let newPart = {
        name: inputName,
        total_lifetime: inputTotalLifetime,
        total_used_lifetime: inputUsedLifetime
    }
    

    allMachines.forEach(obj => {
        if (parentId === obj.id){
            obj[latestPart] = newPart
        }
    })
    
    console.log(allMachines[0])

}

// RENDERING OBJECTS IN HTML
// ITERATE OVER OBJECTS AND DISPLAY THEM USING BOOTSTRAP AS RESPONSIVE ELEMENTS
const outputMachines = document.getElementById('machines');
allMachines.forEach(obj => {


    // Create a Bootstrap card element for each object
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('col-lg-6', 'card-container')
    const card = document.createElement('div');
    card.classList.add('card');

    // Create card body
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    cardBody.setAttribute('id', obj.id)


    // Add different class to offline machine to make it more visible
    if (obj.status === "OFFLINE") {
        cardBody.innerHTML = `<div id="${obj.id}">
        <h3 class="card-title"> Machine: ${obj.id}</h3>
        <p class="card-text"> STATUS: <b class="offline"> ${obj.status}</b></p>
        </div>
        `;
    } else {
        cardBody.innerHTML = `
        <h3 class="card-title"> Machine: ${obj.id}</h3>
        <p class="card-text"> STATUS: <b > ${obj.status}</b></p>
        `;
    }

    //if lifetime of spare part is lower than 7 day, inform user
    if (obj.part_1.total_lifetime < 7) {
        cardBody.innerHTML = `
        
        <p class="warning"> PART NEEDS TO BE CHANGED</p>
        `;
    } 

    // Set the content of the card body with object data

    const spareParts = document.createElement('div');
    spareParts.classList.add('parts-area')

    // RENDER TEMPLATE  OF SPARE PARTS
    spareParts.innerHTML = `
    <h6>Spared parts:</h6>
    <ul>
        <li> ${obj.part_1.name}
    <ul>
        <li> Total lifetime: ${obj.part_1.total_lifetime} days. </li>
    </ul>
        <ul>
            <li> Actual used lifetime: ${obj.part_1.total_used_lifetime} days</li>    
        </ul>
    </li>
    
    <li> ${obj.part_2.name}
        <ul>
            <li> Total lifetime: ${obj.part_2.total_lifetime} days.</li>
        </ul>
        <ul>
        <li> Actual used lifetime: ${obj.part_2.total_used_lifetime} days. </li>    
        </ul>
         </li>
    </ul>
    
    `

    let inputArea = document.createElement('div')
    inputArea.classList.add('input-area')
    inputArea.innerHTML = `
    <form>
    <div class="form-group">
        <input type="text" class="form-control" id="inputName" placeholder="Part Name">
    </div>
    <div class="form-group">
    <input type="text" class="form-control" id="inputTotalLifetime" placeholder="Total Lifetime">
    </div>
    <div class="form-group">
        <input type="text" class="form-control" id="inputUsedLifetime" placeholder="Actual Used Lifetime">
    </div>
    </form>

    `


    //Button which calls function to add new spare part
    let addNewSparePart = document.createElement('button')
    addNewSparePart.classList.add('btn', 'btn-outline-primary')
    addNewSparePart.innerHTML = "Add new Part"
    addNewSparePart.onclick = handleAddNewPart;




    //Binding all created elements
    card.appendChild(cardBody);
    cardBody.appendChild(spareParts)
    cardBody.appendChild(inputArea)
    inputArea.appendChild(addNewSparePart)
    cardContainer.appendChild(card)

    // Append the card element to the output container
    outputMachines.appendChild(cardContainer);

})



