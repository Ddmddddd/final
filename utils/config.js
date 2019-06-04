// const eduBaseUrl = 'https://zjubiomedit.com/healtheducation/'

// const eduSubscribeApi = eduBaseUrl + 'api/data/subscribe'
// const eduTodayScheduleApi = eduBaseUrl + 'api/data/today?patientId='
// const eduTodayLoginApi = eduBaseUrl + 'api/data/login?patientId='
// const eduMainCoursesApi = eduBaseUrl + 'api/data/mainCourses?patientId='
// const eduScheduleAndCourseApi = eduBaseUrl + 'api/data/schedule?patientId='
// const eduWXKnowledgeDetailApi = eduBaseUrl + 'api/kno/wx/knowledge'
// const eduRecordApi = eduBaseUrl + 'api/data/record'
// const eduFavorApi = eduBaseUrl + 'api/data/favor'

/**
 * education experiment
 */
const expBaseUrl = 'https://zjubiomedit.com/eduexperimentdev/'
// const expBaseUrl = 'http://localhost:8080/'
/**
 * patient controller
 */
const expGetPatientInfo = expBaseUrl + 'api/patient/info?patientId='

// patientLogin
export const expPatientWxLogin = expBaseUrl + 'api/patient/wx/login' // POST
export const expPatientWxBindAccount = expBaseUrl + 'api/patient/wx/bindaccount' // POST
export const expPatientIsBoundWx = expBaseUrl + 'api/patient/wx/isbound' // POST

export const getPatientAvatarUrl = expBaseUrl + 'api/patient/wx/avatar' // GET

// 获取用户头像
const eduSubscribeApi = expBaseUrl + 'api/data/subscribe'
const eduTodayScheduleApi = expBaseUrl + 'api/data/today?patientId='
const eduTodayLoginApi = expBaseUrl + 'api/data/login?patientId='
const eduMainCoursesApi = expBaseUrl + 'api/data/mainCourses?patientId='
const eduScheduleAndCourseApi = expBaseUrl + 'api/data/schedule?patientId='
const eduWXKnowledgeDetailApi = expBaseUrl + 'api/kno/wx/knowledge'
const eduRecordApi = expBaseUrl + 'api/data/record'
const eduFavorApi = expBaseUrl + 'api/data/favor'

/**
 * personal controller
 */
const expGetPersonalToday = expBaseUrl + 'api/personal/today?patientId='
const expPersonalLearn = expBaseUrl + 'api/personal/learn?planId='
// const expPersonalReset = expBaseUrl + "api/personal/reset?planId="
/**
 * schedule controller
 */
const expScheduleComplete = expBaseUrl + 'api/schedule/complete?id='
const expScheduleIgnore = expBaseUrl + 'api/schedule/ignore?id='
const expSchedulePending = expBaseUrl + 'api/schedule/pending?id='
const expScheduleToday = expBaseUrl + 'api/schedule/today'
// const expScheduleTypeAll = expBaseUrl + "api/schedule/type/all"

export {
  // eduBaseUrl,
  eduSubscribeApi,
  eduTodayScheduleApi,
  eduTodayLoginApi,
  eduMainCoursesApi,
  eduScheduleAndCourseApi,
  eduWXKnowledgeDetailApi,
  eduRecordApi,
  eduFavorApi,

  expGetPatientInfo,
  expGetPersonalToday,
  expPersonalLearn,
  // expPersonalReset,

  expScheduleComplete,
  expScheduleIgnore,
  expSchedulePending,
  expScheduleToday,
}