const tokenurl = "https://accounts.spotify.com/api/token";

const ct = "application/x-www-form-urlencoded";
const urlparam = new URLSearchParams(window.location.search);
const artid = urlparam.get('artid');
const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=client_credentials&client_id=${clientid}&client_secret=${secretkey}`
}
let btoken="";
let toktype="";
let headerauth;

async function generate() {
  const response = await fetch(tokenurl, options);
  const data = await response.json();
  btoken = data.access_token;
  toktype = data.token_type;
  headerauth = `${toktype} ${btoken}`;
}



const artimg = document.getElementById("artistimg");
const artname = document.getElementById("artistname");
const popularity = document.getElementById("pop");
const albumlist = document.getElementById("albumscroll");
const songlist = document.getElementById('topsonglist')


async function findartist() {
  await generate()
  const reponse = await fetch(`https://api.spotify.com/v1/artists/${artid}`, {
    headers:{
      "Authorization":headerauth
    }
  })
  const data = await reponse.json();
    artimg.src = data.images[0].url;
    artname.innerHTML = data.name;
    popularity.innerHTML = `Popularity Score: ${data.popularity}`;
  findalbum();
  gettopsongs();
}

async function findalbum() {
  albumlist.innerHTML="";
  const response = await fetch(`https://api.spotify.com/v1/artists/${artid}/albums?market=IN&limit=10`, {
    headers:{
      "Authorization":headerauth
    }
  })
  const data = await response.json();
    data.items.forEach((item, _) => {
      const listitem = document.createElement("li");
      listitem.classList.add("allist")
      const divi = document.createElement("div");
      divi.classList.add("divi")
      const divi1 = document.createElement("div");
      divi1.classList.add("divi1")
      const divi2 = document.createElement("div");
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
      const divi21 = document.createElement("div");
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
}

async function gettopsongs() {
  songlist.innerHTML="";
  const response = await fetch(`https://api.spotify.com/v1/artists/${artid}/top-tracks?market=in`, {
    headers:{
      "Authorization":headerauth
    }
  })
  const data = await response.json();
  data.tracks.forEach((item, _) => {
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
    while (timet > 60) {
      timet = timet - 60;
      mint = parseFloat(mint) + 1; 
    }
    timet = Math.trunc(timet);
    if (timet < 10) {
      timet = timet.toString()
      timet = "0" + timet;
    }
    const sltime = document.createElement("p");
    sltime.innerHTML = `${mint}:${timet}`;
    sltime.classList.add("sltime");
    const adivio = document.createElement("div");
    adivio.classList.add("adivio");
    adivio.appendChild(adivi12);
    adivio.appendChild(adivi13);
    adivi13.appendChild(sltime);
    adivi1.appendChild(adivi11);
    adivi1.appendChild(adivio);
    songlist.appendChild(adivi1);
  });
}