import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
} from "@gorhom/bottom-sheet";
import React, {
  memo,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { BackHandler, Keyboard, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface AppBottomSheetProps extends Omit<BottomSheetModalProps, "ref"> {
  children: ReactNode;
  optionsRef: RefObject<BottomSheetModal>;
  snapPointsArray: (string | number)[];
  handleDismiss?: () => void;
  handleChange?: (index: number) => void;
  showBackDrop?: boolean;
}

const AppBottomSheet: React.FC<AppBottomSheetProps> = ({
  children,
  optionsRef,
  snapPointsArray,
  index,
  handleDismiss,
  handleChange,
  enableContentPanningGesture = true,
  showBackDrop = true,
  ...rest
}) => {
  const insets = useSafeAreaInsets();
  const snapPoints = useMemo(() => snapPointsArray, [snapPointsArray]);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  // const { isDarkColorScheme } = useColorScheme();
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={index}
      />
    ),
    [index]
  );

  const handleBackPress = useCallback(() => {
    if (isBottomSheetOpen) {
      optionsRef?.current?.dismiss();
      return true; // Prevent default back action
    }
    return false; // Allow default back action
  }, [isBottomSheetOpen, optionsRef]);

  useEffect(() => {
    const backSub = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress,
    );
    const kbSub = Keyboard.addListener('keyboardDidHide', () => {
      /* If you need to snap on keyboard hide, do it here */
    });

    return () => {
      backSub.remove();
      kbSub.remove();
    };
  }, [handleBackPress]);

  const handleSheetChanges = useCallback(
    (sheetIndex: number) => {
      setIsBottomSheetOpen(sheetIndex !== -1);
      if (handleChange) {
        handleChange(sheetIndex);
      }
    },
    [handleChange]
  );

  return (
    <BottomSheetModal
      enableHandlePanningGesture={true}
      ref={optionsRef}
      index={index}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      enableContentPanningGesture={enableContentPanningGesture}
      backdropComponent={showBackDrop ? renderBackdrop : undefined}
      handleIndicatorStyle={{
        width: 55,
        height: 8,
        // backgroundColor: isDarkColorScheme ? "#FFFFFF" : "#e5e7eb",
      }}
      enableDynamicSizing={false}
      handleStyle={{
        // backgroundColor: isDarkColorScheme ? "#0A0A0C" : "#FFFFFF",
        borderRadius: 24,
      }}
      backgroundStyle={{
        // backgroundColor: isDarkColorScheme ? "#0A0A0C" : "#FFFFFF",
      }}
      key={1}
      onDismiss={() => {
        setIsBottomSheetOpen(false);
        if (handleDismiss) {
          handleDismiss();
        }
      }}
      onChange={handleSheetChanges}
      {...rest}
    >
      {children}
      <View style={{ height: insets.bottom }}></View>
    </BottomSheetModal>
  );
};

export default memo(AppBottomSheet);
