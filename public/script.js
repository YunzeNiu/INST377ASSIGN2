
const matches = document.getElementById('matches');
const input = document.getElementById("textinput");
let returnlist=[];

async function loadData() {
    try {
        const res = await fetch('https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json');
        returnlist = await res.json();
    } catch (err) {
        console.error(err);
    }
}
window.onload = loadData;

function display(place) {
    const htmlString = place
    .map((place) => {
        return `
        <li class="restaurant">
            <h2>${place.name}</h2>
            <p> ${place.category}</p>
            <p> ${place.address_line_1}</p>
            <p> ${place.city}</p>
            <p> ${place.zip}</p>
        </li>
    `;
    })
    .join('');
matches.innerHTML = htmlString;
};



input.addEventListener("keyup", e => {
    const searchString = e.target.value.toLowerCase();
    const filteredmatches = returnlist.filter(_restaurants => {
      return (
        _restaurants.category.toLowerCase().includes(searchString) 
      );
    });
    display(filteredmatches);
  });
  



