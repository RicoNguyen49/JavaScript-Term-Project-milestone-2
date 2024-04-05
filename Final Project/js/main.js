document.getElementById("Home").addEventListener("mouseover",function(){
    document.getElementById("content").innerHTML="<p>Welcome to the retro Arcade</p><p>select a game by clicking on the name or hover over the name for the description.</p>";
})
document.getElementById("tictac").addEventListener("mouseover",function(){
    document.getElementById("content").innerHTML="<p>Tic-Tac-Toe</p><p>The classic childhood game with a twist, This game requires two players to play against each other.</p><p>players can decide how much is in the pot and the winner from best out of 3 rounds wins the whole pot. </p>";
})
document.getElementById("SpaceExplore").addEventListener("mouseover",function(){
    document.getElementById("content").innerHTML="<p>Space Shooter</p><p>defend our planet from space invators. destroy all the alien space ship to secure a future for our planet.</p>";
})
document.getElementById("dreamHouse").addEventListener("mouseover",function(){
    document.getElementById("content").innerHTML="<p>Dream house</p><p>Drag and drop items to build your dream house. be creative and explore different layouts for your dream home. </p>";
})
document.getElementById("readme").addEventListener("mouseover",function(){
    document.getElementById("content").innerHTML="<p>Read Me</p><p>click on read me to display game descriptions, list of files, copyright, and contact information. </p>";
})
document.getElementById("readme").addEventListener("click",function(){              
    window.open("ReadMe.txt","readme","height=600","width=600","menubar=1","scrollbars=1","status=1","toolbar=1","titlebar=1");
})
