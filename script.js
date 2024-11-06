
function getDaysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

function generateInputs() {
  const month = document.getElementById('month').value;
  const year = document.getElementById('year').value;
  const daysInMonth = getDaysInMonth(month, year);
  const container = document.getElementById('days-container');
  container.innerHTML = '';

  for (let day = 1; day <= daysInMonth; day++) {
    const dayHeader = document.createElement('h3');
    dayHeader.innerText = `Day ${day}:`;

    const input1 = createTextInput(`day${day}_imam`, `Imam Name for Day ${day}`);
    const input2 = createTextInput(`day${day}_muadzin`, `Muadzin Name for Day ${day}`);
    const input3 = createTextInput(`day${day}_dua_reader`, `Du'a Reader Name for Day ${day}`);

    container.appendChild(dayHeader);
    container.appendChild(input1);
    container.appendChild(input2);
    container.appendChild(input3);
  }
}

function createTextInput(name, placeholder) {
  const label = document.createElement('label');
  label.innerText = placeholder + ": ";

  const input = document.createElement('input');
  input.type = 'text';
  input.name = name;
  input.placeholder = placeholder;

  const div = document.createElement('div');
  div.appendChild(label);
  div.appendChild(input);

  return div;
}
