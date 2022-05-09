import { ArrowLeft } from "phosphor-react-native";
import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image
} from "react-native";
import { captureScreen } from "react-native-view-shot";
import { theme } from "../../theme";
import { feedbackTypes } from "../../utils/feedbackTypes";
import { FeedbackType } from "../widget";
import { ScreenshotButton } from "../screenshotButton";
import { Button } from "../button";
import { styles } from "./styles";
import { api } from "../../services/api";
import * as FileSystem from 'expo-file-system';

interface Props {
  feedbackType: FeedbackType;
  onFeedbackCancelled: () => void;
  onFeedbackSent: () => void;
}

export function Form({ feedbackType, onFeedbackCancelled, onFeedbackSent }: Props) {
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');

  const feedbackTypeInfo = feedbackTypes[feedbackType];

  async function handleScreenshot() {
    try {
      const uri = await captureScreen({
        format: 'jpg',
        quality: 0.8,
      });
  
      setScreenshot(uri);
    } catch (err) {
      console.error(err);
    }
  }

  function handleScreenshotRemove() {
    setScreenshot(null);
  }

  async function handleSendFeedback() {
    if (isSendingFeedback) {
      return;
    }

    setIsSendingFeedback(true);
    const screenshotBase64 = screenshot && await FileSystem.readAsStringAsync(screenshot, { encoding: 'base64' });

    try {

      await api.post('/feedbacks', {
        type: feedbackType,
        screenshot: `data:image/png;base64,${screenshot}`,
        comment
      });

      onFeedbackSent();
    } catch (error) {
      console.error(error);
      setIsSendingFeedback(false);
    }
  } 

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={onFeedbackCancelled}
        >
          <ArrowLeft
            size={24}
            weight="bold"
            color={theme.colors.text_secondary}
          />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Image source={feedbackTypeInfo.image} style={styles.image} />
          <Text style={styles.titleText}>
            {feedbackTypeInfo.title}
          </Text>
        </View>
      </View>

      <TextInput
        multiline
        style={styles.input}
        placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
        placeholderTextColor={theme.colors.text_secondary}
        autoCorrect={false}
        onChangeText={setComment}
      />

      <View style={styles.footer}>
        <ScreenshotButton
          onTakeShot={handleScreenshot}
          onRemoveShot={handleScreenshotRemove}
          screenshot={screenshot}
        />

        <Button
          onPress={handleSendFeedback}
          isLoading={isSendingFeedback}
        />
      </View>
    </View>
  );
}