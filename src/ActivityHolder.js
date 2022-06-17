import React from "react";
import "./App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import Level2_SoundCodes from "./Activities/SequencingVisionandLanguage/Level2_SoundCodes";
import Level4_VisualSequence from "./Activities/SequencingVisionandLanguage/Level4_VisualSequence";
import Level5_ClapPatterns from "./Activities/SequencingVisionandLanguage/Level5_ClapPatterns";
import Level1_FlashingPictures from "./Activities/VisualThinking/Level1_FlashingPictures";
import Level5_RememberingBlockPatterns from "./Activities/VisualThinking/Level5_RememberingBlockPatterns";
import Level2_EyeTracing from "./Activities/TurningOnYourBrain/Level2_EyeTracing";
import Level2_NamingPictures from "./Activities/EyeMovements/Level2_NamingPictures";
import Level8_TheShortVowelSound from "./Activities/SequencingVisionandLanguage/Level8_TheShortVowelSound";
import Level5_MemoryDots from "./Activities/SequencingVisionandLanguage/Level5_MemoryDots";
import Level5_LetterCharts from "./Activities/EyeMovements/Level5_LetterCharts";
import Level7_LetterCharts3 from "./Activities/EyeMovements/Level7_LetterCharts3";
import Level5_FlashingWords from "./Activities/VisualThinking/Level5_FlashingWords";
import Level6_FlashingWords2 from "./Activities/VisualThinking/Level6_FlashingWords2";
import Level1_CodesforClapPatterns from "./Activities/VisualThinking/Level1_CodesForClapPatterns";
import Level2_FlashingClapPatterns from "./Activities/VisualThinking/Level2_FlashingClapPatterns";
import Intro_VisuallyCodedMovement from "./Activities/VisualThinking/Intro_VisuallyCodedMovement";
import Level1_FindTheShape from "./Activities/TurningOnYourBrain/Level1_FindTheShape";
import Level3_CallingNumbers from "./Activities/EyeMovements/Level3_CallingNumbers";
import Level3_RememberingShapes from "./Activities/VisualThinking/Level3_RememberingShapes";
import Level4_CallingLetters from "./Activities/EyeMovements/Level4_CallingLetters";
import Level3_FlashingNumbers from "./Activities/VisualThinking/Level3_FlashingNumbers";
import Level4_FlashingLetters from "./Activities/VisualThinking/Level4_FlashingLetters";
import Level4_CountingLetters from "./Activities/TurningOnYourBrain/Level4_CountingLetters";
import Level5_FlashingDotToDotPatterns from "./Activities/VisualThinking/Level5_FlashingDotToDotPatterns";
import Level6_LetterCharts2 from "./Activities/EyeMovements/Level6_LetterCharts2";
import Level8_TheLongVowelSounds from "./Activities/SequencingVisionandLanguage/level8_TheLongVowelSounds";
import Level9_TheVowelsWithR from "./Activities/SequencingVisionandLanguage/Level9_TheVowelsWithR";
import Level9_OtheraAndoSounds from "./Activities/SequencingVisionandLanguage/Level9_Othera&oSounds";
import Level9_TheRuleBreakers from "./Activities/SequencingVisionandLanguage/Level9_TheRuleBreakers";
import Level8_FlippingAndRotatingShapes from "./Activities/VisualThinking/Level8_Flipping&RotatingShapes";
import Level6_Arrows from "./Activities/OrganisingSpace/Level6_Arrows";
import Level8_FindingLetters from "./Activities/TurningOnYourBrain/Level8_FindingLetters";
import Level8_bdpandq from "./Activities/OrganisingSpace/Level8_bdpandq";


class ActivityHolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activityName: null,
      activity: <div></div>,
    };
  }

  componentDidMount() {
    console.log(React.version);
    this.setState({ activityName: this.props.activityName });
  }

  render() {
    return (
      <div className="activity_box">
        {this.state.activityName ==
          "SequencingVision&Learning/4VisualSequence" && (
          <Level4_VisualSequence />
        )}
        {this.state.activityName ==
          "SequencingVision&Learning/5ClapPatterns" && <Level5_ClapPatterns />}
        {this.state.activityName == "SequencingVision&Learning/2SoundCodes" && (
          <Level2_SoundCodes />
        )}
        {this.state.activityName == "VisualThinking/1FlashingPictures" && (
          <Level1_FlashingPictures />
        )}
        {this.state.activityName ==
          "VisualThinking/5RememberingBlockPatterns" && (
          <Level5_RememberingBlockPatterns />
        )}
        {this.state.activityName == "TurningOnYourBrain/2EyeTracing" && (
          <Level2_EyeTracing />
        )}
        {this.state.activityName == "EyeMovements/2NamingPictures" && (
          <Level2_NamingPictures />
        )}
        {this.state.activityName ==
          "SequencingVision&Learning/8TheShortVowelSound" && (
          <Level8_TheShortVowelSound />
        )}
        {this.state.activityName == "SequencingVision&Learning/5MemoryDots" && (
          <Level5_MemoryDots />
        )}
        {this.state.activityName == "EyeMovements/5LetterCharts" && (
          <Level5_LetterCharts />
        )}
        {this.state.activityName == "EyeMovements/7LetterCharts3" && (
          <Level7_LetterCharts3 />
        )}
        {this.state.activityName == "VisualThinking/5FlashingWords" && (
          <Level5_FlashingWords />
        )}
        {this.state.activityName == "VisualThinking/6FlashingWords2" && (
          <Level6_FlashingWords2 />
        )}
        {this.state.activityName == "SequencingVision&Learning/5MemoryDots" && (
          <Level5_MemoryDots />
        )}
        {this.state.activityName == "VisualThinking/1CodesForClapPatterns" && (
          <Level1_CodesforClapPatterns />
        )}
        {this.state.activityName == "VisualThinking/2FlashingClapPatterns" && (
          <Level2_FlashingClapPatterns />
        )}
        {this.state.activityName ==
          "VisualThinking/IntroVisuallyCodedMovement" && (
          <Intro_VisuallyCodedMovement />
        )}
        {this.state.activityName == "TurningOnYourBrain/1FindTheShape" && (
          <Level1_FindTheShape />
        )}
        {this.state.activityName == "EyeMovements/3CallingNumbers" && (
          <Level3_CallingNumbers />
        )}
        {this.state.activityName == "VisualThinking/3RememberingShapes" && (
          <Level3_RememberingShapes />
        )}
        {this.state.activityName == "EyeMovements/4CallingLetters" && (
          <Level4_CallingLetters />
        )}
        {this.state.activityName == "VisualThinking/3FlashingNumbers" && (
          <Level3_FlashingNumbers />
        )}
        {this.state.activityName == "VisualThinking/4FlashingLetters" && (
          <Level4_FlashingLetters />
        )}
        {this.state.activityName == "TurningOnYourBrain/4CountingLetters" && (
          <Level4_CountingLetters />
        )}
        {this.state.activityName ==
          "VisualThinking/5FlashingDotToDotPatterns" && (
          <Level5_FlashingDotToDotPatterns />
        )}
        {this.state.activityName == "EyeMovements/6LetterCharts2" && (
          <Level6_LetterCharts2 />
        )}
        {this.state.activityName ==
          "SequencingVision&Learning/8TheLongVowelSound" && (
          <Level8_TheLongVowelSounds />
        )}
        {this.state.activityName ==
          "SequencingVision&Learning/9TheVowelsWithR" && (
          <Level9_TheVowelsWithR />
        )}
        {this.state.activityName ==
          "SequencingVision&Learning/9Othera&oSounds" && (
          <Level9_OtheraAndoSounds />
        )}
        {this.state.activityName ==
          "SequencingVision&Learning/9TheRuleBreakers" && (
          <Level9_TheRuleBreakers />
        )}
        {this.state.activityName ==
          "VisualThinking/8Flipping&RotatingShapes" && (
          <Level8_FlippingAndRotatingShapes />
        )}
        {this.state.activityName ==
          "OrganisingSpace/6Arrows" && (
          <Level6_Arrows />
        )}
        {this.state.activityName == "TurningOnYourBrain/8FindingLetters" && <Level8_FindingLetters /> }
        {this.state.activityName ==
          "OrganisingSpace/8bdpandq" && (
          <Level8_bdpandq />
        )}
      </div>
    );
  }
}

export default ActivityHolder;
