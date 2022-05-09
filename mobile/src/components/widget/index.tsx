import React, { useRef, useState } from "react";
import { TouchableOpacity } from "react-native";
import { ChatTeardropDots } from 'phosphor-react-native';
import BottomSheet from "react-native-raw-bottom-sheet";

import { styles } from './styles';
import { theme } from "../../theme";
import { Form } from "../form";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { Options } from "../options";
import { Success } from "../success";

export type FeedbackType = keyof typeof feedbackTypes; 

export function Widget() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpen() {
    bottomSheetRef.current?.open();
  }

  function handleRestarFeedback() {
    setFeedbackType(null);
    setFeedbackSent(false);
  }

  function handleFeedbackSent() {
    setFeedbackSent(true);
  }

  return (
    <>
      <TouchableOpacity
        style={styles.button}
        onPress={handleOpen}
      >
        <ChatTeardropDots
          size={24}
          weight="bold"
          color={theme.colors.text_on_brand_color}
        />
      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={300}
        customStyles={{
          container: styles.modal,
          draggableIcon: styles.indicator
        }}
      >
        {feedbackSent ? (
          <Success onSendAnotherFeedback={handleRestarFeedback} />
        ) : (
          <>
            {feedbackType ? (
              <Form
                feedbackType={feedbackType}
                onFeedbackCancelled={handleRestarFeedback}
                onFeedbackSent={handleFeedbackSent}
              />
            ): (
              <Options onFeedbackTypeChanged={setFeedbackType} />
            )}
          </>
        )}
      </BottomSheet>
    </>
  );
}
