const milestoneData = JSON.parse(data).data;

function loadMilestone(){
    const milestones = document.querySelector('.milestones');
    milestones.innerHTML = `${milestoneData.map(function(milestone){
        return ` <div class="milestone border-b" id="${milestone._id}">
        <div class="flex">
          <div class="checkbox"><input type="checkbox" onclick="clickElement(this,${milestone._id})" />
          </div>

          <div onclick="showElement(this,${milestone._id})">
            <p>
              ${milestone.name}
              <span><i class="fas fa-chevron-down"></i></span>
            </p>
          </div>
        </div>
        <div class="hidden_panel">
          ${milestone.modules.map(function(module){
            return `<div class="module border-b">
            <p>${module.name}</p>
          </div>`;
          }).join('')}
        </div>
      </div>`;
    }).join('')}`;
}

function showElement(openElement,id){
    const currentElement = openElement.parentNode.nextElementSibling;
    const existElement = document.querySelector('.show');
    const active = document.querySelector('.active');

    //hide bold font
    if(!openElement.classList.contains('active') && active){
        active.classList.remove('active');
    }
    openElement.classList.toggle('active');   //active bold in current panel

    //hide panel
    if(!currentElement.classList.contains('show') && existElement){
        existElement.classList.remove('show');
    }
    currentElement.classList.toggle('show'); //show current panel

    showImage(id);
}
function showImage(id){
    const milestoneImage = document.querySelector('.milestoneImage');
    const milestoneTitle = document.querySelector('.title');
    const milestoneDetails = document.querySelector('.details');

    milestoneImage.style.opacity = '0';
    milestoneImage.src = milestoneData[id].image;
    milestoneTitle.innerText = milestoneData[id].name;
    milestoneDetails.innerText = milestoneData[id].description;
}

const milestoneImage = document.querySelector('.milestoneImage');
milestoneImage.onload = function(){
    this.style.opacity = '1';
}

function clickElement(checkbox,id){
    const doneList = document.querySelector('.doneList');
    const milestoneList = document.querySelector('.milestones');
    const item = document.getElementById(id);

    if(checkbox.checked){
        milestoneList.removeChild(item);
        doneList.appendChild(item);
    }else{
        milestoneList.appendChild(item);
        doneList.removeChild(item);
    }
}


loadMilestone();