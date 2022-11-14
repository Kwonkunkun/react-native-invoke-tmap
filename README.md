# react-native-invoke-tmap

- only invoke tmap module
- tmap sdk
  ios: v2.1.1
  android: v1.7.5

## Installation

```sh
yarn add react-native-invoke-tmap

//ios
npx pod-install
```

## Ios setting

#### 1.key 추가

```
//in info plist
<dict>
    <key>TMAP_API_KEY</key>
    <string>Api key를 입력해주세요</string>
</dict>
```

#### 2.query 추가

```
//in info plist
<key>LSApplicationQueriesSchemes</key>
<array>
    <string>tmap</string>
</array>
```

## Android setting

#### 1.key 추가

```
//in android/app/src/AndroidManifest.xml
<application
//...>
//...
 <meta-data
      android:name="com.skt.tmap"
      android:value="api key를 입력해주세여" />
</application>
```

#### 2.query 추가

```
//in android/app/src/AndroidManifest.xml
<queries>
    <package android:name="com.skt.skaf.l001mtm091" />
    <package android:name="com.skt.tmap.ku" />
</queries>
```

## Usage

```js
import {
  checkTmapApplicationInstalled,
  invokeTMap,
  complexInvokeTMap,
  InvokeTMapRouteInfo,
} from 'react-native-invoke-tmap';

// ...

//data structure
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

//in react native components
export default function App() {
    //...
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
        //...
    )
}
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
