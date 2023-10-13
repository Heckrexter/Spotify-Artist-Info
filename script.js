function artid() {
  document.getElementById("artsid").placeholder = "";
  let test = document.getElementById("artsid").value;
  const regex1 = /\/artist\/(\w+)/;
  let artid = test.match(regex1);
  if (!artid) {
    document.getElementById("artsid").value = "";
    document.getElementById("artsid").placeholder = "Error: Invalid URL";
    return
  }
  artid = artid[1]
  if (artid.includes("?")){
    artid = artid(0,indexOf('?'));
  }
  if (artid.includes("&")){
    artid = artid(0,indexOf('&'));
  }
  window.location.href = `../Artinfo/artistinfo.html?artid=${artid}`;
}

function clearinput() {
  document.getElementById("artsid").placeholder = "";
}