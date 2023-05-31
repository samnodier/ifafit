let startBtn = document.querySelector(".start");
let closeBtn = document.querySelector(".close");
let nextBtn = document.querySelector(".next");
let box = document.querySelector(".box");
let offer = document.querySelector(".giveaway");
let num = 0;


function initializeQuestions(questions) {
  let selectedHTML = new Array();
  let newQuestions = questions;
  console.log(newQuestions);
  newQuestions.forEach((question) => {
    let optionsHTML = [];
    question.options.forEach((option) => {
      optionsHTML.push(
        `
        <div class="form-check">
            <input class="form-check-input" type="radio" name="answer" id="id-${question.options.indexOf(
              option
            )}">
            <label class="form-check-label" for="id-${question.options.indexOf(
              option
            )}">
              ${option}
            </label>
          </div>
        `
      );
    });
    console.log(optionsHTML);
    selectedHTML.push(`
      <h4 class="question-text">${question.question}</h4>
      <form action="">
        ${optionsHTML.join("\n")}
      </form>
    `);
  });

  displayData(selectedHTML, newQuestions);
}

function displayData(selectedHTML, questions) {
  if (num < selectedHTML.length) {
    document.querySelector(".question").innerHTML = selectedHTML[num];

    let pain = "No";
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("next")) {
        let checkboxes = document.querySelectorAll(".form-check-input");
        e.preventDefault();
        let optionNum = 1;
        checkboxes.forEach((each) => {
          if (each.checked) {
            let answer = each.nextElementSibling.textContent.trim();
              let questionText =
                document.querySelector(".question-text").textContent;
              // console.log(questionText);
              if (questionText === "Have you had an injury recently?") {
                if (answer === "Yes") {
                  pain = "Yes";
                  // console.log("INJURY");
                } else if (answer==="No") {
                  // console.log(answer === "No");
                  num++;
                  // console.log("NO INJURY");
                }
              } else {
                // console.log("something else")
              }
            num++;
            if (num < selectedHTML.length) {
              document.querySelector(".question").innerHTML = selectedHTML[num];
            }

            if (num === selectedHTML.length) {
              document.querySelector(".next").innerHTML = "Finish";
              box.classList.add("hide");
              offer.classList.remove("hide");
              if (pain === "Yes") {
                offer.innerHTML = "<h1>Looking to minimize Pain in the saddle?</h1>";
              } else {
                offer.innerHTML = "<h1>Interested in becoming more supple in the saddle?</h1>";
              }
            }
          }
        });
      }
    });
  }
}

startBtn.addEventListener("click", () => {
  // Get data from JSON file
  num = 0;
  let url = "./questions.json";
  fetch(url).then((response) => {
    response.json().then((json) => {
      let questions = json;
      // console.log(typeof questions);
      initializeQuestions(questions);
    });
  });
  document.querySelector(".next").innerHTML = "Next";
  if (box.classList.contains("hide")) {
    box.classList.remove("hide");
    startBtn.classList.add("hide");
  }
});

closeBtn.addEventListener("click", () => {
  // console.log("clicked");
  if (!box.classList.contains("hide")) {
    box.classList.add("hide");
    startBtn.classList.remove("hide");
    offer.classList.add("hide");
  }
});
