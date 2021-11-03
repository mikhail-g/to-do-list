const inputTask = document.getElementById('input-task');
const addTaskBtn = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');
let deleteBtnCollection = document.getElementsByClassName('delete-btn');
let completedCbxCollection = document.getElementsByClassName('completed');

const addOnClickListenerDeleteBtn = (deleteBtn) => deleteBtn
    .addEventListener('click', () => taskList.removeChild(deleteBtn.parentElement));

for (let deleteBtn of deleteBtnCollection) {
    addOnClickListenerDeleteBtn(deleteBtn);
}

const addOnClickListenerCompleteCheckbox = (completedCbx) => completedCbx.addEventListener(
    'change',
    () => completedCbx.parentElement.parentElement
        .getElementsByClassName('task')[0]
        .setAttribute('style', `text-decoration: ${completedCbx.checked ? 'line-through' : 'initial'}`)
);

for (let completedCbx of completedCbxCollection) {
    addOnClickListenerCompleteCheckbox(completedCbx);
}

addTaskBtn.addEventListener('click', (ev) => {
    const taskText = inputTask.value;
    if (taskText.trim().length > 0) {
        const label = document.createElement('label');
        const completedCbx = document.createElement('input');
        completedCbx.setAttribute('type', 'checkbox');
        completedCbx.setAttribute('class', 'completed');
        label.appendChild(completedCbx);
        addOnClickListenerCompleteCheckbox(completedCbx)

        const span = document.createElement('span');
        span.setAttribute('class', 'task');
        const spanText = document.createTextNode(taskText);
        span.appendChild(spanText);

        const deleteBtn = document.createElement('button');
        deleteBtn.setAttribute('class', 'delete-btn');
        const btnText = document.createTextNode('DELETE');
        deleteBtn.appendChild(btnText);
        addOnClickListenerDeleteBtn(deleteBtn);

        const li = document.createElement('li');
        li.appendChild(label);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);

        inputTask.value = '';
    }
})
