import { Linking, NativeModules, Platform } from 'react-native';

export type InvokeTMapRouteInfo = {
  rGoName: string; // 목적지명칭(필수)
  rGoX: number; // 목적지경도(필수)
  rGoY: number; // 목적지위도(필수)
  rStName?: string; // 출발지명칭
  rStX?: number; // 출발지경도
  rStY?: number; // 출발지위도
  rV1Name?: string; // 경유지1명칭
  rV1X?: number; // 경유지1 경도
  rV1Y?: number; // 경유지1 위도
  rV2Name?: string; // 경유지2명칭
  rV2X?: number; // 경유지2경도
  rV2Y?: number; // 경유지2위도
};

type InvokeTMapModule = {
  checkTmapApplicationInstalled: () => Promise<boolean>;
  invokeTMap: (routeInfo: InvokeTMapRouteInfo) => boolean;
};

const invokeTMapMoudle = NativeModules.RNInvokeTMapModule as InvokeTMapModule;

const googleStoreUrl = 'https://play.google.com/store/apps/details?id=';
const appstoreUrl = 'https://apps.apple.com/kr/app/';
const googleStoreTmapDownloadLink = `${googleStoreUrl}com.skt.tmap.ku`;
const appstoreTmapDownloadLink = `${appstoreUrl}tmap-%EB%82%B4%EB%B9%84%EA%B2%8C%EC%9D%B4%EC%85%98-%EC%A7%80%EB%8F%84/id431589174`;

/**
 * tmap이 store url
 */
export const TMAP_STORE_URL =
  Platform.OS === 'android'
    ? googleStoreTmapDownloadLink
    : appstoreTmapDownloadLink;

/**
 * tmap이 있는지 확인하는 함수
 */
export const checkTmapApplicationInstalled =
  invokeTMapMoudle.checkTmapApplicationInstalled;

/**
 * tmap으로 Navigate시키는 함수
 */
export const invokeTMap = (routeInfo: InvokeTMapRouteInfo) => {
  invokeTMapMoudle.invokeTMap(routeInfo);
};

/**
 * tmap이 있는지 확인하고
 *
 * o -> tmap으로
 *
 * x -> store로 가게 하는 기능이 혼합된 함수
 */

export const complexInvokeTMap = (routeInfo: InvokeTMapRouteInfo) => {
  checkTmapApplicationInstalled()
    .then((isExist) => {
      if (isExist) {
        invokeTMap(routeInfo);
      } else {
        Linking.openURL(TMAP_STORE_URL);
      }
    })
    .catch(() => {
      Linking.openURL(TMAP_STORE_URL);
    });
};
