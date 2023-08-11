function artid() {
  document.getElementById("artsid").placeholder = "";
  let test = document.getElementById("artsid").value;
  console.log(test)
  const regex1 = /\/artist\/(\w+)/;
  let artid = test.match(regex1);
  if (!artid) {
    console.log("no match");
    document.getElementById("artsid").value = "";
    document.getElementById("artsid").placeholder = "Error: Invalid URL";
    // alert("Invalid URL")
    return
  }
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

function clearinput() {
  document.getElementById("artsid").placeholder = "";
}