# Guessing-game-Alphabet
# 🎮 Guess-the-Letter (Binary Search Game) 

A fun web-based guessing game where the **computer tries to guess the letter (A–Z) you are thinking of** using a **binary search algorithm**. Built with **Flask (Python)** on the backend and a **modern HTML/CSS/JS** frontend.

---

## 🚀 Features - Interactive UI with a **blue & white theme**. 

- **Binary Search** ensures the computer guesses your letter in minimum tries.
- Shows **range of letters left** and **guess history**.
- Responsive design for desktop and mobile.
 - Restart button for quick replays.

 ## ⚙️ Setup & Installation

-1. Clone or download this repo:
   -```bash
   -git clone https://github.com/your-username/guessing_game.git
   -cd guessing_game


##Create a virtual environment:

-python -m venv venv
-.\venv\Scripts\Activate   # On Windows PowerShell
# OR
-source venv/bin/activate  # On Mac/Linux


-Install dependencies:

-pip install -r requirements.txt


-Run the app:

-python app.py


-Open your browser and visit:

-http://127.0.0.1:5000/

##🎯 How to Play
-Think of a letter between A and Z.
-Click Start – the computer makes its first guess.
-Use the buttons:
-Higher ⬆️ → Your letter comes after the guess alphabetically.
-Lower ⬇️ → Your letter comes before the guess alphabetically.
-Correct ✅ → The computer guessed it!
-If feedback is inconsistent, the app will warn you to restart.

##Tech Stack
-Backend: Python, Flask
-Frontend: HTML5, CSS3, JavaScript
-Algorithm: Binary Search
