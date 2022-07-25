import "react-pdf/dist/umd/Page/AnnotationLayer.css";
import React, { useRef } from "react";
import { pdfjs } from "react-pdf";
import PDFViewer from "./PDFViewer";
import Collapsible from "react-collapsible";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import Activity from "./ActivityHolder.js";
import Beats from "./Activities/SequencingVisionandLanguage/beat";
import Level5_LetterCharts from "./Activities/EyeMovements/Level5_LetterCharts";
import Level6_LetterCharts2 from "./Activities/EyeMovements/Level6_LetterCharts2";
import Level7_LetterCharts3 from "./Activities/EyeMovements/Level7_LetterCharts3";
import Level8_TheLongVowelSounds from "./Activities/SequencingVisionandLanguage/level8_TheLongVowelSounds";
import Level8_TheShortVowelSound from "./Activities/SequencingVisionandLanguage/Level8_TheShortVowelSound";
import Level9_TheVowelsWithR from "./Activities/SequencingVisionandLanguage/Level9_TheVowelsWithR";
import Level9_OtheraAndOSounds from "./Activities/SequencingVisionandLanguage/Level9_Othera&oSounds";
// import { FacebookAuthProvider } from "firebase/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, doc, getDoc, getDocs, query, where, setDoc } from "firebase/firestore"; 
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getAuth, signInWithPopup, FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider, PhoneAuthProvider } from "firebase/auth";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {loadStripe} from '@stripe/stripe-js';
import { json } from "body-parser";
// import {Routes, Route, useNavigate} from 'react-router-dom';


// const stripe = loadStripe('pk_test_51LE1u6FpIZcDi74lVvlPa54lILoezo9azohkMKEawNY0cgnTXdru5G6kcAX8VHPUrSMvKbb0RcHSH5lojRuH0nLa0079U3DvuH')



pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function HomePage() {
  var [Pdf, setPdf] = useState("piggybackHomePage.pdf");
  var [ActivityName, setActivityName] = useState("empty_activity");
  var [ActivityShown, setActivityShown] = useState(false);
  var [disable, setDisable] = useState(true);
  var [stopFunc, setStopFunc] = useState(0);
  var [signInView, setSignInView] = useState(true)
  var [copies, setCopies] = useState(1)
  var [gateway, setGateway] = useState(true)
  var [code, setCode] = useState()
  var [UID, setUID] = useState()
  var [exists, setExists] = useState(false)

  
  useEffect(() => {
    if (JSON.stringify(window.location.href).includes('canceled')) {
      window.location.href="http://localhost:3000"
    }
    else if (JSON.stringify(window.location.href).includes('success')) {
      postPurchasePage()
    } else {
      console.log("first time here")
    }

  }, [])

  // const CreateStripeCheckout = firebase.functions().httpsCallable('returnMessage');
  const firebaseConfig = {
    apiKey: "AIzaSyBBnitomGFqWPagp2JoLUQGaBVVnTLAqTg",
    authDomain: "piggyback-aa8c3.firebaseapp.com",
    projectId: "piggyback-aa8c3",
    storageBucket: "piggyback-aa8c3.appspot.com",
    messagingSenderId: "108254429034",
    appId: "1:108254429034:web:032017719ae8fd8973ef13",
    measurementId: "G-1PZ08H89VG"
  };
  const app = initializeApp(firebaseConfig);
  // const functions = getFunctions(app);

  
  const db = getFirestore(app);
  const auth = getAuth();

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can 
    signInSuccessUrl: '/',
    // We will display Goog 
    signInOptions: [
        GoogleAuthProvider.PROVIDER_ID,
        FacebookAuthProvider.PROVIDER_ID,
        TwitterAuthProvider.PROVIDER_ID,
        // PhoneAuthProvider.PROVIDER_ID,
  
    ],
    callbacks: {
      signInSuccessWithAuthResult(authResult) {
        let newuser = authResult.additionalUserInfo.isNewUser
        if (newuser) {
          // signInSuccess(authResult.user.uid)
          setUID(authResult.user.uid)
          createUser(authResult.user.uid, "")
          setSignInView(false)
        } else {
          // setSignInView(false) // Delete Before Finishing this Flow
          setUID(authResult.user.uid)
          setExists(true)
          DoesUserHaveLicense(authResult.user.uid)
        }
        
      }
    }
    };


    async function DoesUserHaveLicense(userID) {
      const q = query(collection(db, "users"), where("userID", "==", userID));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        let document = doc.data()
        if (document.license === "") {
          setSignInView(false)
        } else {
          setGateway(false)
        }
      });
    }

  async function signInSuccess() {
    try {
      const docRef = await addDoc(collection(db, "securityKey"), {
        used: true,
      });
      console.log("Security Key Document written with ID: ", docRef.id);
      return docRef.id
    } catch (e) {
      console.error("Error adding document: ", e);
      return null
    }
  }
  
  
  async function createUser(userID, docID) {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        license: docID,
        userID: userID,
      });
      console.log("User Document written with ID: ", docRef.id);
      // setSignInView(false)
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function checkLicenseCode() {
    const docRef = doc(db, "securityKey", code);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let document = docSnap.data()
      if (!document.used) {
        const q = query(collection(db, "users"), where("userID", "==", auth.currentUser.uid));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((docs) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(docs.id, " => ", docs.data());
          const cityRef = doc(db, 'users', docs.id);
          setDoc(cityRef, {
            license: code
          }, {merge: true})
        });
        setDoc(docRef, {
          used: true
        }, {merge: true})
        setGateway(false)
      } else {
        alert("This Code is Already In Use")
      }
    }
  }

  async function postPurchasePage() {
    let currentUrl = JSON.stringify(window.location.href);

    // locating the checkout session id before I added the quantity thing which I'll remove if I can figure this out
    let start = currentUrl.indexOf('session_id')
    let sessionid = currentUrl.slice(start + 11).slice(0, -1);
    console.log(sessionid)
    // to integrate later where I somehow verify that this checkout session exists
    // const session = await stripe.checkout.sessions.retrieve(
    //   JSON.stringify(sessionid)
    // );
    // console.log(session)


    // locating the number of copies
    let begin = currentUrl.indexOf("quantity");
    let end = currentUrl.indexOf("user_id")
    let amount = currentUrl.slice(begin + 9, end - 1)
    let numeric = JSON.parse(amount)
    if (numeric > 1) {
      console.log('greater')
      for (let i = 0; i < numeric; i++) {
        try {
          const docRef = await addDoc(collection(db, "securityKey"), {
            used: false,
          });
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    } else {
      console.log('function as usual.')
    }

    // locating the user id
    let place = currentUrl.indexOf('user_id')
    let user_id = currentUrl.slice(place + 8).slice(0, -1)
    
    const secKey = await signInSuccess();
    const q = query(collection(db, "users"), where("userID", "==", user_id));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((docs) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(docs.id, " => ", docs.data());
      const cityRef = doc(db, 'users', docs.id);
      setDoc(cityRef, {
        license: secKey
      }, {merge: true})
    });
    
  }


  function nextView(want) {
    if (want === "Activity") {
      if (Pdf.includes("Record")) {
        let activityName = Pdf.slice(0, Pdf.length - 10);
        setActivityName(activityName);
        setActivityShown(true);
      } else {
        let activityName = Pdf.slice(0, Pdf.length - 12);
        setActivityName(activityName);
        setActivityShown(true);
      }
    }
    if (want === "Instruction") {
      if (Pdf.includes("Record")) {
        setActivityShown(false);
        setPdf(Pdf.slice(0, Pdf.length - 10) + "Instruct" + ".pdf");
      } else {
        setActivityShown(false);
        setPdf(Pdf);
      }
    }
    if (want === "Record") {
      if (Pdf.includes("Record")) {
        setActivityShown(false);
        setPdf(Pdf.slice(0, Pdf.length - 10) + "Record" + ".pdf");
      } else {
        setActivityShown(false);
        setPdf(Pdf.slice(0, Pdf.length - 12) + "Record" + ".pdf");
      }
    }
  }

  function calculateFee() {
    let total = 120 * copies
    let totalWithFee = (total + .3) / (1 - .029)
    let fee = totalWithFee - total
    return fee   
  }

  return (
    <div>
      {/* {gateway && <div id="overlayContainer">
          {signInView && <div className="loginModal">
            <div>Complete Sign In With...</div>
            <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
          </div>}
          {!signInView && <div className="loginModal">
            <div>Purhcase Piggyback</div>
            <div>
              <div>
                <span>$ 150</span> 
                <button onClick={() => {window.location.href = 'https://us-central1-piggyback-aa8c3.cloudfunctions.net/createStripeCheckoutV5?user_id=' + UID}}>Buy Now</button>
              </div>
              
              <div>
                <input type="number" placeholder="2" onChange={(e) => {setCopies(e.target.value); }} style={{width: '100px'}}></input>
                <span>$ 120/each</span>
                <button onClick={() => {window.location.href = 'https://us-central1-piggyback-aa8c3.cloudfunctions.net/createStripeCheckoutV3?quantity=' + copies + '&user_id=' + UID + "&prod_fee=" + calculateFee()}}>Buy Now</button>
              </div>
              <div style={{marginTop: '20px'}}>
                <div>Or Enter Code:</div>
                <input type="text" onChange={(e) => setCode(e.target.value)}></input>
                <button onClick={() => checkLicenseCode()}>Submit</button>
              </div>
            </div>
          </div>}
      </div>} */}
      <div>
        <div className="options">
          <div style={{ display: "none" }}>
            <Level5_LetterCharts change={stopFunc} />
            <Level6_LetterCharts2 change={stopFunc} />
            <Level7_LetterCharts3 change={stopFunc} />
            <Level8_TheLongVowelSounds change={stopFunc} />
            <Level8_TheShortVowelSound change={stopFunc} />
            <Level9_TheVowelsWithR change={stopFunc} />
            <Level9_OtheraAndOSounds cahnge={stopFunc} />
          </div>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">File</Dropdown.Toggle>
            <Dropdown.Menu className="option_select">
              <Dropdown.Item href="#/action-1">
                Activate Piggyback
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2">
                Manually Activate Piggyback
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">Exit Piggyback</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Beat
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Off</Dropdown.Item>
              <Dropdown.Item href="#/action-2">60bpm</Dropdown.Item>
              <Dropdown.Item href="#/action-3">120bpm</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Help
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">About Piggyback</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Piggyback Manual</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        
        
        <div className="layout">
          <div className="topics">
            <div>
              <Collapsible trigger="⇰ Sequencing, Vision &amp; Language">
                <Collapsible trigger="⇰ Introduction" open="true">
                  <div
                    onClick={() => {
                      setPdf("SequencingVision&Learning/IntroBugInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "SequencingVision&Learning/IntroBugInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Bug
                  </div>
                  <div
                    onClick={() => {
                      setPdf(
                        "SequencingVision&Learning/IntroRockingHorseInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "SequencingVision&Learning/IntroRockingHorseInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Rocking Horse
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 1" open="true">
                  <div
                    onClick={() => {
                      setPdf(
                        "SequencingVision&Learning/1SpiderMapInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "SequencingVision&Learning/1SpiderMapInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Spider Tap
                  </div>
                  <div
                    onClick={() => {
                      setPdf("SequencingVision&Learning/1BackMapInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "SequencingVision&Learning/1BackMapInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Back Map
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 2" open="true">
                  <div
                    onClick={() => {
                      setPdf(
                        "SequencingVision&Learning/2SoundCodesInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "SequencingVision&Learning/2SoundCodesInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Sound Codes
                  </div>
                  <div
                    onClick={() => {
                      setPdf(
                        "SequencingVision&Learning/2ArmLegLiftsInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "SequencingVision&Learning/2ArmLegLiftsInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Arm &amp; Leg Lifts
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 3" open="true">
                  <div
                    onClick={() => {
                      setPdf("SequencingVision&Learning/3TimingInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "SequencingVision&Learning/3TimingInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Timing
                  </div>
                  <div
                    onClick={() => {
                      setPdf("SequencingVision&Learning/3TurtleInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "SequencingVision&Learning/3TurtleInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Turtle
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 4" open="true">
                  <div
                    onClick={() => {
                      setPdf(
                        "SequencingVision&Learning/4VisualSequenceInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "SequencingVision&Learning/4VisualSequenceInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Visual Sequence
                  </div>
                  <div
                    onClick={() => {
                      setPdf(
                        "SequencingVision&Learning/4RandolphShuffleInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "SequencingVision&Learning/4RandolphShuffleInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Randolph Shuffle
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 5" open="true">
                  <div
                    onClick={() => {
                      setPdf(
                        "SequencingVision&Learning/5MemoryDotsInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "SequencingVision&Learning/5MemoryDotsInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Memory Dots
                  </div>
                  {/* <div
                    onClick={() => {
                      setPdf(
                        "SequencingVision&Learning/5ClapPatternsInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(false);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "SequencingVision&Learning/5ClapPatternsInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Clap Patterns
                  </div> */}
                  {/* <div
                    onClick={() => {
                      setPdf(
                        "SequencingVision&Learning/5SeeAndSoundCodesInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(false);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "SequencingVision&Learning/5SeeAndSoundCodesInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    See And Sound Codes
                  </div> */}
                </Collapsible>
                <Collapsible trigger="⇰ Level 6" open="true">
                  <div
                    onClick={() => {
                      setPdf(
                        "SequencingVision&Learning/6WordBlocksInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "SequencingVision&Learning/6WordBlocksInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Word Blocks
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 7" open="true">
                  <div
                    onClick={() => {
                      setPdf(
                        "SequencingVision&Learning/7SoundPatternsInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "SequencingVision&Learning/7SoundPatternsInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Sound Patterns
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 8" open="true">
                  <div
                    onClick={() => {
                      setPdf(
                        "SequencingVision&Learning/8TheShortVowelSoundInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "SequencingVision&Learning/8TheShortVowelSoundInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    The Short Vowel Sound
                  </div>
                  <div
                    onClick={() => {
                      setPdf(
                        "SequencingVision&Learning/8TheLongVowelSoundInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "SequencingVision&Learning/8TheLongVowelSoundInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    The Long Vowel Sound
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 9" open="true">
                  <div
                    onClick={() => {
                      setPdf(
                        "SequencingVision&Learning/9TheVowelsWithRInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "SequencingVision&Learning/9TheVowelsWithRInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    The Vowels With 'r'
                  </div>
                  <div
                    onClick={() => {
                      setPdf(
                        "SequencingVision&Learning/9Othera&oSoundsInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "SequencingVision&Learning/9Othera&oSoundsInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Other 'a' &amp; 'o' Sounds
                  </div>
                  <div
                    onClick={() => {
                      setPdf(
                        "SequencingVision&Learning/9TheRuleBreakersInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "SequencingVision&Learning/9TheRuleBreakersInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    The Rule Breakers and Multiple Syllables
                  </div>
                </Collapsible>
              </Collapsible>
              <Collapsible trigger="⇰ Visual Thinking">
                <Collapsible trigger="⇰ Introduction" open="true">
                  <div
                    onClick={() => {
                      setPdf(
                        "VisualThinking/IntroVisuallyCodedMovementInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "VisualThinking/IntroVisuallyCodedMovementInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Visually Coded Movement
                  </div>
                  <div
                    onClick={() => {
                      setPdf("VisualThinking/IntroMatchingCubesInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "VisualThinking/IntroMatchingCubesInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Matching Cubes
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 1" open="true">
                  <div
                    onClick={() => {
                      setPdf("VisualThinking/1MatchingBlocksInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "VisualThinking/1MatchingBlocksInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Matching Blocks
                  </div>
                  {/* <div
                    onClick={() => {
                      setPdf(
                        "VisualThinking/1CodesForClapPatternsInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(false);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "VisualThinking/1CodesForClapPatternsInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Codes for Clap Patterns
                  </div> */}
                  <div
                    onClick={() => {
                      setPdf("VisualThinking/1FlashingPicturesInstruct.pdf");
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "VisualThinking/1FlashingPicturesInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Flashing Pictures
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 2" open="true">
                  <div
                    onClick={() => {
                      setPdf(
                        "VisualThinking/2FlashingClapPatternsInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "VisualThinking/2FlashingClapPatternsInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Clap Patterns
                  </div>
                  {/* <div
                    onClick={() => {
                      setPdf("VisualThinking/2FlashingCubesInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "VisualThinking/2FlashingCubesInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Flashing Cubes
                  </div> */}
                </Collapsible>
                <Collapsible trigger="⇰ Level 3" open="true">
                  <div
                    onClick={() => {
                      setPdf("VisualThinking/3MatchingBlocks2Instruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "VisualThinking/3MatchingBlocks2Instruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Matching Blocks 2
                  </div>
                  <div
                    onClick={() => {
                      setPdf("VisualThinking/3RememberingShapesInstruct.pdf");
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "VisualThinking/3RememberingShapesInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Remembering Shapes
                  </div>
                  <div
                    onClick={() => {
                      setPdf("VisualThinking/3FlashingNumbersInstruct.pdf");
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "VisualThinking/3FlashingNumbersInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Flashing Numbers
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 4" open="true">
                  <div
                    onClick={() => {
                      setPdf("VisualThinking/4FlashingLettersInstruct.pdf");
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "VisualThinking/4FlashingLettersInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Flashing Letters
                  </div>
                  <div
                    onClick={() => {
                      setPdf(
                        "VisualThinking/4Feeling&MatchingWithBlocksInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "VisualThinking/4Feeling&MatchingWithBlocksInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Feeling &amp; Matching with Blocks
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 5" open="true">
                  <div
                    onClick={() => {
                      setPdf(
                        "VisualThinking/5FlashingDotToDotPatternsInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "VisualThinking/5FlashingDotToDotPatternsInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Flashing Dot to Dot Patterns
                  </div>
                  <div
                    onClick={() => {
                      setPdf(
                        "VisualThinking/5RememberingBlockPatternsInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "VisualThinking/5RememberingBlockPatternsInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Remembering Block Patterns
                  </div>
                  <div
                    onClick={() => {
                      setPdf("VisualThinking/5FlashingWordsInstruct.pdf");
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "VisualThinking/5FlashingWordsInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Flashing Words
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 6" open="true">
                  <div
                    onClick={() => {
                      setPdf("VisualThinking/6StickManInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "VisualThinking/6StickManInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Stick Man
                  </div>
                  <div
                    onClick={() => {
                      setPdf("VisualThinking/6FlashingWords2Instruct.pdf");
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "VisualThinking/6FlashingWords2Instruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Flashing Words 2
                  </div>
                  <div
                    onClick={() => {
                      setPdf(
                        "VisualThinking/6Flipping&RotatingCirclesInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "VisualThinking/6Flipping&RotatingCirclesInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Flipping &amp; Rotating Circles
                  </div>
                  {/* <div
                    onClick={() => {
                      setPdf("VisualThinking/6DominoesInstruct.pdf");
                      setActivityShown(false);
                    }}
                  >
                    Dominoes
                  </div> */}
                </Collapsible>
                <Collapsible trigger="⇰ Level 7" open="true">
                  <div
                    onClick={() => {
                      setPdf(
                        "VisualThinking/7Flipping&RotatingCubesInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "VisualThinking/7Flipping&RotatingCubesInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Flipping &amp; Rotating Cubes
                  </div>
                  {/* <div
                    onClick={() => {
                      setPdf(
                        "VisualThinking/7Flipping&RotatingDotToDotInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "VisualThinking/7Flipping&RotatingDotToDotInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Flipping &amp; Rotating Dot to Dot Patterns
                  </div> */}
                  <div
                    onClick={() => {
                      setPdf("VisualThinking/7BlocksInAHoleInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "VisualThinking/7BlocksInAHoleInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Blocks in a Hole
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 8" open="true">
                  <div
                    onClick={() => {
                      setPdf(
                        "VisualThinking/8Flipping&RotatingBlocksInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "VisualThinking/8Flipping&RotatingBlocksInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Flipping &amp; Rotating Blocks
                  </div>
                  <div
                    onClick={() => {
                      setPdf("VisualThinking/8FisherCubesInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "VisualThinking/8FisherCubesInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Fisher Cubes
                  </div>
                  <div
                    onClick={() => {
                      setPdf(
                        "VisualThinking/8Flipping&RotatingShapesInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "VisualThinking/8Flipping&RotatingShapesInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Flipping &amp; Rotating Shapes
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 9" open="true">
                  <div
                    onClick={() => {
                      setPdf(
                        "VisualThinking/9DescribingBlockPatternsInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "VisualThinking/9DescribingBlockPatternsInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Describing Block Patterns
                  </div>
                </Collapsible>
              </Collapsible>
              <Collapsible trigger="⇰ Organising Space">
                <Collapsible trigger="⇰ Introduction" open="true">
                  <div
                    onClick={() => {
                      setPdf("OrganisingSpace/IntroWheelbarrowInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "OrganisingSpace/IntroWheelbarrowInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Wheelbarrow
                  </div>
                  <div
                    onClick={() => {
                      setPdf("OrganisingSpace/IntroStarfishInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "OrganisingSpace/IntroStarfishInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Starfish
                  </div>
                  <div
                    onClick={() => {
                      setPdf("OrganisingSpace/IntroBallRollInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "OrganisingSpace/IntroBallRollInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Ball Roll
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 1" open="true">
                  <div
                    onClick={() => {
                      setPdf("OrganisingSpace/1LineRollingInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "OrganisingSpace/1LineRollingInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Line Rolling
                  </div>
                  <div
                    onClick={() => {
                      setPdf("OrganisingSpace/1JointsInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "OrganisingSpace/1JointsInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Joints
                  </div>
                  <div
                    onClick={() => {
                      setPdf("OrganisingSpace/1WallWalkingInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "OrganisingSpace/1WallWalkingInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Wall Walking
                  </div>
                  <div
                    onClick={() => {
                      setPdf("OrganisingSpace/1SteppingArrowsInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "OrganisingSpace/1SteppingArrowsInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Stepping Arrows
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 2" open="true">
                  <div
                    onClick={() => {
                      setPdf("OrganisingSpace/2PlutoInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "OrganisingSpace/2PlutoInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Pluto
                  </div>
                  <div
                    onClick={() => {
                      setPdf("OrganisingSpace/2CrabWalkInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "OrganisingSpace/2CrabWalkInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Crab Walk
                  </div>
                  <div
                    onClick={() => {
                      setPdf("OrganisingSpace/2TightropeWalkInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "OrganisingSpace/2TightropeWalkInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Tightrope Walk
                  </div>
                  <div
                    onClick={() => {
                      setPdf("OrganisingSpace/2CowboyandStorkWalkInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "OrganisingSpace/2CowboyandStorkWalkInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Cowboy and Stork Walk
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 3" open="true">
                  <div
                    onClick={() => {
                      setPdf("OrganisingSpace/3CrocodileSwimInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "OrganisingSpace/3CrocodileSwimInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Crocodile Swim
                  </div>
                  <div
                    onClick={() => {
                      setPdf("OrganisingSpace/3WhichIsMyRightHandInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "OrganisingSpace/3WhichIsMyRightHandInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Which is my Right Hand?
                  </div>
                  <div
                    onClick={() => {
                      setPdf("OrganisingSpace/3BearWalkInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "OrganisingSpace/3BearWalkInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Bear Walk
                  </div>
                  <div
                    onClick={() => {
                      setPdf("OrganisingSpace/3SquareAndCircleInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "OrganisingSpace/3SquareAndCircleInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Square and Circle
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 4" open="true">
                  <div
                    onClick={() => {
                      setPdf("OrganisingSpace/4SoldierWalksInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "OrganisingSpace/4SoldierWalksInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Soldier Walks
                  </div>
                  <div
                    onClick={() => {
                      setPdf("OrganisingSpace/4BallBounceInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "OrganisingSpace/4BallBounceInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Ball Bouncing
                  </div>
                  <div
                    onClick={() => {
                      setPdf("OrganisingSpace/4ElephantWalkInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "OrganisingSpace/4ElephantWalkInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Elephant Walk
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 5" open="true">
                  <div
                    onClick={() => {
                      setPdf("OrganisingSpace/5DoWhatIDoInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "OrganisingSpace/5DoWhatIDoInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    'Do What I do'
                  </div>
                  <div
                    onClick={() => {
                      setPdf("OrganisingSpace/5HalopinHandsInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "OrganisingSpace/5HalopinHandsInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Halopin Hands
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 6" open="true">
                  <div
                    onClick={() => {
                      setPdf("OrganisingSpace/6DoWhatIDo2Instruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "OrganisingSpace/6DoWhatIDo2Instruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    'Do What I do' 2
                  </div>
                  <div
                    onClick={() => {
                      setPdf("OrganisingSpace/6ArrowsInstruct.pdf");
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "OrganisingSpace/6ArrowsInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Arrows
                  </div>
                  <div
                    onClick={() => {
                      setPdf("OrganisingSpace/6HalopinHands2Instruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "OrganisingSpace/6HalopinHands2Instruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Halopin Hands 2
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 7" open="true">
                  <div
                    onClick={() => {
                      setPdf("OrganisingSpace/7RobotInTheMirrorInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "OrganisingSpace/7RobotInTheMirrorInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Robot in the Mirror
                  </div>
                  <div
                    onClick={() => {
                      setPdf("OrganisingSpace/7PointingInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "OrganisingSpace/7PointingInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Pointing
                  </div>
                  <div
                    onClick={() => {
                      setPdf(
                        "OrganisingSpace/7DirectionalTrianglesInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "OrganisingSpace/7DirectionalTrianglesInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Directional Triangles
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 8" open="true">
                  <div
                    onClick={() => {
                      setPdf("OrganisingSpace/8bdpandqInstruct.pdf");
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "OrganisingSpace/8bdpandqInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    b, d, p and q
                  </div>
                  <div
                    onClick={() => {
                      setPdf("OrganisingSpace/8RobotOnALineInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "OrganisingSpace/8RobotOnALineInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Robot on a Line
                  </div>
                  <div
                    onClick={() => {
                      setPdf(
                        "OrganisingSpace/8RobotWithoutTheMirrorInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "OrganisingSpace/8RobotWithoutTheMirrorInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Robot without the Mirror
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 9" open="true">
                  {/* <div
                    onClick={() => {
                      setPdf("OrganisingSpace/9FindTheWrongLetterInstruct.pdf");
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "OrganisingSpace/9FindTheWrongLetterInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Find the Wrong Letter
                  </div> */}
                  <div
                    onClick={() => {
                      setPdf("OrganisingSpace/9MouseInAMazeInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "OrganisingSpace/9MouseInAMazeInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Mouse in a Maze
                  </div>
                </Collapsible>
              </Collapsible>
              <Collapsible trigger="⇰ Eye Movements">
                <Collapsible trigger="⇰ Introduction" open="true">
                  <div
                    onClick={() => {
                      setPdf("EyeMovements/IntroRainbowInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "EyeMovements/IntroRainbowInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Rainbow
                  </div>
                  <div
                    onClick={() => {
                      setPdf("EyeMovements/IntroLizardInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "EyeMovements/IntroLizardInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Lizard
                  </div>
                  <div
                    onClick={() => {
                      setPdf("EyeMovements/IntroEyeControlInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "EyeMovements/IntroEyeControlInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Eye Control
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 1" open="true">
                  <div
                    onClick={() => {
                      setPdf("EyeMovements/1EyeSwingsInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "EyeMovements/1EyeSwingsInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Eye Swings
                  </div>
                  <div
                    onClick={() => {
                      setPdf("EyeMovements/1PenStabInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "EyeMovements/1PenStabInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Pen Stab
                  </div>
                  <div
                    onClick={() => {
                      setPdf("EyeMovements/1MarbleRollsInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "EyeMovements/1MarbleRollsInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Marble Rolls
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 2" open="true">
                  <div
                    onClick={() => {
                      setPdf("EyeMovements/2HeadSwingsInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "EyeMovements/2HeadSwingsInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Head Swings
                  </div>
                  <div
                    onClick={() => {
                      setPdf("EyeMovements/2CatchTheFingerInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "EyeMovements/2CatchTheFingerInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Catch the Finger
                  </div>
                  <div
                    onClick={() => {
                      setPdf("EyeMovements/2NamingPicturesInstruct.pdf");
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "EyeMovements/2NamingPicturesInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Naming Pictures
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 3" open="true">
                  <div
                    onClick={() => {
                      setPdf("EyeMovements/3CallingNumbersInstruct.pdf");
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "EyeMovements/3CallingNumbersInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Calling Numbers
                  </div>
                  <div
                    onClick={() => {
                      setPdf("EyeMovements/3FollowTheSpoonInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "EyeMovements/3FollowTheSpoonInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Follow the Spoon
                  </div>
                  <div
                    onClick={() => {
                      setPdf("EyeMovements/3ClosedEyeLookingInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "EyeMovements/3ClosedEyeLookingInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    'Closed Eye' Looking
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 4" open="true">
                  <div
                    onClick={() => {
                      setPdf("EyeMovements/4CallingLettersInstruct.pdf");
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "EyeMovements/4CallingLettersInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Calling Letters
                  </div>
                  <div
                    onClick={() => {
                      setPdf("EyeMovements/4FollowTheSpoon2Instruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "EyeMovements/4FollowTheSpoon2Instruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Follow the Spoon 2
                  </div>
                  <div
                    onClick={() => {
                      setPdf("EyeMovements/4LookReadyTouchBackInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "EyeMovements/4LookReadyTouchBackInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Look, Ready, Touch, Back
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 5" open="true">
                  {/* <div
                    onClick={() => {
                      setPdf("EyeMovements/5NamingSoundsInstruct.pdf");
                      setActivityShown(false);
                      setDisable(false);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "EyeMovements/5NamingSoundsInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Naming Sounds
                  </div> */}
                  <div
                    onClick={() => {
                      setPdf("EyeMovements/5LetterChartsInstruct.pdf");
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "EyeMovements/5LetterChartsInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Letter Leap Frog 1: Charts
                  </div>
                  <div
                    onClick={() => {
                      setPdf("EyeMovements/5LookRingTouchBackInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "EyeMovements/5LookRingTouchBackInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Look, Ring, Touch, Back
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 6" open="true">
                  <div
                    onClick={() => {
                      setPdf("EyeMovements/6LetterCharts2Instruct.pdf");
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "EyeMovements/6LetterCharts2Instruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Letter Leap Frog 2: Songs
                  </div>
                  <div
                    onClick={() => {
                      setPdf("EyeMovements/6ThumbRotationInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "EyeMovements/6ThumbRotationInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Thumb Rotation
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 7" open="true">
                  <div
                    onClick={() => {
                      setPdf("EyeMovements/7StarJumpsInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "EyeMovements/7StarJumpsInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Star Jumps
                  </div>
                  <div
                    onClick={() => {
                      setPdf("EyeMovements/7LetterCharts3Instruct.pdf");
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "EyeMovements/7LetterCharts3Instruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Letter Leap Frog 3: Tales
                  </div>
                </Collapsible>
                {/* <Collapsible trigger="⇰ Level 8" open="true">
                  <div
                    onClick={() => {
                      setPdf("EyeMovements/8MovingLetterChartInstruct.pdf");
                      setActivityShown(false);
                      setDisable(false);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "EyeMovements/8MovingLetterChartInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Moving Letter Chart
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 9" open="true">
                  <div
                    onClick={() => {
                      setPdf("EyeMovements/9RotatingLetterChartInstruct.pdf");
                      setActivityShown(false);
                      setDisable(false);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "EyeMovements/9RotatingLetterChartInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Rotating Letter Chart
                  </div>
                </Collapsible> */}
              </Collapsible>
              <Collapsible trigger="⇰ Turning on Your Brain">
                <Collapsible trigger="⇰ Level 1" open="true">
                  <div
                    onClick={() => {
                      setPdf("TurningOnYourBrain/1AngelsInTheSnowInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "TurningOnYourBrain/1AngelsInTheSnowInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Angels in the Snow
                  </div>
                  <div
                    onClick={() => {
                      setPdf("TurningOnYourBrain/1DimensionsInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "TurningOnYourBrain/1DimensionsInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Dimensions
                  </div>
                  <div
                    onClick={() => {
                      setPdf("TurningOnYourBrain/1FingerThinkingInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "TurningOnYourBrain/1FingerThinkingInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Finger Thinking
                  </div>
                  <div
                    onClick={() => {
                      setPdf("TurningOnYourBrain/1FingerThinking2Instruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "TurningOnYourBrain/1FingerThinking2Instruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Finger Thinking 2
                  </div>
                  <div
                    onClick={() => {
                      setPdf("TurningOnYourBrain/1FindTheShapeInstruct.pdf");
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "TurningOnYourBrain/1FindTheShapeInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Find the Shape
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 2" open="true">
                  <div
                    onClick={() => {
                      setPdf("TurningOnYourBrain/2EyeTracingInstruct.pdf");
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "TurningOnYourBrain/2EyeTracingInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Eye Tracing
                  </div>
                  <div
                    onClick={() => {
                      setPdf("TurningOnYourBrain/2FingerThinking3Instruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "TurningOnYourBrain/2FingerThinking3Instruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Finger Thinking 3
                  </div>
                  <div
                    onClick={() => {
                      setPdf(
                        "TurningOnYourBrain/2AngelsInTheSnowStopInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "TurningOnYourBrain/2AngelsInTheSnowStopInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Angels in the Snow - Stop
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 3" open="true">
                  <div
                    onClick={() => {
                      setPdf("TurningOnYourBrain/3FingerThinking4Instruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "TurningOnYourBrain/3FingerThinking4Instruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Finger Thinking 4
                  </div>
                  <div
                    onClick={() => {
                      setPdf(
                        "TurningOnYourBrain/3AngelsInTheSnowStopStartInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "TurningOnYourBrain/3AngelsInTheSnowStopStartInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Angels in the Snow - Stop/Start
                  </div>
                  <div
                    onClick={() => {
                      setPdf(
                        "TurningOnYourBrain/3SpatialRelationsInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "TurningOnYourBrain/3SpatialRelationsInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Spatial Relations
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 4" open="true">
                  <div
                    onClick={() => {
                      setPdf(
                        "TurningOnYourBrain/4AngelsInTheSnowStopStart2Instruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "TurningOnYourBrain/4AngelsInTheSnowStopStart2Instruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Angels in the Snow - Stop/Start 2
                  </div>
                  <div
                    onClick={() => {
                      setPdf("TurningOnYourBrain/4CountingLettersInstruct.pdf");
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "TurningOnYourBrain/4CountingLettersInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Counting Letters
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 5" open="true">
                  <div
                    onClick={() => {
                      setPdf(
                        "TurningOnYourBrain/5AngelsInTheSnowCodedInstruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "TurningOnYourBrain/5AngelsInTheSnowCodedInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Angels in the Snow - Coded
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 6" open="true">
                  <div
                    onClick={() => {
                      setPdf("TurningOnYourBrain/6BinocularStringInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "TurningOnYourBrain/6BinocularStringInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Binocular String
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 7" open="true">
                  <div
                    onClick={() => {
                      setPdf(
                        "TurningOnYourBrain/7BinocularString2Instruct.pdf"
                      );
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf ===
                        "TurningOnYourBrain/7BinocularString2Instruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Binocular String 2
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 8" open="true">
                  <div
                    onClick={() => {
                      setPdf("TurningOnYourBrain/8FindingLettersInstruct.pdf");
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "TurningOnYourBrain/8FindingLettersInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Finding Letters
                  </div>
                  <div
                    onClick={() => {
                      setPdf("TurningOnYourBrain/83DotCardInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "TurningOnYourBrain/83DotCardInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    3 Dot Card
                  </div>
                </Collapsible>
                {/* <Collapsible trigger="⇰ Level 9" open="true">
                  <div
                    onClick={() => {
                      setPdf("TurningOnYourBrain/9WordsOnTheRunInstruct.pdf");
                      setActivityShown(false);
                      setDisable(false);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "TurningOnYourBrain/9WordsOnTheRunInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Words on the Run
                  </div>
                </Collapsible> */}
              </Collapsible>
              <Collapsible trigger="⇰ Eye &amp; Hand">
                <Collapsible trigger="⇰ Level 1" open="true">
                  <div
                    onClick={() => {
                      setPdf("Eye&Hand/1TemplatesInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "Eye&Hand/1TemplatesInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Templates
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 2" open="true">
                  <div
                    onClick={() => {
                      setPdf("Eye&Hand/2ChalkboardRotationsInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "Eye&Hand/2ChalkboardRotationsInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Chalkboard Rotations
                  </div>
                  <div
                    onClick={() => {
                      setPdf("Eye&Hand/2TwoHandedLinesInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "Eye&Hand/2TwoHandedLinesInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Two Handed Lines
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 3" open="true">
                  <div
                    onClick={() => {
                      setPdf("Eye&Hand/3RacetrackInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "Eye&Hand/3RacetrackInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Racetrack
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 4" open="true">
                  <div
                    onClick={() => {
                      setPdf("Eye&Hand/4TwoHandedCirclesInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "Eye&Hand/4TwoHandedCirclesInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Two Handed Circles
                  </div>
                  <div
                    onClick={() => {
                      setPdf("Eye&Hand/4CirclingNumbersInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "Eye&Hand/4CirclingNumbersInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Circling Numbers
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 5" open="true">
                  <div
                    onClick={() => {
                      setPdf("Eye&Hand/5TwoHandedSquaresInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "Eye&Hand/5TwoHandedSquaresInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Two Handed Squares
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 6" open="true">
                  <div
                    onClick={() => {
                      setPdf("Eye&Hand/6WritingPatternsInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "Eye&Hand/6WritingPatternsInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Writing Patterns
                  </div>
                </Collapsible>
                <Collapsible trigger="⇰ Level 7" open="true">
                  <div
                    onClick={() => {
                      setPdf("Eye&Hand/7TwoHandedSquare&TriangleInstruct.pdf");
                      setActivityShown(false);
                      setDisable(true);
                      setStopFunc((prev) => prev + 1);
                    }}
                    style={{
                      backgroundColor:
                        Pdf === "Eye&Hand/7TwoHandedSquare&TriangleInstruct.pdf"
                          ? "lightgrey"
                          : "transparent",
                    }}
                  >
                    Two Handed Square &amp; Triangle
                  </div>
                </Collapsible>
              </Collapsible>
              <Collapsible trigger="⇰ Charts">
                <div
                  onClick={() => {
                    setPdf("Charts/FindTheShape.pdf");
                    setActivityShown(false);
                    setDisable(true);
                    setStopFunc((prev) => prev + 1);
                  }}
                  style={{
                    backgroundColor:
                      Pdf === "Charts/FindTheShape.pdf"
                        ? "lightgrey"
                        : "transparent",
                  }}
                >
                  Find The Shape
                </div>
                <div
                  onClick={() => {
                    setPdf("Charts/SteppingArrows.pdf");
                    setActivityShown(false);
                    setDisable(true);
                    setStopFunc((prev) => prev + 1);
                  }}
                  style={{
                    backgroundColor:
                      Pdf === "Charts/SteppingArrows.pdf"
                        ? "lightgrey"
                        : "transparent",
                  }}
                >
                  Stepping Arrows
                </div>
                <div
                  onClick={() => {
                    setPdf("Charts/Pluto.pdf");
                    setActivityShown(false);
                    setDisable(true);
                    setStopFunc((prev) => prev + 1);
                  }}
                  style={{
                    backgroundColor:
                      Pdf === "Charts/Pluto.pdf" ? "lightgrey" : "transparent",
                  }}
                >
                  Pluto
                </div>
                <div
                  onClick={() => {
                    setPdf("Charts/Square&Circle.pdf");
                    setActivityShown(false);
                    setDisable(true);
                    setStopFunc((prev) => prev + 1);
                  }}
                  style={{
                    backgroundColor:
                      Pdf === "Charts/Square&Circle.pdf"
                        ? "lightgrey"
                        : "transparent",
                  }}
                >
                  Square &amp; Circle
                </div>
                <div
                  onClick={() => {
                    setPdf("Charts/BallBounce.pdf");
                    setActivityShown(false);
                    setDisable(true);
                    setStopFunc((prev) => prev + 1);
                  }}
                  style={{
                    backgroundColor:
                      Pdf === "Charts/BallBounce.pdf"
                        ? "lightgrey"
                        : "transparent",
                  }}
                >
                  Ball Bounce
                </div>
                <div
                  onClick={() => {
                    setPdf("Charts/LetterCharts.pdf");
                    setActivityShown(false);
                    setDisable(true);
                    setStopFunc((prev) => prev + 1);
                  }}
                  style={{
                    backgroundColor:
                      Pdf === "Charts/LetterCharts.pdf"
                        ? "lightgrey"
                        : "transparent",
                  }}
                >
                  Letter Charts
                </div>
                <div
                  onClick={() => {
                    setPdf("Charts/AngelsInTheSnowCoded.pdf");
                    setActivityShown(false);
                    setDisable(true);
                    setStopFunc((prev) => prev + 1);
                  }}
                  style={{
                    backgroundColor:
                      Pdf === "Charts/AngelsInTheSnowCoded.pdf"
                        ? "lightgrey"
                        : "transparent",
                  }}
                >
                  Angels in The Snow - Coded
                </div>
                <div
                  onClick={() => {
                    setPdf("Charts/HalopinHands1.pdf");
                    setActivityShown(false);
                    setDisable(true);
                    setStopFunc((prev) => prev + 1);
                  }}
                  style={{
                    backgroundColor:
                      Pdf === "Charts/HalopinHands1.pdf"
                        ? "lightgrey"
                        : "transparent",
                  }}
                >
                  Halopin Hands 1
                </div>
                <div
                  onClick={() => {
                    setPdf("Charts/HalopinHands2.pdf");
                    setActivityShown(false);
                    setDisable(true);
                    setStopFunc((prev) => prev + 1);
                  }}
                  style={{
                    backgroundColor:
                      Pdf === "Charts/HalopinHands2.pdf"
                        ? "lightgrey"
                        : "transparent",
                  }}
                >
                  Halopin Hands 2
                </div>
                <div
                  onClick={() => {
                    setPdf("Charts/Pointing.pdf");
                    setActivityShown(false);
                    setDisable(true);
                    setStopFunc((prev) => prev + 1);
                  }}
                  style={{
                    backgroundColor:
                      Pdf === "Charts/Pointing.pdf"
                        ? "lightgrey"
                        : "transparent",
                  }}
                >
                  Pointing
                </div>
                <div
                  onClick={() => {
                    setPdf("Charts/DirectionalTriangles.pdf");
                    setActivityShown(false);
                    setDisable(true);
                    setStopFunc((prev) => prev + 1);
                  }}
                  style={{
                    backgroundColor:
                      Pdf === "Charts/DirectionalTriangles.pdf"
                        ? "lightgrey"
                        : "transparent",
                  }}
                >
                  Directional Triangles
                </div>
                <div
                  onClick={() => {
                    setPdf("Charts/StarJumps.pdf");
                    setActivityShown(false);
                    setDisable(true);
                    setStopFunc((prev) => prev + 1);
                  }}
                  style={{
                    backgroundColor:
                      Pdf === "Charts/StarJumps.pdf"
                        ? "lightgrey"
                        : "transparent",
                  }}
                >
                  Star Jumps
                </div>
                <div
                  onClick={() => {
                    setPdf("Charts/MouseInAMaze.pdf");
                    setActivityShown(false);
                    setDisable(true);
                    setStopFunc((prev) => prev + 1);
                  }}
                  style={{
                    backgroundColor:
                      Pdf === "Charts/MouseInAMaze.pdf"
                        ? "lightgrey"
                        : "transparent",
                  }}
                >
                  Mouse In A Maze
                </div>
                <div
                  onClick={() => {
                    setPdf("Charts/Timing.pdf");
                    setActivityShown(false);
                    setDisable(true);
                    setStopFunc((prev) => prev + 1);
                  }}
                  style={{
                    backgroundColor:
                      Pdf === "Charts/Timing.pdf" ? "lightgrey" : "transparent",
                  }}
                >
                  Timing
                </div>
              </Collapsible>
            </div>
          </div>
          <div className="pdfbox">
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Button
                variant="outline-dark"
                onClick={() => {
                  nextView("Instruction");
                }}
              >
                Instruction Sheet
              </Button>
              {Pdf == "SequencingVision&Learning/3TimingInstruct.pdf" ||
              Pdf == "SequencingVision&Learning/3TimingRecord.pdf" ? (
                <div style={{ display: "inline" }}>
                  <Beats />
                </div>
              ) : (
                <Button
                  variant="outline-secondary"
                  disabled={disable}
                  onClick={() => {
                    nextView("Activity");
                  }}
                >
                  Activity{" "}
                </Button>
              )}

              <Button
                variant="outline-secondary"
                onClick={() => {
                  nextView("Record");
                }}
              >
                Recording Sheet
              </Button>
            </div>
            <div className={ActivityShown ? "activity" : "pdf"}>
              {ActivityShown && (
                <Activity
                  activityName={ActivityName}
                  className="activity"
                ></Activity>
              )}
              {!ActivityShown && <PDFViewer file={Pdf} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
