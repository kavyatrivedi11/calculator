const display = document.getElementById("display");

function appendValue(value) {
  if (display.value === "0" && value !== ".") {
    display.value = value;
  } else {
    display.value += value;
  }
}

function clearDisplay() {
  display.value = "0";
}

function deleteLast() {
  if (display.value.length > 1) {
    display.value = display.value.slice(0, -1);
  } else {
    display.value = "0";
  }
}

function calculate() {
  try {
    let expression = display.value;

    // Convert percentage into decimal
    expression = expression.replace(/(\d+(\.\d+)?)%/g, "($1/100)");

    // Calculate the expression
    let result = Function('"use strict"; return (' + expression + ')')();

    if (!isFinite(result)) {
      display.value = "Error";
    } else {
      display.value = Number(result.toFixed(10));
    }
  } catch (error) {
    display.value = "Error";
  }
}

// Keyboard support
document.addEventListener("keydown", function(event) {
  const key = event.key;

  if ("0123456789.+-*/%".includes(key)) {
    appendValue(key);
  }

  if (key === "Enter" || key === "=") {
    calculate();
  }

  if (key === "Backspace") {
    deleteLast();
  }

  if (key === "Escape") {
    clearDisplay();
  }
});
