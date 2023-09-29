export const CONSTANT = {
  fetch_unattend_testlist_start: 'FETCH_UNATTEND_TESTLIST_START',
  fetch_unattend_testlist_success: 'FETCH_UNATTEND_TESTLIST_SUCCESS',
  fetch_unattend_testlist_error: 'FETCH_UNATTEND_TESTLIST_ERROR',

  fetch_comp_testlist_start: 'FETCH_COMP_TESTLIST_START',
  fetch_comp_testlist_success: 'FETCH_COMP_TESTLIST_SUCCESS',
  fetch_comp_testlist_error: 'FETCH_COMP_TESTLIST_ERROR',

  fetch_exam_attend_begin_start: 'FETCH_EXAM_ATTEND_BEGIN_START',
  fetch_exam_attend_begin_success: 'FETCH_EXAM_ATTEND_BEGIN_SUCCESS',
  fetch_exam_attend_begin_failed: 'FETCH_EXAM_ATTEND_BEGIN_FAILED',
  fetch_exam_begin_start: 'FETCH_EXAM_BEGIN_START',
  fetch_exam_begin_success: 'FETCH_EXAM_BEGIN_SUCCESS',
  fetch_exam_begin_failed: 'FETCH_EXAM_BEGIN_FAILED',
  //
  submit_answer_start: 'SUBMIT_ANSWER_START',
  submit_answer_success: 'SUBMIT_ANSWER_SUCCESS',
  submit_answer_failed: 'SUBMIT_ANSWER_FAILED',

  //
  clear_answer_start: 'CLEAR_ANSWER_START',
  clear_answer_success: 'CLEAR_ANSWER_SUCCESS',
  clear_answer_failed: 'CLEAR_ANSWER_FAILED',

  //
  finish_exam_start: 'FINISH_EXAM_START',
  finish_exam_success: 'FINISH_EXAM_SUCCESS',
  finish_exam_failed: 'FINISH_EXAM_FAILED',
  //
  exam_result_start: 'EXAM_RESULT_START',
  exam_result_success: 'EXAM_RESULT_SUCCESS',
  exam_result_failed: 'EXAM_RESULT_FAILED',

  fetch_discussionclasscount_start: 'FETCH_DISCUSSIONCLASSCOUNT_START',
  fetch_discussionclasscount_succes: 'FETCH_DISCUSSIONCLASSCOUNT_SUCCESS',
  fetch_discussionclasscount_error: 'FETCH_DISCUSSIONCLASSCOUNT_ERROR',

  fetch_discussionsubject_start: 'FETCH_DISCUSSIONSUBJECT_START',
  fetch_discussionsubject_succes: 'FETCH_DISCUSSIONSUBJECT_SUCCESS',
  fetch_discussionsubject_error: 'FETCH_DISCUSSIONSUBJECT_ERROR',

  fetch_discussionsubjectcount_start: 'FETCH_DISCUSSIONSUBJECTCOUNT_START',
  fetch_discussionsubjectcount_succes: 'FETCH_DISCUSSIONSUBJECTCOUNT_SUCCESS',
  fetch_discussionsubjectcount_error: 'FETCH_DISCUSSIONSUBJECTCOUNT_ERROR',

  fetch_discussuionlist_start: 'FETCH_DISCUSSIONLIST_START',
  fetch_discussuionlist_success: 'FETCH_DISCUSSIONLIST_SUCCESS',
  fetch_discussuionlist_error: 'FETCH_DISCUSSIONLIST_ERROR',

  fetch_discussuionChat_list_start: 'FETCH_DISCUSSIONCHAT_LIST_START',
  fetch_discussuionChat_list_success: 'FETCH_DISCUSSIONHAT_LIST_SUCCESS',
  fetch_discussuionChat_list_error: 'FETCH_DISCUSSIONCHAT_LIST_error',
};

export const initialState = {
  isLoading: true,
  isFetching_unattend_PracticeTestList: false,
  PracticeTestList: [],
  isFetching_comp_PracticeTestList: false,
  PracticeCompTestList: [],

  //
  TestList_has_next: false,
  TestList_page_index: 1,

  Discussuionchatlist: [],
  Discussuionchat_details: {},

  //
  test: {},
  isFetchingExamAttend: false,
  render_view: 'attempt',
  total_questions: 0,
  total_mark: 0,
  questions: [],
  batch_id: '',
  attempt_no: '',
  isFetchingExamResult: true,
  results: {},
  start_time: '',
};

export const Reducer = (state, action) => {
  // console.log(state, action, 'action');
  switch (action.type) {
    //practice test list
    case CONSTANT.fetch_unattend_testlist_start:
      return {
        ...state,
        isFetching_unattend_PracticeTestList: true,
      };
    case CONSTANT.fetch_unattend_testlist_success:
      return {
        ...state,
        isFetching_unattend_PracticeTestList: false,
        PracticeTestList:
          action.testlist.page.number === 1
            ? action.testlist.page.items
            : [...state.PracticeTestList, ...action.testlist.page.items],
        TestList_page_index: action.testlist.page.number,
        TestList_has_next: action.testlist.page.has_next,
      };
    case CONSTANT.fetch_unattend_testlist_error:
      return {
        ...state,
        isFetching_unattend_PracticeTestList: true,
      };
    //
    //practice test list
    case CONSTANT.fetch_comp_testlist_start:
      return {
        ...state,
        isFetching_comp_PracticeTestList: true,
      };
    case CONSTANT.fetch_comp_testlist_success:
      return {
        ...state,
        isFetching_comp_PracticeTestList: false,
        PracticeCompTestList:
          action.testlist.page.number === 1
            ? action.testlist.page.items
            : [...state.PracticeCompTestList, ...action.testlist.page.items],
        TestList_page_index: action.testlist.page.number,
        TestList_has_next: action.testlist.page.has_next,
      };
    case CONSTANT.fetch_comp_testlist_error:
      return {
        ...state,
        isFetching_comp_PracticeTestList: true,
      };
    //
    // Exam aTTEND
    case CONSTANT.fetch_exam_attend_begin_start:
      return {
        ...state,
        isFetchingExamAttend: true,
        current_index: 0,
      };
    case CONSTANT.fetch_exam_attend_begin_success:
      return {
        ...state,
        isFetchingExamAttend: false,
        test: action.test,
        total_questions: action.tot_qns,
        total_mark: action.total_mark,
        // buttonLoading: action.buttonLoading,
        // failed_reason: action.failed_reason,
        render_view: action.render_view,
      };
    case CONSTANT.fetch_exam_begin_failed:
      return {
        ...state,
        isFetchingExamAttend: false,
      };
    // Exam Start
    case CONSTANT.fetch_exam_begin_start:
      return {
        ...state,
        isFetchingExamStart: true,
        current_index: 0,
      };
    case CONSTANT.fetch_exam_begin_success:
      return {
        ...state,
        isFetchingExamStart: false,
        test: action.test,
        questions: action.questions,
        render_view: action.render_view,
        batch_id: action.batch_id,
        attempt_no: action.attempt_no,
        start_time: action.start_time,
      };
    case CONSTANT.fetch_exam_begin_failed:
      return {
        ...state,
        isFetchingExamStart: false,
      };
    // Submit Answer
    case CONSTANT.submit_answer_start:
      return {
        ...state,
        buttonLoading: true,
      };
    case CONSTANT.submit_answer_success:
      return {
        ...state,
        buttonLoading: false,
        questions: action.questions,
      };
    case CONSTANT.submit_answer_failed:
      return {
        ...state,
        buttonLoading: true,
      };
    //
    // Clear Answer
    case CONSTANT.clear_answer_start:
      return {
        ...state,
        buttonLoading: true,
      };
    case CONSTANT.clear_answer_success:
      return {
        ...state,
        buttonLoading: false,
        questions: action.questions,
      };
    case CONSTANT.clear_answer_failed:
      return {
        ...state,
        buttonLoading: false,
      };
    // Finish Exam
    case CONSTANT.finish_exam_start:
      return {
        ...state,
        buttonLoading: true,
      };
    case CONSTANT.finish_exam_success:
      return {
        ...state,
        buttonLoading: false,
      };
    case CONSTANT.finish_exam_failed:
      return {
        ...state,
        buttonLoading: false,
      };
    // Exam Result
    case CONSTANT.exam_result_start:
      return {
        ...state,
        isFetchingExamResult: true,
      };
    case CONSTANT.exam_result_success:
      return {
        ...state,
        isFetchingExamResult: false,
        results: action.results,
      };
    case CONSTANT.exam_result_failed:
      return {
        ...state,
        isFetchingExamResult: true,
      };
    default:
      return state;
  }
};
