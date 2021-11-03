let taskDataList = JSON.parse(localStorage.getItem("tasks")) || [];
const inputTask = document.getElementById('input-task');
const addTaskBtn = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');
let deleteBtnCollection = document.getElementsByClassName('delete-btn');
let completedCbxCollection = document.getElementsByClassName('completed');

const saveTaskList = () => localStorage.setItem("tasks", JSON.stringify(taskDataList));

const addOnClickListenerDeleteBtn = (deleteBtn) => deleteBtn
    .addEventListener('click', () => {
        const taskId = Number(deleteBtn.parentElement.getElementsByClassName('task')[0].getAttribute('task-id'));
        taskList.removeChild(deleteBtn.parentElement);
        taskDataList = taskDataList.filter(el => el.id !== taskId);
        saveTaskList();
    });

for (let deleteBtn of deleteBtnCollection) {
    addOnClickListenerDeleteBtn(deleteBtn);
}

const textDecoration = (isCompleted) => `text-decoration: ${isCompleted ? 'line-through' : 'initial'}`;

const addOnClickListenerCompleteCheckbox = (completedCbx) => completedCbx.addEventListener(
    'change',
    () => {
        let taskElement = completedCbx.parentElement.parentElement.getElementsByClassName('task')[0];
        const taskId = Number(taskElement.getAttribute('task-id'));
        taskElement.setAttribute('style', textDecoration(completedCbx.checked));
        taskDataList = taskDataList.map(task => (
            {
                taskName: task.taskName,
                isCompleted: task.id === taskId ? !task.isCompleted : task.isCompleted,
                id: task.id
            }
        ));
        saveTaskList();
    }
);

for (let completedCbx of completedCbxCollection) {
    addOnClickListenerCompleteCheckbox(completedCbx);
}

let addTask = () => {
    const taskName = inputTask.value;
    if (taskName.trim().length > 0) {
        const id = newId();
        addTaskListItem(taskName, false, id);
        taskDataList.push({taskName: taskName, isCompleted: false, id: id})
        saveTaskList();
        inputTask.value = '';
        inputTask.focus();
    }
};
addTaskBtn.addEventListener('click', addTask);

document.addEventListener('keydown', (ev) => {
    if (ev.code === 'Enter') addTask()
});

const newId = () => taskDataList.map(t => Number(t.id)).reduce((a, b) => Math.max(a, b), 0) + 1 || 0;

const addTaskListItem = (taskText, isCompleted, taskId) => {
    const label = document.createElement('label');
    const completedCbx = document.createElement('input');
    completedCbx.setAttribute('type', 'checkbox');
    completedCbx.setAttribute('class', 'completed');
    completedCbx.checked = isCompleted;
    label.appendChild(completedCbx);
    addOnClickListenerCompleteCheckbox(completedCbx)

    const span = document.createElement('span');
    span.setAttribute('class', 'task');
    span.setAttribute('task-id', taskId);
    span.setAttribute('style', textDecoration(isCompleted));
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

    saveTaskList();
};

taskDataList.forEach(taskData => addTaskListItem(taskData.taskName, taskData.isCompleted, taskData.id));