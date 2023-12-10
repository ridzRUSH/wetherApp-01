// ------------ fetch api ----------------

const content = document.querySelector(".weather-data");
const getData = async function (name) {
  try {
    const jsonData = await fetch(`http://localhost:3000/weather?name=${name}`);
    const data = await jsonData.json();
    if (data.error) {
      console.error(data.error);
      // inssert no data fond
      content.innerHTML = "";
      content.insertAdjacentHTML(
        "afterbegin",
        `<h4>${name.toUpperCase()}</h4>
      <p>${data.error}</p>`
      );
      return;
    }
    content.innerHTML = "";
    content.insertAdjacentHTML(
      "afterbegin",
      `<h4>${name.toUpperCase()}</h4>
    <p>${data.data}</p>`
    );
  } catch (error) {
    console.error(error);
  }
};

//// --------- getting input --------
const form = document.querySelector(".location-form");
const inputForm = document.querySelector("#location-input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getData(inputForm.value);
});
