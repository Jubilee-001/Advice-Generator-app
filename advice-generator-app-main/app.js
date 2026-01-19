const api = "https://api.adviceslip.com/advice";

const fetchAdviceBtn = document.querySelector(".btn-container");
const adviceId = document.querySelector(".advice-id");
const adviceBox = document.querySelector(".advice-containers");
const loadingSpinner = document.querySelector(".loading");
const errorMessage = document.querySelector(".error");

fetchAdviceBtn.addEventListener("click", getAdvice);

async function getAdvice() {
  errorMessage.textContent = "";
  adviceBox.innerHTML = "";
  errorMessage.classList.add("hidden");
  loadingSpinner.classList.remove("hidden");

  try {
    const response = await fetch(api);
    const data = await response.json();

    if (data && data.slip && data.slip.advice) {
      const textElement = `<p>"${data.slip.advice}"</p> `;
      adviceBox.innerHTML = textElement;
      adviceId.textContent = `Advice #${data.slip.id}`;
    } else {
      throw new Error(
        "Something went wrong, please check your internet connection or try again later",
      );
    }
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove("hidden");
  } finally {
    loadingSpinner.classList.add("hidden");
  }
}
