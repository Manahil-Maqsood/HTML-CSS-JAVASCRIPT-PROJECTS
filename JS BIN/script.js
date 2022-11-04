$(document).ready(function () {
  //Focus Boxes onload
  const prefocus = () => {
    window.onload = () => {
      $("#html-Box").focus();
      setCaretToPos(document.getElementById("html-Box"), 147);
    };
  };
  prefocus();

  //function to set cursor position
  function setSelectionRange(input, selectionStart, selectionEnd) {
    if (input.setSelectionRange) {
      input.focus();
      input.setSelectionRange(selectionStart, selectionEnd);
    } else if (input.createTextRange) {
      var range = input.createTextRange();
      range.collapse(true);
      range.moveEnd("character", selectionEnd);
      range.moveStart("character", selectionStart);
      range.select();
    }
  }
  function setCaretToPos(input, pos) {
    setSelectionRange(input, pos, pos);
  }

  //Set width Active Boxes
  const widthActiveBoxes = (activeBoxes) => {
    let totalWidth = parseFloat($(".inputOutput").width());
    let boxesWidth = parseFloat(totalWidth / activeBoxes.length);
    $(".box").width(boxesWidth);
  };

  //Logic Box
  const LogicBox = () => {
    var activeBoxes = [];
    let AllButtons = $(".buttons").children();

    Array.from(AllButtons).forEach((e) => {
      let className = "." + $(e).attr("id");
      let Box = document.querySelector(className);
      if (Box.classList.contains("show")) {
        activeBoxes.push(className);
      }
      if (activeBoxes.length > 0) {
        widthActiveBoxes(activeBoxes);
      }

      e.addEventListener("click", () => {
        $(e).toggleClass("button-active button-link");

        if (Box.classList.contains("hide")) {
          $(className).addClass("show").removeClass("hide");
          $(`${className} textarea`).focus();
          activeBoxes.push(className);
        } else if (Box.classList.contains("show")) {
          $(className).addClass("hide").removeClass("show");
          activeBoxes.splice($.inArray(className, activeBoxes), 1);
        }

        if (activeBoxes.length > 0) {
          widthActiveBoxes(activeBoxes);
        }
      });
    });
  };
  LogicBox();

  const outPutLogic = () => {
    let defaultValue =
      "<!DOCTYPE html>" +
      "\n" +
      "<html>" +
      "\n" +
      "<head>" +
      "\n" +
      '<meta charset="utf-8">' +
      "\n" +
      '<meta name="viewport" content="width=device-width">' +
      "\n" +
      "<title>Mini JS Bin</title>" +
      "\n" +
      "</head>" +
      "\n" +
      "<body>" +
      "\n" +
      "\n" +
      "</body>" +
      "\n" +
      "</html>";
    document.getElementById("html-Box").defaultValue = defaultValue;

    var doc = document.getElementById("output-Box").contentWindow.document;
    doc.open();
    doc.write(
      "<html><head><title></title><style type='text/css'></style></head><body><h4 style='font-family: Roboto, sans-serif; font-size: 15px; color: gray;'>Output</h4><div id='inlineIframe'></div></body></html>"
    );
    doc.close();

    $("textarea").on("change keyup paste click", () => {
      $("#output-Box")
        .contents()
        .find("head")
        .find("style")
        .html($("#css-Box").val());
      $("#output-Box")
        .contents()
        .find("body")
        .find("#inlineIframe")
        .html($("#html-Box").val());

      document
        .getElementById("output-Box")
        .contentWindow.eval($("#javascript-Box").val());
    });
  };
  outPutLogic();

  //Resizer
  const resizerLogic = () => {
    // The current position of mouse
    let x = 0;
    let y = 0;
    let firstBoxWidth = 0;
    let secondBoxWidth = 0;

    let AllResizer = document.querySelectorAll(".resizer");
    var parentElement = "";
    var nextParentElement = "";
    let resizer = [];
    Array.from(AllResizer).forEach((e) => {
      resizer.push($(e).attr("id"));
    });
    // console.log(Id);

    // Handle the mousedown event
    resizer.forEach((element) => {
      $("#" + element).mousedown((e) => {
        document.getElementById("output-Box").style.pointerEvents = "none";
        let hoverElement = document.getElementById(element).parentNode;
        parentElement = hoverElement;
        var nextElementSiblings = [];
        while ((hoverElement = hoverElement.nextElementSibling)) {
          nextElementSiblings.push(hoverElement);
        }

        nextElementSiblings.every((elem) => {
          if (elem.classList.contains("show")) {
            nextParentElement = elem;
            return false;
          }
          return true;
        });

        console.log(e);
        console.log(parentElement);
        console.log(nextParentElement);

        x = e.clientX;
        y = e.clientY;

        firstBoxWidth = parentElement.getBoundingClientRect().width;
        secondBoxWidth = nextParentElement.getBoundingClientRect().width;

        // Attach the listeners to `document`
        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);
      });
    });

    const mouseMoveHandler = (e) => {
      // How far the mouse has been moved
      const dx = e.clientX - x;
      const dy = e.clientY - y;

      const fullWidth = parentElement.parentNode.getBoundingClientRect().width;
      // const fullWidth = firstBoxWidth + secondBoxWidth;

      const plusIncreaseParentWidth = ((firstBoxWidth + dx) * 100) / fullWidth;
      const minusIncreaseParentWidth =
        ((secondBoxWidth - dx) * 100) / fullWidth;
      parentElement.style.width = `${plusIncreaseParentWidth}vw`;
      nextParentElement.style.width = `${minusIncreaseParentWidth}vw`;
    };

    const mouseUpHandler = (e) => {
      // Remove the handlers of `mousemove` and `mouseup`
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);

      document.getElementById("output-Box").style.pointerEvents = "auto";
    };
  };
  resizerLogic();
});
