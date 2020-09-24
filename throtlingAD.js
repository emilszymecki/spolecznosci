var modal = document.createElement("div");
modal.id = "spolecznoscimodal";

var styleModal = {
  display: "none",
  position: "fixed",
  "z-index": "999999",
  left: "0",
  bottom: "0",
  width: "100%",
  height: "20%",
  overflow: " auto",
  "background-color": "green",
};

Object.keys(styleModal).forEach((x) => {
  modal.style[x] = styleModal[x];
});
document.body.prepend(modal);

var state = {
  open: false,
  mouseon: false,
  throotling: false,
};

var showHide = (bool) => {
  state.open = bool;
  if (state.open) {
    modal.style.display = "block";
  } else {
    modal.style.display = "none";
  }
};

var throttle = (func, limit) => {
  let inThrottle;
  //state.throotling = true
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      console.log("Start", state);
      state.throotling = true;
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
        state.throotling = false;
        setTimeout(() => {
          if (state.throotling == false && state.mouseon == false) {
            showHide(false);
          }
        }, 1000);
        console.log("Koniec", state);
      }, limit);
    }
  };
};

document.addEventListener(
  "scroll",
  throttle(function () {
    showHide(true);
  }, 2000)
);

document
  .querySelector("#spolecznoscimodal")
  .addEventListener("mouseenter", () => {
    state = {
      open: true,
      mouseon: true,
      throotling: true,
    };
    console.log(state);
  });

document
  .querySelector("#spolecznoscimodal")
  .addEventListener("mouseleave", () => {
    state = {
      open: false,
      mouseon: false,
      throotling: false,
    };
    setTimeout(() => showHide(false), 500);
    console.log(state);
  });
