const BASE_URL = 'https://jsonplaceholder.typicode.com';
const todosListEl = document.querySelector('#todosList > ul');
const spinnerEl = document.querySelector('#loading');
const formEl = document.querySelector('#form');


const setSpinner = (value)=> {
    todosListEl.style.display = value ? 'none' : 'block';
    spinnerEl.style.display =  value ? 'inline-block' : 'none';
}

const fetchListData = async ()=>{
    try {
        const response = await axios.get(`${BASE_URL}/todos?_limit=5`);

        setSpinner(false);
        appendList(response.data);

    } catch (error) {
        console.error("fetch data error! - ",error);
    }
}

const appendList = (data) =>{
    let html = '';
    data.forEach(el => {
        html += `<li>  ${el.completed ? '<i class="fa-solid fa-check text-green "></i>' : '<i class="fa-solid fa-xmark text-red"></i>'} - ${el.title}</li>`;
    });
    todosListEl.innerHTML = html;
}

formEl.addEventListener('submit',(e)=>{
    e.preventDefault();

    let formData = new FormData(formEl);
    let title = formData.get('title');
    let isCompleted = formData.get('completed') == 'true';

    let listItem = document.createElement('li');
    let iconHTML = isCompleted ? '<i class="fa-solid fa-check text-green"></i>' : '<i class="fa-solid fa-xmark text-red"></i>';
    listItem.innerHTML = `${iconHTML} - ${title}`;
    
    todosListEl.appendChild(listItem);

    formEl.reset();
})

document.addEventListener("DOMContentLoaded",()=>{

    setSpinner(true);

    setTimeout(() => {
        fetchListData(); //loading test for demo
    }, 1500);
})