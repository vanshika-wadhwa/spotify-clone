// rough.js
async function getsongs() {
    let a = await fetch("http://127.0.0.1:3000/pritam/");
    let response = await a.text();
    console.log(response);  // receiving op in the form of table

    let div = document.createElement("div");
    div.innerHTML = response;  // Corrected this line

    document.body.appendChild(div);  // Append div to the document

    let tds = div.getElementsByTagName("td");
    console.log(tds.length);  // Log the number of td elements
    console.log(tds);

    // Extract songs information from the table cells
    let songs = [];
    for (let i = 0; i < tds.length; i++) {
        const td = tds[i];
        let anchor = td.querySelector("a");
        if (anchor && anchor.href.endsWith(".mp3")) {
            songs.push({
                name: anchor.textContent.trim(),  // Extract song name
                url: anchor.href  // Extract song URL
            });
        }
    }

    return songs; // returning list of songs with names and urls
}

async function main() {
    try {
        let songs = await getsongs();  // Fetch songs from server
        console.log(songs);

        let songUL = document.querySelector(".songcard ul");  // Select the <ul> inside .songcard

        // Clear any existing content in songUL
        songUL.innerHTML = '';

        // Iterate over each song data received
        songs.forEach(song => {
            let li = document.createElement("li");

            // Create an anchor element for the song name and href
            let songLink = document.createElement("a");
            songLink.textContent = song.name;
            songLink.href = song.url;
            songLink.target = "_blank";  // Open link in a new tab

            // Append the anchor element to the list item
            li.appendChild(songLink);

            // Append the list item to the <ul>
            songUL.appendChild(li);
        });

        if (songs.length > 0) {
            var audio = new Audio(songs[0].url);  // Initialize Audio with the URL of the first song
            audio.play();  // Play the first song

            // Event listener to log audio duration
            audio.addEventListener("loadeddata", () => {
                console.log("Audio duration:", audio.duration);
            });
        }
    } catch (error) {
        console.error("Error fetching songs:", error);
    }
}

main();
