// const secretkey = "ad6aeff92fed456a9f9f35f851fcd459";
const tokenurl = "https://accounts.spotify.com/api/token";
// const clientid = "5885c544543f44caa2ef474955990a77";

const ct = "application/x-www-form-urlencoded";
const urlparam = new URLSearchParams(window.location.search);
const artid = urlparam.get('artid');
console.log(artid);
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=client_credentials&client_id=${clientid}&client_secret=${secretkey}`
}
let btoken="";
let toktype="";
console.log("Initialized");
let headerauth;

function generate() {
  fetch(tokenurl, options)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    btoken = data.access_token;
    toktype = data.token_type;
    console.log(btoken,toktype)
    headerauth = `${toktype} ${btoken}`;
  })
  .catch(error => {
    console.error('Error:', error);
  });
  write()
}



const artimg = document.getElementById("artistimg");
const artname = document.getElementById("artistname");
const popularity = document.getElementById("pop");
const albumlist = document.getElementById("albumscroll");


function findartist() {
  // generate()
  fetch(`https://api.spotify.com/v1/artists/${artid}`, {
    headers:{
      "Authorization":headerauth
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    console.log(`Name: ${data.name}`);
    console.log(`Popularity: ${data.popularity}`);
    artimg.src = data.images[0].url;
    artname.innerHTML = data.name;
    popularity.innerHTML = `Popularity Score: ${data.popularity}`;
  })
  findalbum();
}

function findalbum() {
  albumlist.innerHTML="";
  fetch(`https://api.spotify.com/v1/artists/${artid}/albums?market=IN&limit=10`, {
    headers:{
      "Authorization":headerauth
    }
  })
  .then(response=>response.json())
  .then(data => {
    console.log(data);
    // REWRITE THIS AND PUT IT INTO ONE DIV BEFORE APPENDING
    data.items.forEach((item, _) => {
      // console.log(item.images[0].url);
      const listitem = document.createElement("li");
      listitem.classList.add("allist")
      const divi = document.createElement("div"); //creating outside div
      divi.classList.add("divi")
      const divi1 = document.createElement("div"); //creating inside div 1
      divi1.classList.add("divi1")
      const divi2 = document.createElement("div"); //creating inside div 2
      divi2.classList.add("divi2")
      let alimg = document.createElement("img");
      alimg.src = item.images[0].url;
      alimg.classList.add("Alimg");
      alimg.alt = "Not loaded"
      divi1.appendChild(alimg);
      const alname = document.createElement("p");
      alname.innerHTML = item.name;
      alname.classList.add("alname");
      const aldate = document.createElement("p");
      aldate.innerHTML = item.release_date.slice(0,4);
      aldate.classList.add("aldate");
      const altrackno = document.createElement("p");
      if (item.total_tracks > 1) {
        altrackno.innerHTML = `${item.total_tracks} tracks`;
      } else {
        altrackno.innerHTML = `${item.total_tracks} track`;
      }
      altrackno.classList.add("altrack");
      const divi21 = document.createElement("div"); //creating inside div 2
      divi21.classList.add("divi21")
      divi2.appendChild(alname);
      divi21.appendChild(aldate);
      divi21.innerHTML += '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dot" viewBox="0 0 16 16"><path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>'
      divi21.appendChild(altrackno);
      divi2.appendChild(divi21);
      divi.appendChild(divi1);
      divi.appendChild(divi2);
      listitem.appendChild(divi)
      albumlist.appendChild(listitem);
    });
  })
}

// const findartist = document.getElementById("find");
// findartist.addEventListener("click", generate());