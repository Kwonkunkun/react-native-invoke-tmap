import Foundation
import TMapSDK

@objc(RNInvokeTMapModule)
class RNInvokeTMapModule: NSObject{
  
  //Init에 api key 인증
  override init() {
    super.init()
    guard let TMAP_API_KEY = Bundle.main.object(forInfoDictionaryKey: "TMAP_API_KEY") as? String else {
      return
    }
    TMapApi.setSKTMapAuthenticationWithDelegate(self, apiKey: TMAP_API_KEY)
  }
  
  //TMap이 설치되었는지 확인
  @objc func checkTmapApplicationInstalled(_ resolve:RCTPromiseResolveBlock, rejecter reject:RCTPromiseRejectBlock) -> Void {
    let isInstalled = TMapApi.isTmapApplicationInstalled();
    if(isInstalled){
      resolve(isInstalled)
    }else{
      reject("1234", "no is not there", nil)
    }
  }
  
  //받은 routeInfo를 이용해서 TMap에 넘김
  @objc func invokeTMap(_ routeInfo: Dictionary<String,Any>) -> Bool {
    let isInstalled = TMapApi.invokeRoute(routeInfo)
    return isInstalled;
  }
}

extension RNInvokeTMapModule: TMapTapiDelegate {
  func SKTMapApikeySucceed() {
    print("TMap api key 인증이 성공되었습니다")
  }
  
  func SKTMapApikeyFailed(error: NSError?) {
    print(error ?? "TMap api key 인증에 실패했습니다.")
  }
}
