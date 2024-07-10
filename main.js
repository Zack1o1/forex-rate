import {api} from './app.js'
const date = document.querySelector('.date');

fetch(api)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // data.length = 0
    if(data.length > 0){
      date.textContent = data[0].date;
      const currencyTableBody = document.getElementById('currencyTableBody')
      currencyTableBody.innerHTML = ''
    for(let i=0; i<data.length; i++){
      
      const trow = document.createElement('tr')
      const flagArr =['in','us','eu','gb','ch','au','ca','sg','jp','cn','sa','qa','th','ae','my','kr','se','dk','hk','kw','bh']
      trow.innerHTML =`
      <td>
      <p><span class="flag fi fi-${flagArr[i]}"></span><span class="currency">${data[i].iso3}</span> <span class="name hidden">(${data[i].name})</span></p>
      </td>
      <td>
      <span class="unit">${data[i].unit}</span>
      </td>
      <td>
      <span class="rate buy-rate">${data[i].buy}</span>
      </td>
      <td>
      <span class="rate sell-rate">${data[i].sell}</span>
      </td>`
      currencyTableBody.append(trow)
      
    }
  }  
    else{
      const problem = document.createElement('p')
      problem.innerHTML = `Sorry, we are having problem now. <br>Please visit later on.`
      problem.classList.add('problem')
      document.body.append(problem)
    } 
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
