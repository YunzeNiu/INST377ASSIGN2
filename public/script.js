
const matches = document.getElementsByClassName('filtered-list')[0];
const input = document.getElementById("textinput");
//let inputvalue=
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
        <ul>
        <li class="restaurant">
            <h2>${place.name}</h2>
            <p> ${place.category}</p>
            <p> ${place.address_line_1}</p>
            <p> ${place.city}</p>
            <p> ${place.zip}</p>
        </li>
        </ul>
    `;
    })
    .join('');

matches.innerHTML = htmlString;  
};

input.addEventListener("keyup", (e) => {
        const searchString = e.target.value.toLowerCase();

        const filteredmatches = returnlist.filter(_restaurants => {
            return (
                _restaurants.category.toLowerCase().includes(searchString)
            );
        });

        if (!searchString.length) {
            display([]);
        } else {
            display(filteredmatches);
        }

        console.log(filteredmatches)

    });
  



