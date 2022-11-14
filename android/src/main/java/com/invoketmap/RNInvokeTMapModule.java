package com.invoketmap;

import android.content.pm.ApplicationInfo;
import android.content.pm.PackageManager;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.skt.Tmap.TMapTapi;

import java.util.HashMap;
import java.util.Map;

public class RNInvokeTMapModule extends ReactContextBaseJavaModule{
    private final ReactApplicationContext curAppContext;

    RNInvokeTMapModule(ReactApplicationContext context){
        super(context);

        //키 인증
        TMapTapi tmaptapi = new TMapTapi(context);
        tmaptapi.setSKTMapAuthentication(getApiKey(context));
        curAppContext = context;
    }

  public static String getApiKey(ReactApplicationContext context)
  {
    String apiKey = null;
    try
    {
      ApplicationInfo appInfo = context.getPackageManager().getApplicationInfo(context.getPackageName(), PackageManager.GET_META_DATA);
      apiKey = appInfo.metaData.getString("com.skt.tmap");
    }
    catch (Exception e)
    {
      e.printStackTrace();
    }
    return apiKey;
  }

    @ReactMethod
    public void checkTmapApplicationInstalled(Promise promise){
        try {
            TMapTapi tmaptapi = new TMapTapi(curAppContext);
            Boolean haveTMapApp = tmaptapi.isTmapApplicationInstalled();
            promise.resolve(haveTMapApp);
        } catch(Exception e) {
            promise.reject("Create Event Error", e);
        }
    }

    @ReactMethod
    public void invokeTMap(ReadableMap routeInfo) {
        TMapTapi tmaptapi = new TMapTapi(curAppContext);

        //convert hashMap<string, object> to <string, string>
        Map<String, String> map = new HashMap<String, String>();
        for (Map.Entry<String, Object> entry : routeInfo.toHashMap().entrySet()) {
            map.put(entry.getKey(), entry.getValue().toString());
        }
        tmaptapi.invokeRoute((HashMap<String, String>) map);
    }

    @Override
    public String getName() {
        return "RNInvokeTMapModule";
    }
}
