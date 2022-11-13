# react-native-invoke-tmap

only invoke tmap module & vendored tmap sdk

## Installation (not yet)

```sh
yarn add react-native-invoke-tmap

//ios
npx pod-install
```

## Ios setting

```
//add TMAP_API_KEY in info plist
<dict>
    <key>TMAP_API_KEY</key>
    <string>Api key를 입력해주세요</string>
</dict>
```

## Android setting (not yet)

```
//add TMAP_API_KEY in local.properties
TMAP_API_KEY = "키를 입력해주세여"

//add in build.gradle(app)
//Properties를 선언하고 local.properties에 새로 등록된 api_key값을 load
Properties properties = new Properties()
properties.load(project.rootProject.file('local.properties').newDataInputStream())
android{
	...
    defaultConfig{
    	...
        //add
        buildConfigField "String","TMAP_API_KEY",properties['TMAP_API_KEY']
    }
}
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
