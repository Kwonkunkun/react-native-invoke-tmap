import React, { useState } from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {
  checkTmapApplicationInstalled,
  invokeTMap,
  complexInvokeTMap,
  InvokeTMapRouteInfo,
} from 'react-native-invoke-tmap';

const routeInfo: InvokeTMapRouteInfo = {
  rGoName: '강남역', // 목적지명칭(필수)
  rGoX: 127.027621, // 목적지경도(필수)
  rGoY: 37.497942, // 목적지위도(필수)
  rStName: '서울역', // 출발지명칭
  rStX: 126.972646, // 출발지경도
  rStY: 37.553017, // 출발지위도
  rV1Name: '용산역', // 경유지1명칭
  rV1X: 126.964775, // 경유지1 경도
  rV1Y: 37.52989, // 경유지1 위도
  rV2Name: '사당역', // 경유지2명칭
  rV2X: 126.981633, // 경유지2경도
  rV2Y: 37.476559, // 경유지2위도
};

export default function App() {
  const [isTMapExist, setIsTMapExist] = useState(false);

  const onPressCheckTMapExistButton = () => {
    checkTmapApplicationInstalled()
      .then((isExist) => {
        if (isExist) {
          setIsTMapExist(true);
        } else {
          setIsTMapExist(false);
        }
      })
      .catch(() => {
        setIsTMapExist(false);
      });
  };

  const onPressInvokeTMap = () => {
    invokeTMap(routeInfo);
  };

  const onPressComplexInvokeTMap = () => {
    complexInvokeTMap(routeInfo);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPressCheckTMapExistButton}
      >
        <Text> {`Is tmap exist in my phone? ${isTMapExist ? 'o' : 'x'}`}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPressInvokeTMap}>
        <Text> {'Ivoke TMap'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={onPressComplexInvokeTMap}
      >
        <Text>
          {'Ivoke TMap, but if not there in my phone, go to store link'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 20,
  },
});
