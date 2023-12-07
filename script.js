const BASE_URL = 'https://jsonplaceholder.typicode.com';
const todosList = document.querySelector('#todosList > ul');
const loadingMessage = document.querySelector('#loading');
const form = document.querySelector('#form');

const fetchListData = async ()=>{
    
    try {
        const response = await axios.get(`${BASE_URL}/todos?_limit=5`);

        todosList.style.display = 'block';
        loadingMessage.style.display = 'none';

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
    todosList.innerHTML = html;
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let formData = new FormData(form);

    let title = formData.get('title');
    let isCompleted = formData.get('completed') == 'true';

    let listItem = document.createElement('li');
    let iconHTML = isCompleted ? '<i class="fa-solid fa-check text-green"></i>' : '<i class="fa-solid fa-xmark text-red"></i>';
    listItem.innerHTML = `${iconHTML} - ${title}`;
    todosList.appendChild(listItem);

    form.reset();
})

document.addEventListener("DOMContentLoaded",()=>{
    todosList.style.display = 'none';
    loadingMessage.style.display = 'inline-block';
    setTimeout(() => {
        fetchListData(); //loading test for demo
    }, 1500);
})