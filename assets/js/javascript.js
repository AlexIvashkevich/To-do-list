let slides = document.querySelectorAll('#slides .slide');
let currentSlide = 0;
let slideInterval = setInterval(nextSlide, 2000);

function nextSlide() {
    slides[currentSlide].className = 'slide';
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].className = 'slide showing';
}


let todo = [];
 if (localStorage.getItem('todo') != undefined) {
     todo = JSON.parse(localStorage.getItem('todo'));
     todo.forEach(item => {
         if (item.list = 'todo') {
             document.querySelector('.to-do').append(createTaskItem(item.todo, item.date));
         } else if (item.list = 'in-progress') {
             document.querySelector('.in-progress').append(createTaskItem(item.todo, item.date));
         } else if (item.list = 'done') {
             document.querySelector('.done').append(createTaskItem(item.todo, item.date));
         }
         counter()
     })
 }

 document.getElementById('add').onclick = () => {
     let taskObj = {};

     let taskText = document.querySelector('.input-text').value;
     let taskDate = document.querySelector('.input-data').value;

     taskObj.todo = taskText;
     taskObj.date = taskDate;
     taskObj.list = 'todo';

     let inputs = document.querySelectorAll('.input')
     let error = false;

     inputs.forEach(item => {
         if (item.value === '') {
             error = true;
             item.classList.add('input-error');
             item.onfocus = () => {
                 item.classList.remove('input-error');
             }
         } else {
             item.classList.remove('input-error');
         }
     })
     if (!error) {
         todo.push(taskObj);
         document.querySelector('.to-do').append(createTaskItem(taskText, taskDate));
         counter();
         document.querySelector('.input-text').value = '';
         document.querySelector('.input-data').value = '';

         localStorage.setItem('todo', JSON.stringify(todo))
     }
 }

 function createTaskItem(text, date) {

     let li = document.createElement('li');
     let textItem = document.createTextNode(text);
     let dateItem = document.createTextNode(date);

     let closeItem = document.createElement('button');
     closeItem.className = 'close-task';
     closeItem.addEventListener('click', closeTask);

     let uppItem = document.createElement('button');
     uppItem.className = 'upp-task';
     uppItem.addEventListener('click', toUppTask);

     let buttonGroup = document.createElement('div');
     buttonGroup.append(closeItem, uppItem);
     buttonGroup.className = 'button-group';

     let dateSpan = document.createElement('span');
     dateSpan.append(dateItem);
     dateSpan.className = 'task-date';

     let textGroup = document.createElement('div');
     textGroup.append(dateSpan, textItem);

     li.append(textGroup, buttonGroup);
     li.className = 'task-item';

     return li;
 }

 function toUppTask(event) {
     if (event.target.closest('.to-do')) {
         if (document.querySelector('.in-progress').childElementCount >= 5) {
             document.querySelector('.section-modal').classList.add('active');
         } else {
             document.querySelector('.in-progress').append(event.target.closest('.task-item'));
             todo.forEach(item => {
                 item.list = 'in-progress';
             })
             counter();
         }
     } else if (event.target.closest('.in-progress')) {
         document.querySelector('.done').append(event.target.closest('.task-item'));
         todo.forEach(item => {
             item.list = 'done';
         })
         counter()
     } else if (event.target.closest('.done')) {
         document.querySelector('.to-do').append(event.target.closest('.task-item'));
         counter()
     }
 }

 function closeTask(event) {
     let task = event.target.closest('.task-item');
     task.remove();
     counter();
 }

 document.querySelectorAll('.delete-all').forEach(item => {
     item.addEventListener('click', (event) => {
         if (event.target.closest('.card-box').querySelector('.in-progress')) {
             document.querySelector('.delete-modal').classList.add('active');
         } else {
             let taskList = event.target.closest('.card-box').querySelectorAll('.task-item').forEach(item => {
                 item.remove();
             })
             counter()
         }
     })

 })

 document.querySelector('.close-modal').onclick = () => {
     document.querySelector('.section-modal').classList.remove('active');
 }

 document.querySelector('.close-warning-modal').onclick = () => {
     document.querySelector('.delete-modal').classList.remove('active');
 }

 document.querySelector('.delete-list-modal').onclick = () => {
     document.querySelector('.delete-modal').classList.remove('active');
     document.querySelector('.in-progress').querySelectorAll('.task-item').forEach(item => {
         item.remove()
     })
     counter()
 }

 function counter() {
     document.querySelectorAll('.task-list').forEach(item => {
         item.parentElement.parentElement.querySelector('.counter').innerHTML = item.childElementCount;
     })
 }

 console.log(todo);