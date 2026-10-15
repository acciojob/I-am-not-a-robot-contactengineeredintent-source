//your code here
let clickCount = 0;
const images = [
  { id: 1, src: "https://picsum.photos/id/237/200/300" },
  { id: 2, src: "https://picsum.photos/id/238/200/300" },
  { id: 3, src: "https://picsum.photos/id/239/200/300" },
  { id: 4, src: "https://picsum.photos/id/240/200/300" },
  { id: 5, src: "https://picsum.photos/id/241/200/300" },
];

let pic1Address = "";
let pic2Address = "";

//generating the random image
let randomIndex = Math.floor(Math.random() * images.length);
let duplicateImageIndex = images[randomIndex];
images.push(duplicateImageIndex);

//shuffling the images on reloading
function shuffle() {
  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
  }

  //putting images on the viewport
  for (let i = 0; i < images.length; i++) {
    let imageId = `img${i}`;
    // adding indentifier id to each image
    document.getElementById(imageId).dataset.imageId = images[i].id;
    document.getElementById(imageId).src = images[i].src;
  }
}
shuffle();

//image click functionality
let resetBtn = {};
let verifyBtn = {};
document.querySelectorAll(".imgSelector").forEach((image) => {
  image.addEventListener("click", (e) => {
    clickCount++;
    if (clickCount <= 2) {
      image.classList.add("border-danger");
    }
    if (clickCount == 1) {
      pic1Address = e.target.attributes[3].nodeValue;
      resetBtn = document.createElement("button");
      resetBtn.textContent = "Reset";
      resetBtn.classList.add("resetButton", "btn", "btn-primary", "w-100");
      document.querySelector("#resetSection").appendChild(resetBtn);
      
      //reset functionality
      document.querySelector(".resetButton").addEventListener("click", () => {
        location.reload();
      });
    }
    if (clickCount == 2) {
      resetBtn.remove();
      pic2Address = e.target.attributes[3].nodeValue;
      verifyBtn = document.createElement("button");
      verifyBtn.textContent = "Verify";
      document.querySelector("#verifySection").appendChild(verifyBtn);
      verifyBtn.classList.add("btn", "btn-danger", "w-100");
      verifyBtn.addEventListener("click", verifyImages);
    }
  });
});

//matching the user response
function verifyImages() {
  verifyBtn.remove();
  document.querySelector("#h").remove();
  if (pic1Address == pic2Address) {
    document.querySelector("#para").textContent =
      "You are a human. Congratulations!";
  } else {
    document.querySelector("#para").textContent =
      "We can't verify you as a human. You selected the non-identical tiles.";
  }
}
