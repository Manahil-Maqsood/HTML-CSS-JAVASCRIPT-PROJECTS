(function () {
  // Add onclick listener to start button
  start.addEventListener("click", () => {
    document.getElementById("start").disabled = true;
    document.querySelector(".container").style.pointerEvents = "auto";

    let audioTurn = new Audio("ting.wav");
    let gameOver = new Audio("gameover.wav");
    let gameDraw = new Audio("gameDraw.mp3");
    let turn = "X";
    let isGameOver = false;
    let isDraw = false;
    let boxValues = [];

    document.getElementsByClassName("info")[0].innerText =
      "Player " + turn + " turn";

    //function to change the turn
    const chnageTurn = () => {
      return turn === "X" ? "O" : "X";
    };

    //function to check win
    const checkWin = () => {
      let boxText = document.getElementsByClassName("boxText");
      let wins = [
        [0, 1, 2, 0, 5, 0],
        [3, 4, 5, 0, 15, 0],
        [6, 7, 8, 0, 25, 0],
        [0, 3, 6, -10, 15, 90],
        [1, 4, 7, 0, 15, 90],
        [2, 5, 8, 10, 15, 90],
        [0, 4, 8, 0, 15, 45],
        [2, 4, 6, 0, 15, 135],
      ];
      wins.forEach((e) => {
        if (
          boxText[e[0]].innerText === boxText[e[1]].innerText &&
          boxText[e[2]].innerText === boxText[e[1]].innerText &&
          boxText[e[0]].innerText !== ""
        ) {
          document.querySelector(".info").innerText =
            "Player with " + boxText[e[0]].innerText + "'s wins";
          isGameOver = true;
          gameOver.currentTime = 0;
          gameOver.play();
          document
            .querySelector(".imgBox")
            .getElementsByTagName("img")[0].style.width = "200px";
          document.querySelector(
            ".line"
          ).style.cssText = `width : 30vw; transform : translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg);`;
          document.querySelector(".container").style.pointerEvents = "none";
        }
      });
    };

    //isDraw check
    const checkDraw = () => {
      let AllBoxes = document.querySelectorAll(".boxText");
      Array.from(AllBoxes).forEach((element) => {
        boxValues.push(element.innerText);
      });
      if (boxValues.includes("")) {
        isDraw = false;
      } else if (!boxValues.includes("")) {
        isDraw = true;
      }
    };

    //Game Logic
    let boxes = document.getElementsByClassName("box");
    Array.from(boxes).forEach((element) => {
      element.addEventListener(
        "click",
        (working = () => {
          let boxText = element.querySelector(".boxText");
          if (boxText.innerText === "") {
            audioTurn.currentTime = 0;
            audioTurn.play();
            boxText.innerText = turn;
            turn = chnageTurn();
            checkWin();
            if (!isGameOver) {
              checkDraw();
              if (isDraw) {
                gameDraw.currentTime = 0;
                gameDraw.play();
                document.querySelector(
                  ".line"
                ).style.cssText = `width : 30vw; transform : translate(${0}vw, ${15}vw) rotate(${45}deg);`;

                document.querySelector(
                  ".drawLine"
                ).style.cssText = `width : 30vw; transform : translate(${0}vw, ${15}vw) rotate(${135}deg);`;

                document.getElementsByClassName("info")[0].innerText =
                  "It's a Draw. Try Again...";

                document.querySelector(".container").style.pointerEvents =
                  "none";
              } else if (!isDraw) {
                boxValues = [];
                document.getElementsByClassName("info")[0].innerText =
                  "Player " + turn + " turn";
              }
            }
          }
        })
      );
    });

    // Add onclick listener to reset button
    reset.addEventListener("click", () => {
      let boxTexts = document.querySelectorAll(".boxText");
      Array.from(boxTexts).forEach((element) => {
        element.innerText = "";
      });

      turn = "X";
      isGameOver = false;
      document.getElementsByClassName("info")[0].innerText =
        "Player " + turn + " turn";
      document
        .querySelector(".imgBox")
        .getElementsByTagName("img")[0].style.width = "0px";
      document.querySelector(".line").style.width = "0";
      document.querySelector(".drawLine").style.width = "0";
      document.querySelector(".container").style.pointerEvents = "auto";
      isDraw = false;
      boxValues = [];
    });
  });
})();
