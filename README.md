# MedGuide AI

## Intelligent Medical Referral and Recommendation System

MedGuide AI is a Bachelor of Engineering final-year project that aims to provide AI-assisted medical guidance from patient symptoms. The planned system will predict a possible disease, recommend a suitable healthcare system, and suggest an appropriate specialist.

The project is designed as a decision-support tool for preliminary guidance. It is not a replacement for a qualified medical professional or emergency medical care.

## Current Progress

Dataset 1 preprocessing and Disease Prediction Model 1 are complete.

- Source dataset: Disease-Symptom dataset
- Original records: 4,920
- Symptom features: 132
- Disease classes: 41
- Empty `Unnamed: 133` column removed
- Exact duplicate records removed: 4,616
- Clean unique records: 304
- Stratified split: 80% training and 20% testing
- Training records: 243
- Testing records: 61
- Model: Random Forest with 300 trees
- Current internal accuracy: 100%
- Model artifact: `model/disease_prediction_model.pkl`

The current score is an internal evaluation result on a small, deduplicated dataset. External validation and testing on unseen symptom combinations are still required before real-world use.

## Project Architecture

The planned system uses a hybrid two-model architecture:

```text
Patient symptoms
       |
       v
Preprocessing
       |
       v
AI Model 1: Disease prediction
       |
       v
Predicted disease
       |
       v
AI Model 2: Healthcare-system recommendation
       |
       v
Allopathy / Ayurveda / Homeopathy
       |
       v
Specialist recommendation
```

## Repository Structure

```text
MedGuide_AI/
|
|-- datasets/
|   |-- raw/
|   |   |-- Training.csv
|   |   `-- Testing.csv
|   `-- cleaned/
|       `-- Disease_Symptom_Cleaned.csv
|
|-- model/
|   `-- disease_prediction_model.pkl
|
|-- analyze_duplicates.py
|-- check_dataset.py
|-- clean_dataset1.py
|-- clean_dataset1_final.py
|-- dataset_balance.py
|-- disease_pattern_analysis.py
|-- split_dataset.py
|-- train_disease_model.py
|-- requirements.txt
`-- README.md
```

## Dataset 1 Workflow

1. `check_dataset.py` checks shape, missing values, duplicates, data types, target labels, and disease coverage.
2. `analyze_duplicates.py` checks repeated symptom patterns and possible conflicting disease labels.
3. `dataset_balance.py` checks the number of unique records available for each disease.
4. `disease_pattern_analysis.py` counts unique symptom patterns per disease.
5. `clean_dataset1_final.py` removes completely empty columns and exact duplicate rows, then writes the cleaned CSV.
6. `split_dataset.py` verifies the stratified 80:20 train-test split.
7. `train_disease_model.py` trains, evaluates, and saves the Random Forest model.

## Setup

Create and activate a virtual environment, then install the dependencies:

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
```

## Run the Current Pipeline

Run commands from the repository root:

```powershell
python check_dataset.py
python clean_dataset1_final.py
python split_dataset.py
python train_disease_model.py
```

The trained model is written to:

```text
model/disease_prediction_model.pkl
```

## Frontend Prototype

The `frontend/` directory contains a responsive static prototype for the MedGuide AI user experience. It includes symptom search and selection, a care-pathway result view, specialist guidance, and an explainability panel.

Run it locally from the repository root:

```powershell
python -m http.server 5500 --directory frontend
```

Then open `http://localhost:5500/` in a browser. The current result panel uses a small demo adapter so the interaction can be reviewed before the FastAPI backend is implemented. The next integration step is to replace that adapter with a request to Model 1 and pass the predicted disease into the future healthcare-system recommendation model.

## Deploy Frontend on Vercel

The repository includes `vercel.json`, so the static frontend is configured to deploy from the `frontend/` directory while keeping the project root as the GitHub repository.

1. Open [vercel.com](https://vercel.com/) and sign in with GitHub.
2. Select **Add New -> Project** and import `Amarhadpad/MedGuide_AI`.
3. Keep the **Root Directory** as `./`.
4. Leave the **Framework Preset** as `Other`.
5. Leave the **Build Command** empty.
6. Leave the **Output Directory** empty because `vercel.json` routes the static files.
7. Select **Deploy**.

Vercel will create a public URL for the frontend. The current hosted experience uses the demo prediction adapter; the Python model requires a separate backend deployment and API integration.

## Technology Direction

The planned application stack includes:

- Python, Pandas, NumPy, Scikit-learn, XGBoost, and Joblib for machine learning
- FastAPI for the backend API
- React.js for the frontend
- PostgreSQL for persistence
- Docker for packaging
- AWS for future cloud deployment
- Future integrations may include Google Maps, FHIR, and other healthcare APIs

## Future Scope

- Add Ayurveda and Homeopathy datasets
- Build a master healthcare dataset
- Create an evidence-based recommendation dataset
- Develop Model 2 for medical-system recommendation
- Add specialist recommendation
- Add explainable AI using techniques such as SHAP or LIME
- Build the FastAPI and React application
- Validate against external and clinically reviewed data
- Add privacy, security, monitoring, and responsible-AI controls

## Team

- Siddhant Shedge
- Amar Hadpad
- Isha Patil

Department of Information Technology  
Vidyavardhini's College of Engineering and Technology

## Disclaimer

MedGuide AI is an academic research project. Its predictions and recommendations must not be used as a medical diagnosis, treatment instruction, or substitute for consultation with a licensed healthcare professional. Seek emergency care for urgent symptoms.