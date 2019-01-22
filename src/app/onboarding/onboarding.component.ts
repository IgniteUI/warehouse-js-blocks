import { Component, OnInit } from "@angular/core";
import { trigger, state, style, animate, transition } from "@angular/animations";
import { Router } from "@angular/router";

import { TranslateService, LangChangeEvent } from "@ngx-translate/core";

// this parameter (in percents) defines how much the mouse should be dragged
// compared to the current browser width in order for a slide to be switched
const slideSwitchTreshold: number = 30; // default - 30%

@Component({
  selector: "app-onboarding",
  templateUrl: "./onboarding.component.html",
  styleUrls: ["./onboarding.component.css"],
  animations: [
    trigger("swipeLeftRightAnimation", [
      state("left",   style( { left: "-20%", opacity: "0" } )), // 0 - positioned left (outside of the screen)
      state("center", style( { left: "50%", opacity: "1" } ) ), // 1 - positioned center (inside the screen)
      state("right",  style( { left: "120%", opacity: "0" } ) ), // 2 - positioned right (outside of the screen)
      state("move",   style( {} )  ), // 3 - this state is when partially dragged with the mouse

      transition("left => center", animate("{{speed}} ease-out")),
      transition("right => center", animate("{{speed}} ease-out")),
      transition("center => left", animate("{{speed}} ease-out")),
      transition("center => right", animate("{{speed}} ease-out")),

      transition("move => center", animate("{{speed}} ease-out")),
      transition("move => left", animate("{{speed}} ease")),
      transition("move => right", animate("{{speed}} ease")),
      transition("left <=> right", animate("5ms ease")),
    ]),
  ]
})
export class OnboardingComponent implements OnInit {

  isUserDown: boolean = false;
  inSlideSwitchingAnimation: boolean = false;
  animationCounter: number = 0;

  userDownInitialX: number;
  userDownInitialY: number;
  mouseDeltaX: number;

  // 0 - moved to the left (outside the of screen), 1 - center (on screen), 2 - moved to the right (outside of the screen)
  currentSlideState: number = 1;
  currentSlideIndex: number = 0;
  currentSlideInfo: VisibleSlideInfo = new VisibleSlideInfo();

  slides: Array<SlideInfo> = new Array<SlideInfo>();
  leftButtonText: string;
  rightButtonText: string;

  constructor(private router: Router, private translate: TranslateService) {
    // internationalization
    translate.addLangs(["en", "jp"]);
    translate.setDefaultLang("en");
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|jp/) ? browserLang : "en");
    //translate.use("jp");
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.generateSlidesData();
      this.setCurrentSlide(this.slides[this.currentSlideIndex]);
    });
  }

  ngOnInit() {
  }

  get getCurrentSlideState() {
    switch (this.currentSlideState) {
      case 0: return "left";
      case 1: return "center";
      case 2: return "right";
      case 3: return "move";
    }
    console.log("!!! Unknow slide state !!!");
  }



  // handling the mouse down and touch start events

  mouseDownHandler(args) {
    this.userDownHandler(args.clientX, args.clientY);
  }

  touchStartHandler(args) {
    this.userDownHandler(args.touches[0].clientX, args.touches[0].clientY);
  }

  userDownHandler(x: number, y: number) {
    this.isUserDown = true;
    this.userDownInitialX = x;
    this.userDownInitialY = y;
  }



  // handling the mouse move and touch move events

  mouseMoveHandler(args) {
    this.userMoveHandler(args.clientX, args.clientY);
  }

  touchMoveHandler(args) {
    this.userMoveHandler(args.touches[0].clientX, args.touches[0].clientY);
  }

  userMoveHandler(x: number, y: number) {
    if (!this.isUserDown) {
      return;
    }
    if (this.currentSlideState !== 3) {
      this.currentSlideState = 3;
    }

    // calculate mouse movement since mouse down
    this.mouseDeltaX = x - this.userDownInitialX;

    // calculate how much the mouse has moved compared to the screen width in percents
    let percentageMoved: number = Math.abs(this.mouseDeltaX) * 100 / this.getBrowserRenderWidth();

    if (this.mouseDeltaX < 0) {
      percentageMoved = -percentageMoved;
    }

    // calculate left value (in percent) for each layer depending on
    // how far the mouse has been moved and each layer's individual accelaration
    this.currentSlideInfo.image1Left = Math.round(50 + percentageMoved * this.currentSlideInfo.image1Acceleration) + "%";
    this.currentSlideInfo.image2Left = Math.round(50 + percentageMoved * this.currentSlideInfo.image2Acceleration) + "%";
    this.currentSlideInfo.image3Left = Math.round(50 + percentageMoved * this.currentSlideInfo.image3Acceleration) + "%";
    this.currentSlideInfo.slideTitleLeft = Math.round(50 + percentageMoved * this.currentSlideInfo.slideTitleAcceleration) + "%";
    this.currentSlideInfo.slideTextLeft = Math.round(50 + percentageMoved * this.currentSlideInfo.slideTextAcceleration) + "%";

    // calculate the opacity for all layers based on how far the mouse has been moved
    const opacityValue = (1 - Math.abs(percentageMoved) / 100).toString();
    this.currentSlideInfo.image1Opacity = opacityValue;
    this.currentSlideInfo.image2Opacity = opacityValue;
    this.currentSlideInfo.image3Opacity = opacityValue;
    this.currentSlideInfo.slideTitleOpacity = opacityValue;
    this.currentSlideInfo.slideTextOpacity = opacityValue;

  }



  // handling the mouse up and touch end events
  mouseUpHandler(args) {
    this.userUpHandler();
  }

  touchEndHandler(args) {
    this.userUpHandler();
  }

  userUpHandler() {
    this.isUserDown = false;

    const percentageMoved = Math.abs(this.mouseDeltaX) * 100 / this.getBrowserRenderWidth();

    // checking if the slide switch treshold has been reached
    if (percentageMoved > slideSwitchTreshold) {
      // slide switch treshold reached - check pan/swipe direction
      if (this.mouseDeltaX < 0) {
        // left - next slide
        if (this.currentSlideIndex < 3) {
          this.animationCounter = 0;
          this.inSlideSwitchingAnimation = true;
          this.currentSlideState = 0; // animate content to left and switch to next slide
        } else {
          this.currentSlideState = 1; // last slide reached - get back current slide
        }
      } else {
        // right - previous slide
        if (this.currentSlideIndex > 0) {
          this.animationCounter = 0;
          this.inSlideSwitchingAnimation = true;
          this.currentSlideState = 2; // animate content to right and switch to previous slide
        } else {
          this.currentSlideState = 1; // first slide reached - get back to current slide
        }
      }
    } else {
      // slide switch treshold not reached - switching the current slide back to state 1 (center) from 3 (move)
      this.currentSlideState = 1;
    }
  }



  // handling the mouse out event
  mouseOutHandler(args) {
    if (this.isUserDown === true) {
      this.userUpHandler();
    }
  }



  // used to switch to previous slide programmatically
  invokePrev() {
    if (this.inSlideSwitchingAnimation) return;
    if (this.currentSlideIndex > 0) {
      // animate content to right and switch to previous slide
      this.inSlideSwitchingAnimation = true;
      this.animationCounter = 0;
      this.currentSlideState = 2; // animate content to right
    }
  }

  // used to switch to next slide programmatically
  invokeNext() {
    if (this.inSlideSwitchingAnimation) return;
    if (this.currentSlideIndex < 3) {
      // animate content to left and switch to next slide
      this.inSlideSwitchingAnimation = true;
      this.animationCounter = 0;
      this.currentSlideState = 0; // animate content to left
    }
  }

  invokeLeftButton() {
    this.router.navigateByUrl("/board");
  }

  invokeRightButton() {
    if (this.currentSlideIndex < 3) {
      this.invokeNext();
    } else {
      this.router.navigateByUrl("/board");
    }
  }



  // used to trigger several animation one after another
  swipeAnimationFinished(ev) {
    this.animationCounter++;
    if (this.animationCounter == 5) {
      if (this.currentSlideState == 0) {
        // if the animation has just moved all components to the left
        // move them instantly to the right
        this.currentSlideState = 2;
      } else
      if (this.currentSlideState == 2) {
        // if the animation has just moved all components to the right
        // move them instantly to the left
        this.currentSlideState = 0;
      } else {
        this.animationCounter = 0;
      }
    }

    if (this.animationCounter == 10) {
      if (this.currentSlideState == 0) {
        // move to previous slide
        this.currentSlideIndex--;
        // add the content of the new slide in the visual elements
        this.setCurrentSlide(this.slides[this.currentSlideIndex]);
        // animate the new content to the center of the screen;
        this.currentSlideState = 1;
      } else
      if (this.currentSlideState == 2) {
        // move to next slide
        this.currentSlideIndex++;
        // add the content of the new slide in the visual elements
        this.setCurrentSlide(this.slides[this.currentSlideIndex]);
        // animate the new content to the center of the screen;
        this.currentSlideState = 1;
      }
    }

    if (this.animationCounter == 15) {
      this.inSlideSwitchingAnimation = false;
    }
  }



  getBrowserRenderWidth() {
    return Math.max(
      window.innerWidth,
      document.body.scrollWidth,
      document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  }



  // set the "currentSlideInfo" with the values from the "newSlide" argument
  setCurrentSlide(newSlide: SlideInfo) {
    this.currentSlideInfo.image1Path = newSlide.image1Path;
    this.currentSlideInfo.image1Opacity = "";
    this.currentSlideInfo.image1Acceleration = newSlide.image1Acceleration;

    this.currentSlideInfo.image2Path = newSlide.image2Path;
    this.currentSlideInfo.image2Opacity = "";
    this.currentSlideInfo.image2Acceleration = newSlide.image2Acceleration;

    this.currentSlideInfo.image3Path = newSlide.image3Path;
    this.currentSlideInfo.image3Opacity = "";
    this.currentSlideInfo.image3Acceleration = newSlide.image3Acceleration;

    this.currentSlideInfo.slideTitle = newSlide.slideTitle;
    this.currentSlideInfo.slideTitleOpacity = "";
    this.currentSlideInfo.slideTitleAcceleration = newSlide.slideTitleAcceleration;

    this.currentSlideInfo.slideText = newSlide.slideText;
    this.currentSlideInfo.slideTextOpacity = "";
    this.currentSlideInfo.slideTextAcceleration = newSlide.slideTextAcceleration;

    this.currentSlideInfo.slideDotsImagePath = newSlide.slideDotsImagePath;

    switch (this.currentSlideIndex) {
      case 0:
        this.translate.get("btnSkip").subscribe((res: string) => { this.leftButtonText = res; });
        this.translate.get("btnNext").subscribe((res: string) => { this.rightButtonText = res; });
        break;
      case 1:
        this.translate.get("btnSkip").subscribe((res: string) => { this.leftButtonText = res; });
        this.translate.get("btnNext").subscribe((res: string) => { this.rightButtonText = res; });
        break;
      case 2:
        this.translate.get("btnSkip").subscribe((res: string) => { this.leftButtonText = res; });
        this.translate.get("btnNext").subscribe((res: string) => { this.rightButtonText = res; });
        break;
      case 3:
        this.leftButtonText = "";
        this.translate.get("btnGotIt").subscribe((res: string) => { this.rightButtonText = res; });
        break;
    }
  }



  // generates the slides' data
  generateSlidesData() {
    const slide1 = new SlideInfo();
    slide1.image1Path = "../../assets/images/onboarding/slide1_circle.png";
    slide1.image1Acceleration = 0.6;
    slide1.image2Path = "../../assets/images/onboarding/slide1_pluses.png";
    slide1.image2Acceleration = 0.8;
    slide1.image3Path = "../../assets/images/onboarding/slide1_roger.png";
    slide1.image3Acceleration = 1.0;
    slide1.slideTitle = this.translate.instant("slide1Title");
    slide1.slideTitleAcceleration = 0.8;
    slide1.slideText = this.translate.instant("slide1Text");
    slide1.slideTextAcceleration = 0.6;
    slide1.slideDotsImagePath = "../../assets/images/onboarding/onboarding_dots1.png";
    this.slides.push(slide1);

    const slide2 = new SlideInfo();
    slide2.image1Path = "../../assets/images/onboarding/slide2_circle.png";
    slide2.image1Acceleration = 0.6;
    slide2.image2Path = "../../assets/images/onboarding/slide2_pluses.png";
    slide2.image2Acceleration = 0.8;
    slide2.image3Path = "../../assets/images/onboarding/slide2_big_plus.png";
    slide2.image3Acceleration = 1.0;
    slide2.slideTitle = this.translate.instant("slide2Title");
    slide2.slideTitleAcceleration = 0.8;
    slide2.slideText = this.translate.instant("slide2Text");
    slide2.slideTextAcceleration = 0.6;
    slide2.slideDotsImagePath = "../../assets/images/onboarding/onboarding_dots2.png";
    this.slides.push(slide2);

    const slide3 = new SlideInfo();
    slide3.image1Path = "../../assets/images/onboarding/slide3_circle.png";
    slide3.image1Acceleration = 0.6;
    slide3.image2Path = "../../assets/images/onboarding/slide3_pluses.png";
    slide3.image2Acceleration = 0.8;
    slide3.image3Path = "../../assets/images/onboarding/slide3_lamp.png";
    slide3.image3Acceleration = 1.0;
    slide3.slideTitle = this.translate.instant("slide3Title");
    slide3.slideTitleAcceleration = 0.8;
    slide3.slideText = this.translate.instant("slide3Text");
    slide3.slideTextAcceleration = 0.6;
    slide3.slideDotsImagePath = "../../assets/images/onboarding/onboarding_dots3.png";
    this.slides.push(slide3);

    const slide4 = new SlideInfo();
    slide4.image1Path = "../../assets/images/onboarding/slide4_circle.png";
    slide4.image1Acceleration = 0.6;
    slide4.image2Path = "../../assets/images/onboarding/slide4_pluses.png";
    slide4.image2Acceleration = 0.8;
    slide4.image3Path = "../../assets/images/onboarding/slide4_cup.png";
    slide4.image3Acceleration = 1.0;
    slide4.slideTitle = this.translate.instant("slide4Title");
    slide4.slideTitleAcceleration = 0.8;
    slide4.slideText = this.translate.instant("slide4Text");
    slide4.slideTextAcceleration = 0.6;
    slide4.slideDotsImagePath = "../../assets/images/onboarding/onboarding_dots4.png";
    this.slides.push(slide4);
  }

}



// This class holds the static information for a "slide" from the onboarding slides pack.
// There will be an instance of this class for each slide
export class SlideInfo {
  image1Path: string;
  image1Acceleration: number;
  image2Path: string;
  image2Acceleration: number;
  image3Path: string;
  image3Acceleration: number;
  slideTitle: string;
  slideTitleAcceleration: number;
  slideText: string;
  slideTextAcceleration: number;
  slideDotsImagePath: string;
}



// This class holds the dynamic information of the visible slide.
// In addition to the "SlideInfo" class this class also has the current opacity level and the left positioning.
// With the current implementation there will be one single instance of this class.
export class VisibleSlideInfo {
  image1Path: string;
  image1Left: string;
  image1Opacity: string;
  image1Acceleration: number;

  image2Path: string;
  image2Left: string;
  image2Opacity: string;
  image2Acceleration: number;

  image3Path: string;
  image3Left: string;
  image3Opacity: string;
  image3Acceleration: number;

  slideTitle: string;
  slideTitleLeft: string;
  slideTitleOpacity: string;
  slideTitleAcceleration: number;

  slideText: string;
  slideTextLeft: string;
  slideTextOpacity: string;
  slideTextAcceleration: number;

  slideDotsImagePath: string;
}
