import React, { useRef } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { ChatTeardropDots, TextT } from 'phosphor-react-native';
import BottomSheet from "react-native-raw-bottom-sheet";

import { styles } from './styles';
import { theme } from "../../theme";
import { getBottomSpace } from "react-native-iphone-x-helper";

export function Widget() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  function handleOpen() {
    bottomSheetRef.current?.open();
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
        <Text>something</Text>
      </BottomSheet>
    </>
  );
}
