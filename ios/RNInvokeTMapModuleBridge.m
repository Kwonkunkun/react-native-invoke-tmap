#import <Foundation/Foundation.h>
#import <React/RCTBridge.h>

@interface RCT_EXTERN_MODULE(RNInvokeTMapModule, NSObject)

RCT_EXTERN_METHOD(checkTmapApplicationInstalled:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
RCT_EXTERN_METHOD(invokeTMap:(NSDictionary *)routeInfo)

+ (BOOL)requiresMainQueueSetup
{
    return YES;
}

@end
