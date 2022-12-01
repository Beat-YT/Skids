function errorPfp(imgid, id) {
    document.getElementById(`imageBox${imgid}`).src = "https://cdn.discordapp.com/embed/avatars/" + id % 5 + ".png";
}

function MakeSkids(array) {
    let html = "";
    i = 0;
    const showDiscord = document.getElementById("ShowDiscord").checked;
    const searchQuery = document.getElementById("Search").value;
    console.log(searchQuery);
    array.forEach(skid => {
        if (skid.uid.toLowerCase().includes(searchQuery.toLowerCase()) || skid.tag.toLowerCase().includes(searchQuery.toLowerCase())) {
            let skidPfp = "";
            if (skidPfp != null) {
                skidPfp = `https://cdn.discordapp.com/avatars/${skid.uid}/${skid.avatar}.png?size=128`;
            }
            let tag = skid.tag.split('#')[1];
            let imageBoxID = `imageBox${i}`;

            let discordID = "";
            if (showDiscord == true) {
                discordID = skid.uid;
            }
            html += `<div class="col"><div class="card text-bg-dark" style="margin:1px;width:100%;height:100%">
        <div class="card-body">
        <img id=${imageBoxID} src="${skidPfp}" style="border-radius:50%;width:50%;height:auto" class="card-img-top" onerror='errorPfp(` + i + `,` + tag + `)');">
            <h5 class="card-title">${skid.tag}</h5>
            <p class="card-text"><a target="_blank" href="https://discord.com/users/${discordID}">${discordID}</a></p>
        </div>
    </div></div>`;
            i++;
        }
    });
    document.getElementById("skids").innerHTML = html;

}
let skids = [];

function update() {

    if (skids.length == 0) {
        console.log("Fetching these stupid ass script kiddies");
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                let result = JSON.parse(xhttp.responseText);
                console.log("Found " + result.length + " losers");
                MakeSkids(result);
            }
        };
        xhttp.open("GET", "https://raw.githubusercontent.com/Beat-YT/Skids/main/skids.json", true);
        xhttp.send();
    }
    else {
        MakeSkids(skids);
    }


}

update();