// const secretkey = "ad6aeff92fed456a9f9f35f851fcd459";
// const tokenurl = "https://accounts.spotify.com/api/token";
// const clientid = "5885c544543f44caa2ef474955990a77";
// const ct = "application/x-www-form-urlencoded";
// const options = {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: `grant_type=client_credentials&client_id=${clientid}&client_secret=${secretkey}`
// }
// let btoken="";
// let toktype="";
// console.log("Initialized");
// let headerauth;
// function generate() {
//     fetch(tokenurl, options)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         btoken = data.access_token;
//         toktype = data.token_type;
//         console.log(btoken,toktype)
//         headerauth = `${toktype} ${btoken}`;
//     })
//   .catch(error => {
//     console.error('Error:', error);
//   });
// }

// function getdat() {
//   const artimg = document.getElementById("artim");
//   let test = document.getElementById("dinput").value;
//   console.log(test)
//   const regex1 = /\/artist\/(\w+)/; // Regular expression to match the artist ID
//   let artid = test.match(regex1);
//   artid = artid[1]
//   if (artid.includes("?")){
//     // const regex2 = /(\w+)\?/;
//     artid = artid(0,indexOf('?'));
//   }
//   if (artid.includes("&")){
//     // const regex2 = /(\w+)\?/;
//     artid = artid(0,indexOf('&'));
//   }
//   console.log(artid)
//   console.log(headerauth);
//   fetch(`https://api.spotify.com/v1/artists/${artid}`, {
//     headers:{
//       "Authorization":headerauth
//     }
//   })
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//     console.log(`Name: ${data.name}`);
//     console.log(`Popularity: ${data.popularity}`);
//     artimg.src = data.images[0].url;
//   })
// }


// let test = document.getElementById("dinput").value;
// console.log(test)
// const regex1 = /\/artist\/(\w+)/; // Regular expression to match the artist ID
// let artid = test.match(regex1);
// artid = artid[1]
// if (artid.includes("?")){
//   // const regex2 = /(\w+)\?/;
//   artid = artid(0,indexOf('?'));
// }
// if (artid.includes("&")){
//   // const regex2 = /(\w+)\?/;
//   artid = artid(0,indexOf('&'));
// }

function artid() {
  let test = document.getElementById("artsid").value;
  console.log(test)
  const regex1 = /\/artist\/(\w+)/; // Regular expression to match the artist ID
  let artid = test.match(regex1);
  artid = artid[1]
  if (artid.includes("?")){
    // const regex2 = /(\w+)\?/;
    artid = artid(0,indexOf('?'));
  }
  if (artid.includes("&")){
    // const regex2 = /(\w+)\?/;
    artid = artid(0,indexOf('&'));
  }
  console.log(artid)
  window.location.href = `../Artinfo/artistinfo.html?artid=${artid}`;
}