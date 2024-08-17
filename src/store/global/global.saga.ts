import { put, takeLatest, call } from "@redux-saga/core/effects";
import { GlobalSettingData, globalActions } from "./global.slice";
// import globalApi from '@/services/global.service';
// import { GetGlobalSettingQueryResult } from '@/services/api';

function* handleGetGlobalSetting() {
  try {
    // const data: GetGlobalSettingQueryResult = yield call(
    //   globalApi.getGlobalSetting,
    // );
    // if (!data.data?.getGlobalSettings) return;
    // yield put(
    //   globalActions.setGlobalSetting(
    //     data.data?.getGlobalSettings as GlobalSettingData,
    //   ),
    // );
  } catch (error: any) {
    yield put(
      globalActions.pushNotification({
        message: error?.message,
        type: "error",
      })
    );
  }
}

export default function* globalSaga() {
  yield takeLatest(
    globalActions.getGlobalSettingStart.type,
    handleGetGlobalSetting
  );
}
