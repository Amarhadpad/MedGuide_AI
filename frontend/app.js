const symptoms = [
  "Fever", "Headache", "Cough", "Fatigue", "Sore throat", "Nausea",
  "Body pain", "Shortness of breath", "Dizziness", "Stomach pain",
  "Joint pain", "Skin rash", "Chills", "Vomiting", "Loss of appetite",
  "Runny nose", "Chest pain", "Back pain"
];

const selected = new Set();
const symptomGrid = document.querySelector("#symptom-grid");
const selectedArea = document.querySelector("#selected-area");
const counter = document.querySelector("#symptom-counter");
const search = document.querySelector("#symptom-search");
const resultEmpty = document.querySelector("#result-empty");
const resultContent = document.querySelector("#result-content");
const resultDisease = document.querySelector("#result-disease");
const resultReason = document.querySelector("#result-reason");

function renderSymptoms(filter = "") {
  const query = filter.trim().toLowerCase();
  symptomGrid.innerHTML = "";
  symptoms.filter((symptom) => symptom.toLowerCase().includes(query)).forEach((symptom) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `symptom-button${selected.has(symptom) ? " selected" : ""}`;
    button.textContent = symptom;
    button.addEventListener("click", () => toggleSymptom(symptom));
    symptomGrid.appendChild(button);
  });
}

function renderSelected() {
  selectedArea.innerHTML = "";
  if (selected.size === 0) {
    selectedArea.innerHTML = '<span class="empty-selection">Your selected symptoms will appear here</span>';
  } else {
    selected.forEach((symptom) => {
      const chip = document.createElement("span");
      chip.className = "selected-chip";
      chip.innerHTML = `${symptom}<button type="button" aria-label="Remove ${symptom}">×</button>`;
      chip.querySelector("button").addEventListener("click", () => toggleSymptom(symptom));
      selectedArea.appendChild(chip);
    });
  }
  counter.textContent = `${selected.size} selected`;
  renderSymptoms(search.value);
}

function toggleSymptom(symptom) {
  selected.has(symptom) ? selected.delete(symptom) : selected.add(symptom);
  renderSelected();
}

function showResult() {
  if (selected.size === 0) {
    search.focus();
    search.setAttribute("placeholder", "Choose at least one symptom");
    return;
  }
  const hasRespiratory = ["Cough", "Sore throat", "Runny nose", "Shortness of breath"].some((item) => selected.has(item));
  resultDisease.textContent = hasRespiratory ? "Seasonal viral infection" : "General health concern";
  resultReason.textContent = hasRespiratory
    ? "Your selected symptoms form a pattern commonly associated with an acute respiratory condition."
    : "Your selected symptoms need a clinical review to understand their underlying cause and severity.";
  resultEmpty.classList.add("hidden");
  resultContent.classList.remove("hidden");
}

search.addEventListener("input", (event) => renderSymptoms(event.target.value));
document.querySelector("#clear-symptoms").addEventListener("click", () => { selected.clear(); renderSelected(); });
document.querySelector("#analyze-button").addEventListener("click", showResult);
document.addEventListener("keydown", (event) => {
  if (event.key === "/" && document.activeElement !== search) { event.preventDefault(); search.focus(); }
});

renderSymptoms();
renderSelected();