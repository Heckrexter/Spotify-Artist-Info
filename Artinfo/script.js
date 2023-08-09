const tokenurl = "https://accounts.spotify.com/api/token";

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
}



const artimg = document.getElementById("artistimg");
const artname = document.getElementById("artistname");
const popularity = document.getElementById("pop");
const albumlist = document.getElementById("albumscroll");
const songlist = document.getElementById('topsonglist')


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
  gettopsongs();
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

function gettopsongs() {
  songlist.innerHTML="";
  fetch(`https://api.spotify.com/v1/artists/${artid}/top-tracks?market=in`, {
    headers:{
      "Authorization":headerauth
    }
  })
  .then(response=>response.json())
  .then(data => {
    console.log(data);
    data.tracks.forEach((item, _) => {
      console.log(item.name);
      const adivi1 = document.createElement("div");
      adivi1.classList.add("adivi1");
      const adivi11 = document.createElement("div");
      adivi11.classList.add("adivi11");
      const adivi12 = document.createElement("div");
      adivi12.classList.add("adivi12");
      const adivi13 = document.createElement("div");
      adivi13.classList.add("adivi13");
      const slimg = document.createElement("img");
      slimg.src = item.album.images[0].url;
      slimg.classList.add("Slimg");
      slimg.alt = "Not loaded"
      adivi11.appendChild(slimg);
      const slname = document.createElement("p");
      slname.innerHTML = item.name;
      slname.classList.add("slname");
      adivi12.appendChild(slname);
      let timet = item.duration_ms / 1000;
      let mint = 0;
      console.log(timet);
      while (timet > 60) {
        timet = timet - 60;
        mint = parseFloat(mint) + 1; 
        console.log(mint);
      }
      console.log(`${mint} Minutes ${Math.trunc(timet)} Seconds`);
      const sltime = document.createElement("p");
      sltime.innerHTML = `${mint}:${Math.trunc(timet)}`;
      sltime.classList.add("sltime");
      adivi13.appendChild(sltime);
      adivi1.appendChild(adivi11);
      adivi1.appendChild(adivi12);
      adivi1.appendChild(adivi13);
      songlist.appendChild(adivi1);

    });
  })
}