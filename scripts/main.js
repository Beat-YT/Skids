function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}

function MakeSkids(array) {
    array.forEach(element => {
        var skidprofile = document.createElement('div')
        skidprofile.classList.add("pepega")
        skidprofile.id = element.uid
        var SkidPFP = document.createElement('img')
        if (element.avatar != null) {
            SkidPFP.src = `https://cdn.discordapp.com/avatars/${element.uid}/${element.avatar}.png?size=128`
        } else {
            SkidPFP.src = "https://cdn.discordapp.com/attachments/789297675790974996/819701180203794432/dd4dbc0016779df1378e7812eabaa04d.png?size=128"
        }
        SkidPFP.id = `PFP_${element.uid}`
        SkidPFP.onerror = function() {
            document.getElementById(`PFP_${element.uid}`).src = "https://cdn.discordapp.com/attachments/789297675790974996/819701180203794432/dd4dbc0016779df1378e7812eabaa04d.png?size=128"
        }
        //<img src="img_avatar.png" alt="Avatar" style="width:200px">
        var skidName = document.createElement('SkidUserName')
        skidName.innerText = element.tag
        skidprofile.appendChild(SkidPFP)
        skidprofile.appendChild(document.createElement('br'))
        skidprofile.appendChild(document.createElement('br'))
        skidprofile.appendChild(skidName)

        if (getQueryVariable("ShowId")) {
            var IdDoc = document.createElement('p')
            IdDoc.innerText = "Id:" + element.uid;
            skidprofile.appendChild(IdDoc)
        }

        document.getElementById('skids').appendChild(skidprofile)
    });
}

if (getQueryVariable("ShowId")) {
    document.getElementById("ShowIdthing").checked = true;
}

var skidFiter = getQueryVariable("skid") || getQueryVariable("skids") || getQueryVariable("name");

if (skidFiter) {
    document.getElementById("SkidFilter").value = skidFiter
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", "https://raw.githubusercontent.com/Beat-YT/Skids/main/skids.json", false);
    xhttp.send();


    if (xhttp.readyState == 4 && xhttp.status == 200) {
        var FilteredSkids = JSON.parse(xhttp.responseText).filter(x => x.tag.startsWith(skidFiter) || x.tag.startsWith(skidFiter.toUpperCase()) || x.tag.startsWith(skidFiter.toLocaleLowerCase()))
        if (!FilteredSkids[0]) {
            var NoResult = document.createElement('p');
            NoResult.innerText = "Found no result"
            document.getElementById('skids').appendChild(document.createElement('br'))
            document.getElementById('skids').appendChild(document.createElement('br'))

            document.getElementById('skids').appendChild(NoResult)
        }
        MakeSkids(FilteredSkids);
    } else {
        alert(xhttp.status + " " + xhttp.statusText);
    }

} else if (getQueryVariable("skidId")) {
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", "https://raw.githubusercontent.com/Beat-YT/Skids/main/skids.json", false);
    xhttp.send();


    if (xhttp.readyState == 4 && xhttp.status == 200) {
        var FilteredSkids = JSON.parse(xhttp.responseText).filter(x => x.uid == getQueryVariable("skidId"))
        if (!FilteredSkids[0]) {
            var NoResult = document.createElement('p');
            NoResult.innerText = "Found no result"
            document.getElementById('skids').appendChild(document.createElement('br'))
            document.getElementById('skids').appendChild(document.createElement('br'))

            document.getElementById('skids').appendChild(NoResult)
        }

        MakeSkids(FilteredSkids);
    } else {
        alert(xhttp.status + " " + xhttp.statusText);
    }

} else {


    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            MakeSkids(JSON.parse(xhttp.responseText));
        }
    };
    xhttp.open("GET", "https://raw.githubusercontent.com/Beat-YT/Skids/main/skids.json", true);
    xhttp.send();
}
