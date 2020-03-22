import React, { useRef, useEffect } from "react";
import "./App.scss";
import People from "./images/people.webp";
import Back from "./images/back.jpg";
import { TimelineLite, Power2, Power1 } from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";

const App = () => {
  let image = useRef(null);
  let container = useRef(null);
  let title = useRef(null);
  let imageRevealOne = CSSRulePlugin.getRule(".img-container:after");
  // let imageRevealTwo = CSSRulePlugin.getRule(".img-container:before");
  let mainReveal = CSSRulePlugin.getRule(".main:before");

  let tl = new TimelineLite();

  useEffect(() => {
    tl.to(container, 0, { css: { visibility: "visible" } });
    tl.to(mainReveal, 1.5, {
      width: "100%",
      ease: Power1.easeInOut
      // transform: "skewX(10deg)",
      // delay: 0.5
    });
    // tl.to(
    //   ".main",
    //   0,
    //   {
    //     transform: "skewX(-10deg)"
    //   },
    //   "-=1.5"
    // );
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
    // tl.to(imageRevealOne, 2, {
    //   width: "0%",
    //   ease: Power2.easeInOut
    // });
    // tl.from(imageRevealTwo, 2, { width: "100%", ease: Power2.easeInOut });
    // tl.set(imageRevealOne, { opacity: 1 }, "+=4");
    tl.from(
      image,
      3.5,
      {
        scale: 1.6,
        ease: Power2.easeInOut
        // opacity: 0
        // delay: -1
      },
      "-=5"
    );
    tl.to(
      imageRevealOne,
      0,
      {
        opacity: 1,
        delay: 2
      },
      "-=3"
    );
    tl.to(imageRevealOne, 2, {
      opacity: 1,
      width: "0%",
      ease: Power2.easeInOut
    });
    // tl.from(imageRevealOne, 2, { opacity: 1 }, "+=5");
  });

  return (
    <>
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
                alt="People"
              />
            </div>
          </>
        </div>
      </section>
      <div>
        <h1 className="title" ref={el => (title = el)}>
          La Jazzinière
        </h1>
      </div>
    </>
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
