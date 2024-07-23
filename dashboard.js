// // fetching songs from pritam folder
// async function getsongs(){
    
//     let a = await fetch("http://127.0.0.1:3000/pritam/");
//     let response = await a.text();
//     console.log(response);  //receiving op in the form of table

//     let div = document.createElement("div");
//     div.innerHTML = response;  // Corrected this line

//     document.body.appendChild(div);  // Append div to the document

//     let tds = div.getElementsByTagName("td");
//     console.log(tds.length);  // Log the number of td elements
//     console.log(tds);

//     //href m song
//     let as=div.getElementsByTagName("a")
//     let songs=[]  //empty array which stores songlist
//     for(let index=0; index<as.length;index++){
//         const element=as[index];
//         if(element.href.endsWith("mp3")){
//             songs.push(element.href)
//         }
//     }
//     // console.log(songs);
//     return(songs); //receiving list of songs by href
// };
// async function main(){  //getting  list of all songs from pritam folder
// let songs=await getsongs();
// console.log(songs);

// }
// main(); 

// //playing songs
// var audio=new Audio(songs[0]);
// audio.play();
// // browser audio play ki permission play pause icon se hi deta h
// audio.addEventListener("loadeddata",()=>{
//     let duration=audio.duration
//     console.log(duration)
//     //duration var holds the duration (in seconds) of audio clip
// })
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

    // href m song
    // let as = div.getElementsByTagName("a");
    // let songs = [];  // empty array which stores songlist
    // for (let index = 0; index < as.length; index++) {
    //     const element = as[index];
    //     if (element.href.endsWith("mp3")) {
    //         songs.push(element.href);
    //     }
    // }

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
    // console.log(songs);
    return songs; // receiving list of songs by href
}

// async function main() {  // getting list of all songs from pritam folder
//     let songs = await getsongs();
//     console.log(songs);

//     let songUL= document.querySelector(".songcard").getElementsByTagName("ul");  //queryselector: selects elements : songcard-->html library class
//     for (const song of songcard) {
//         songUL.innerHTML=songUL.innerHTML + song;        //appending songs in songUL
//     }

//     // playing songs
//     var audio = new Audio(songs[0]);
//     audio.play();

//     // browser audio play ki permission play pause icon se hi deta h
//     audio.addEventListener("loadeddata", () => {
//         let duration = audio.duration;
//         console.log(audio.duration, audio.currentSrc, audio.currentTime, );
//         // duration var holds the duration (in seconds) of audio clip
//         console.log(duration)
//     });
// }

// main();

async function main() {
    try {
        let songs = await getsongs();  // Fetch songs from server
        console.log(songs);

        let songUL = document.querySelector(".songcard ul");  // Select the <ul> inside .songcard

        // Clear any existing content in songUL
        songUL.innerHTML = '';

        // Iterate over each song data received
        // songs.forEach(song => {
        //     let li = document.createElement("li");
        //     li.textContent = song.name;  // Adjust according to your actual song data structure
        //     songUL.appendChild(li);  // Append each song data as a list item
            
            
        // });
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
        if(songs.length>0){
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
