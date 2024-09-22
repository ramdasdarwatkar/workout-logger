if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
      navigator.serviceWorker.register('serviceWorker.js')
          .then(function(registration) {
              console.log('Service Worker registered with scope:', registration.scope);
          })
          .catch(function(error) {
              console.error('Service Worker registration failed:', error);
          });
  });
}



    const exerciseCanvas = document.getElementById("exerciseCanvas");

    document.getElementById("logExerciseButton").onclick = function() {
        exerciseCanvas.classList.toggle("open");
    };
    
    function closeCanvas() {
        exerciseCanvas.classList.remove("open");
    }
    
    function populateExercises() {
        const muscle = document.getElementById("muscleSelect").value;
        const exercisesContainer = document.getElementById("exercisesContainer");
        exercisesContainer.innerHTML = ''; // Clear previous exercises
    
        const exercisesData = {
            chest: ["Bench Press", "Push Up", "Chest Fly"],
            back: ["Pull Up", "Deadlift", "Bent Over Row"],
            legs: ["Squat", "Leg Press", "Lunge"],
            arms: ["Bicep Curl", "Tricep Dip", "Push Up"]
        };
    
        if (muscle && exercisesData[muscle]) {
            exercisesData[muscle].forEach(exercise => {
                exercisesContainer.innerHTML += `<div>${exercise}</div>`;
            });
        }
    }
    
        const workoutContainer = document.getElementById('workoutContainer');
    
        const exerciseData = [
      {
        "exercise": "Cable Fly",
        "icon" : "cable-fly.png",
        "sets": [
            {"set":1,"reps": 1000, "weight": 888.8 }, 
          {"set":2, "reps": 10, "weight": 80 },
          { "set":3,"reps": 8, "weight": 90 }
        ]
      },
      {
        "exercise": "Deadlift",
        "icon":"deadlift.png",
        "sets": [
          { "set":1,"reps": 5, "weight": 100 },
          { "set":2,"reps": 5, "weight": 110 }
        ]
      },
      {
        "exercise": "Running",
        "duration": "30 minutes"
      }
    ];
    
        const monthYearElement = document.getElementById('monthYear');
        const calendarTable = document.getElementById('calendarTable');
        const eventsList = document.getElementById('eventsList');
    
        const currentMonth = new Date();
        const month = currentMonth.getMonth();
        const year = currentMonth.getFullYear();
    
        monthYearElement.textContent = currentMonth.toLocaleString('default', { month: 'long' }) + ' ' + year;
    
        function generateCalendar(month, year) {
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const daysInMonth = lastDay.getDate();
      const startDay = firstDay.getDay();
      const endDay = lastDay.getDay();
    
      let calendarHTML = `
        <div class="calendar-table__header">
          <div class="calendar-table__row">
            <div class="calendar-table__col">S</div>
            <div class="calendar-table__col">M</div>
            <div class="calendar-table__col">T</div>
            <div class="calendar-table__col">W</div>
            <div class="calendar-table__col">T</div>
            <div class="calendar-table__col">F</div>
            <div class="calendar-table__col">S</div>
          </div>
        </div>
        <div class="calendar-table__body">
      `;
    
      let weekHTML = '<div class="calendar-table__row">';
    
      // Fill empty cells for days before the first day of the month
      for (let i = 0; i < startDay; i++) {
        weekHTML += `<div class="calendar-table__col calendar-table__inactive"><div class="calendar-table__item"></div></div>`;
      }
    
      // Fill in the days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const isToday = day === currentMonth.getDate() && month === currentMonth.getMonth() && year === currentMonth.getFullYear();
        weekHTML += `<div class="calendar-table__col${isToday ? ' calendar-table__today' : ''}"><div class="calendar-table__item"><span>${day}</span></div></div>`;
    
        // If the week ends (Saturday) or it’s the last day of the month
        if ((day + startDay) % 7 === 0) {
          calendarHTML += weekHTML + '</div>'; // Close the week row
          weekHTML = '<div class="calendar-table__row">'; // Start a new week row
        }
      }
    
      // If there are remaining empty cells in the last week, fill them
      const remainingCells = (7 - (daysInMonth + startDay) % 7) % 7;
      for (let i = 1; i <= remainingCells; i++) {
        weekHTML += `<div class="calendar-table__col calendar-table__inactive"><div class="calendar-table__item"></div></div>`;
      }
    
      // Close the last week row if it's not empty
      if (weekHTML !== '<div class="calendar-table__row">') {
        calendarHTML += weekHTML + '</div>'; // Close the last week row if it was started
      }
    
      calendarHTML += '</div>'; // Close the calendar body
    
      calendarTable.innerHTML = calendarHTML;
    }
    
    function displayExercises(exercises) {
        let exercisesHTML = '';
    
        exercises.forEach(exercise => {
            exercisesHTML += `
                <div class="col-12 mb-3">
                    <div class="card">
                        <div class="card-header d-flex align-items-center">
                            ${exercise.icon ? `<img width="64" height="64" src="icons/${exercise.icon}" class="mr-2">` : ''}
                            <h5 class="mb-0 fw-bold">${exercise.exercise}</h5>
                        </div>
                        <div class="card-body">
                            ${exercise.sets ? `
                                <div class="sets-container">
                                    ${exercise.sets.map(set => `
                                        <div class="d-flex justify-content-around align-items-center mb-2" style="background-color: #f0f0f0; padding: 10px; border-radius: 5px;">
                                            <div>
                                                ${set.set}
                                            </div>
                                            
    <div style="padding: 5px; border-radius: 10px; width: 100px; text-align: center; display: flex; align-items: center; justify-content: center;">
        <div style="padding: 5px; border-radius: 5px; background-color: lightgray; margin-right: 5px;width:60px;">
            ${set.weight}
        </div>
        <span class="fw-bold">kg</span>
    </div>
    <div style="padding: 5px; border-radius: 10px; width: 100px; text-align: center; display: flex; align-items: center; justify-content: center;">
        <div style="padding: 5px; border-radius: 5px; background-color: lightgray; margin-right: 5px; width:60px;">
            ${set.reps}
        </div>
        <span class="fw-bold">reps</span>
    </div>
    
                                        </div>
                                    `).join('')}
                                </div>
                            ` : `
                                <p>Duration: ${exercise.duration}</p>
                            `}
                        </div>
                    </div>
                </div>
            `;
        });
    
        workoutContainer.innerHTML = exercisesHTML;
    }
    
    function populateEvents() {
          events.forEach(event => {
            const li = document.createElement('li');
            li.className = 'events__item';
            li.innerHTML = `
              <div class="events__item--left">
                <span class="events__name">${event.name}</span>
                <span class="events__date">${event.date} ${event.time ? `at ${event.time}` : ''}</span>
              </div>
            `;
            eventsList.appendChild(li);
          });
        }
    
    // Call this function after generating the calendar
    displayExercises(exerciseData);
    
    
    
        /* function populateEvents() {
          events.forEach(event => {
            const li = document.createElement('li');
            li.className = 'events__item';
            li.innerHTML = `
              <div class="events__item--left">
                <span class="events__name">${event.name}</span>
                <span class="events__date">${event.date} ${event.time ? `at ${event.time}` : ''}</span>
              </div>
            `;
            eventsList.appendChild(li);
          });
        } */
    
        generateCalendar(month, year);
        //populateEvents();
        //fetchExercises();
    
