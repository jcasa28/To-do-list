let selectedDate = null;
        const tasks = {};

        function addTask() {
            if (!selectedDate) {
                alert("Please select a date first.");
                return;
            }
            const taskName = prompt("Enter the task name:");
            if (taskName) {
                if (!tasks[selectedDate]) {
                    tasks[selectedDate] = [];
                    addTaskDateToMenu(selectedDate); // Add the date to the menu if it doesn't exist
                }
                tasks[selectedDate].push(taskName);
                renderTasks(selectedDate);
            }
        }
        function deleteTask(){
            if (renderTasks===null){
                alert("no task to delete");

            }
        }

        function toggleCalendar() {
            const calendar = document.getElementById("calendar");
            calendar.style.display = calendar.style.display === "none" ? "block" : "none";
        }

        function renderTasks(date) {
            const taskList = document.getElementById("taskList");
            const tasksHeader = document.getElementById("tasksHeader");
            taskList.innerHTML = '';

            if (tasks[date]) {
                tasksHeader.textContent = `Here are your tasks for ${date}:`;
                tasks[date].forEach(taskName => {
                    const taskItem = document.createElement("li");
                    taskItem.textContent = taskName;

                    const completeCheckbox = document.createElement("input");
                    completeCheckbox.type = "checkbox";
                    completeCheckbox.className = "complete-checkbox";
                    completeCheckbox.onclick = function() {
                        if (this.checked) {
                            taskItem.classList.add("task-complete");
                        } else {
                            taskItem.classList.remove("task-complete");
                        }
                    };

                    taskItem.appendChild(completeCheckbox);
                    taskList.appendChild(taskItem);
                });
            } else {
                tasksHeader.textContent = `No tasks for ${date}.`;
            }
        }

        function addTaskDateToMenu(date) {
            const taskDates = document.getElementById("taskDates");
            const dateItem = document.createElement("li");
            dateItem.textContent = date;
            dateItem.onclick = () => {
                selectedDate = date;
                renderTasks(date);
            };
            taskDates.appendChild(dateItem);
        }

        document.addEventListener("DOMContentLoaded", function() {
            const monthYear = document.getElementById("monthYear");
            const calendarDates = document.getElementById("calendarDates");
            const prevMonthButton = document.getElementById("prevMonth");
            const nextMonthButton = document.getElementById("nextMonth");

            let currentDate = new Date();

            // Get today's date
            const today = new Date();
            const todayDate = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;

            function renderCalendar() {
                calendarDates.innerHTML = '';
                const year = currentDate.getFullYear();
                const month = currentDate.getMonth();
                const firstDay = new Date(year, month, 1).getDay();
                const lastDate = new Date(year, month + 1, 0).getDate();

                monthYear.textContent = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });

                // Fill the calendar dates
                for (let i = 0; i < firstDay; i++) {
                    calendarDates.appendChild(document.createElement('div'));
                }

                for (let i = 1; i <= lastDate; i++) {
                    const dateElement = document.createElement('div');
                    const date = `${month + 1}/${i}/${year}`;
                    dateElement.textContent = i;
                    dateElement.addEventListener('click', () => {
                        selectedDate = date;
                        renderTasks(date);
                        toggleCalendar();
                    });

                    // Highlight today's date
                    if (date === todayDate) {
                        dateElement.classList.add('today-date');
                    }

                    // Highlight dates with tasks
                    if (tasks[date]) {
                        dateElement.style.backgroundColor = '#f09272';
                    }

                    calendarDates.appendChild(dateElement);
                }
            }

            prevMonthButton.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() - 1);
                renderCalendar();
            });

            nextMonthButton.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() + 1);
                renderCalendar();
            });

            renderCalendar();
        });