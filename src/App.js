import React, { useRef, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Jazz from "./Components/Jazz";
import Contact from "./Components/Contact";
import "./App.scss";
import People from "./images/people.webp";
import { TimelineLite, Power1, Power2 } from "gsap";
import { CSSTransition } from "react-transition-group";
import CSSRulePlugin from "gsap/CSSRulePlugin";

const routes = [
  { path: "/contact", name: "Contact", Component: Contact },
  { path: "/jazz", name: "Jazz", Component: Jazz }
];

const onEnter = node => {
  let tl = new TimelineLite();
  console.log("onEnter Element : ", document.body.querySelector(".main"));
  let main = document.body.querySelector(".main:after");
  let p = CSSRulePlugin.getRule(".main p");

  tl.to(main, 1, { width: "100%" });
  tl.fromTo(
    p,
    1.5,
    { transform: "translate(-200px)" },
    { opacity: 1, x: "500px", transform: "translate(200px)" }
  );
  tl.to(p, 1, { opacity: 0, transform: "translate(600px)", delay: 1 });
  tl.to(main, 0, { transform: "scale(2)" });
  tl.to(
    main,
    1.5,
    {
      right: "-500px",
      width: "0%",
      transform: "skewX(2deg)",
      height: "200%",
      ease: Power2.easeOut
    },
    "-=1"
  );
};

const onExit = node => {
  console.log("onExit Element : ", node);
  let tl = new TimelineLite();
  console.log("ON EXIT", node);
};

const App = () => {
  let image = useRef(null);
  let container = useRef(null);
  let imageReveal = CSSRulePlugin.getRule(".img-container:after");
  let mainReveal = CSSRulePlugin.getRule(".main:after");
  let pReveal = CSSRulePlugin.getRule(".main p");

  let tl = new TimelineLite();

  useEffect(() => {
    tl.to(mainReveal, 1, { width: "100%" });
    tl.fromTo(
      pReveal,
      1.5,
      { transform: "translate(-200px)" },
      { opacity: 1, x: "500px", transform: "translate(200px)" }
    );
    tl.to(pReveal, 1, { opacity: 0, transform: "translate(600px)", delay: 1 });
    tl.to(mainReveal, 0, { transform: "scale(2)" });
    tl.to(
      mainReveal,
      1.5,
      {
        right: "-500px",
        width: "0%",
        transform: "skewX(2deg)",
        height: "200%",
        ease: Power2.easeOut
      },
      "-=1"
    );

    tl.to(container, 0, { css: { visibility: "visible" } });
    tl.to(mainReveal, 1.5, {
      width: "100%",
      ease: Power1.easeInOut,
      delay: 0.5
    });
    tl.to(".title", 0.2, {
      // display: "block",
      opacity: 1
    });
    tl.from(".title", 1, {
      // display: "block !important",
      // delay: 0.8,
      ease: "power3.out",
      // y: 64,
      height: "15px",
      zIndex: 9999
    });
    tl.to(mainReveal, 2, {
      left: "0px",
      width: "0%",
      ease: Power2.easeInOut,
      delay: 1
    });
    tl.to(".title", 1, {
      opacity: 0,
      ease: "power3.out",
      delay: -2
    });
  });

  return (
    <Router>
      <CSSTransition
        in={true}
        timeout={1200}
        classNames="page"
        onExit={onExit}
        onEntering={onEnter}
        unmountOnExit
      >
        <section className="main">
          <p>GSAP IMAGE REVEAL</p>
          <div className="container" ref={el => (container = el)}>
            <>
              <div className="img-container">
                <img
                  ref={el => {
                    image = el;
                  }}
                  src={People}
                  alt="alt"
                />
              </div>
              <button
                className="btn btn-jazz"
                onClick={onEnter}
                onMouseLeave={onExit}
              >
                <Route path="/jazz" component={Jazz} className="jazz">
                  Voir la culture
                </Route>
              </button>
            </>
          </div>
        </section>
      </CSSTransition>
    </Router>
  );
};

export default App;

// tl.to(imageRevealOne, 2, { width: "0%", ease: Power2.easeInOut });
// tl.from(imageRevealTwo, 2, { width: "100%", ease: Power2.easeInOut });
// tl.from(
//   image,
//   3.5,
//   {
//     scale: 1.6,
//     ease: Power2.easeInOut
//     // delay: -1
//   },
//   "-=5"
// );
// tl.from(imageRevealTwo, 1, { width: "100%", ease: Power2.easeInOut });
