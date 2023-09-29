import React, {
  useReducer,
  createContext,
  useMemo,
  useEffect,
  useContext,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Reducer, initialState, CONSTANT} from './TestReducer';
import {UserContext} from '../../../store/UserContext';

const PAGE_COUNT = 20;

const storeData = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@testData', jsonValue);
  } catch (e) {
    // saving error
  }
};

export const TestContext = createContext();

const TestProvider = props => {
  const {getData, postData, showToast, postFormData, session_data} =
    useContext(UserContext);

  const [state, dispatch] = useReducer(Reducer, initialState);

  const testContext = useMemo(
    () => ({
      GetPracticeUnattended_TestList: (status_select = '') => {
        dispatch({
          type: CONSTANT.fetch_unattend_testlist_start,
        });
        getData(`/students/list-tests/?status_select=${status_select}`)
          .then(res => {
            if (res) {
              let response = res.data;
              console.log(res, 'practice test live from context');
              if (response.status) {
                dispatch({
                  type: CONSTANT.fetch_unattend_testlist_success,
                  testlist: response,
                });
              } else {
                showToast(response.reason);
                dispatch({
                  type: CONSTANT.fetch_unattend_testlist_error,
                });
              }
            } else {
              showToast('Something went wrong');
              dispatch({
                type: CONSTANT.fetch_unattend_testlist_error,
              });
            }
          })
          .catch(err => console.log(err.message, 'error message'));
      },
      GetPracticeCompleted_TestList: (status_select = '') => {
        dispatch({
          type: CONSTANT.fetch_comp_testlist_start,
        });
        getData(`/students/list-tests/?status_select=${status_select}`)
          .then(res => {
            if (res) {
              let response = res.data;
              console.log(res, 'practice test live from context');
              if (response.status) {
                dispatch({
                  type: CONSTANT.fetch_comp_testlist_success,
                  testlist: response,
                });
              } else {
                showToast(response.reason);
                dispatch({
                  type: CONSTANT.fetch_comp_testlist_error,
                });
              }
            } else {
              showToast('Something went wrong');
              dispatch({
                type: CONSTANT.fetch_comp_testlist_error,
              });
            }
          })
          .catch(err => console.log(err.message, 'error message'));
      },
      GetTestDetails: test_id => {
        dispatch({
          type: CONSTANT.fetch_exam_attend_begin_start,
        });
        getData(`/students/attend-practice-test/${test_id}/`).then(res => {
          console.log('Responce Attempt Exam', res);
          if (res) {
            const response = res.data;
            if (response.status) {
              dispatch({
                type: CONSTANT.fetch_exam_attend_begin_success,
                test: response.test,
                tot_qns: response.question_count,
                total_mark: response.mark,
                render_view: 'attempt',
              });
            } else {
              showToast('Something went wrong');
              dispatch({
                type: CONSTANT.fetch_exam_attend_begin_failed,
              });
            }
          } else {
            showToast('Something went wrong');
            dispatch({
              type: CONSTANT.fetch_exam_attend_begin_failed,
            });
          }
        });
      },
      //Start Exam
      startTest: test_id => {
        dispatch({
          type: CONSTANT.fetch_exam_begin_start,
        });
        getData(`/students/start-test/${test_id}/`).then(res => {
          console.log(res, 'start response');
          if (res) {
            const response = res.data;
            if (response.status) {
              if (response.available) {
                if (response.questions.length > 0) {
                  // const t = new Date(`${response.stop_time}Z`);
                  //   t.setTime(t.getTime() + t.getTimezoneOffset() * 60 * 1000);
                  //   const stop_time = t.getTime();
                  //   console.log(response.stop_time,stop_time,"poi");
                  dispatch({
                    type: CONSTANT.fetch_exam_begin_success,
                    test: response.test,
                    questions: response.questions,
                    batch_id: response.batch_id,
                    attempt_no: response.attempt ? response.attempt.id : '',
                    start_time: response.first_time
                      ? ''
                      : response.attempt.started_time,
                    render_view: 'take_exam',
                  });
                } else {
                  showToast('There is no Questions under this Exam');
                  // NavigationRef.goBack();
                }
              } else {
                showToast(
                  response.reason ? response.reason : ' Something went wrong',
                );
              }
            } else {
              showToast(
                response.reason ? response.reason : ' Something went wrong',
              );
              dispatch({
                type: CONSTANT.fetch_exam_begin_failed,
              });
            }
          } else {
            showToast('Something went wrong');
            dispatch({
              type: CONSTANT.fetch_exam_begin_failed,
            });
          }
        });
      },
      // Submit Answer
      submitAnswer: (
        full_question = [],
        question = {},
        answer_ids = [],
        test_id = '',
        attempt_no,
        current_index,
        batch_id,
      ) => {
        console.log(
          question,
          answer_ids,
          test_id,
          attempt_no,
          current_index,
          'props',
        );
        let questions = full_question;
        console.log(questions, 'subm questions');
        let quest = questions[current_index];
        console.log(quest, 'subm quest');
        dispatch({
          type: CONSTANT.submit_answer_start,
        });

        const formData = new FormData();
        formData.append('question', question.id);
        formData.append('answers[]', answer_ids);
        formData.append('attempt_id', attempt_no);
        formData.append('batch_id', batch_id);

        postFormData(`/students/save-answer-in-app/${test_id}/`, formData).then(
          response => {
            if (response) {
              response = response.data;
              console.log('Submit ANswer', response);
              if (response.status) {
                quest.choices_list.map((ans, i) => {
                  if ([answer_ids].includes(ans.id)) {
                    ans.selected = true;
                    quest.choices_list[i] = ans;
                  } else if (!quest.multiple_answer) {
                    ans.selected = false;
                    quest.choices_list[i] = ans;
                  }
                });
                questions[current_index] = quest;
                questions[current_index].answered = true;
                console.log('questions', quest);
                dispatch({
                  type: CONSTANT.submit_answer_success,
                  questions: questions,
                });
              } else {
                showToast('Submit Answer Failed');
                dispatch({
                  type: CONSTANT.submit_answer_failed,
                });
              }
            } else {
              showToast('Submit Answer Failed');
              dispatch({
                type: CONSTANT.submit_answer_failed,
              });
            }
          },
        );
        // } else {
        //   showToast('Answer Submit failed');
        // }
      },
      // Clear Answer
      ClearAnswer: (
        question = {},
        questions,
        current_index,
        attempt_no,
        test_id,
        batch_id,
      ) => {
        dispatch({
          type: CONSTANT.clear_answer_start,
        });

        const formData = new FormData();
        formData.append('question', question.id);
        formData.append('attempt_id', attempt_no);
        formData.append('batch_id', batch_id);

        postFormData(
          `/students/clear-answer-in-app/${test_id}/`,
          formData,
        ).then(response => {
          if (response) {
            response = response.data;
            console.log('Submit ANswer', response);
            if (response.status) {
              // examContext.examDetails(test, course);
              // dispatch({
              //   type: CONSTANT.clear_answer_success,
              // });
              let quest = questions[current_index];
              quest.choices_list.map((ans, i) => {
                ans.selected = false;
                quest.choices_list[i] = ans;
              });
              console.log(quest, 'quest');
              questions[current_index] = quest;
              questions[current_index].answered = false;
              console.log(questions, 'questionsfinall');
              dispatch({
                type: CONSTANT.submit_answer_success,
                questions: questions,
              });
            } else {
              showToast('Clear Answer Failed');
              dispatch({
                type: CONSTANT.clear_answer_failed,
              });
            }
          } else {
            showToast('Clear Answer Failed');
            dispatch({
              type: CONSTANT.clear_answer_failed,
            });
          }
        });
        // } else {
        //   showToast('Answer Clear failed');
        // }
      },
      // Finish Exam
      FinishTest: (test_id, attempt_no) =>
        new Promise(resolve => {
          dispatch({
            type: CONSTANT.finish_exam_start,
          });
          const formData = new FormData();
          formData.append('attempt_id', attempt_no);
          postFormData(
            `/students/finish-test-in-app/${test_id}/`,
            formData,
          ).then(res => {
            if (res) {
              console.log(res, 'finsihexam');
              const response = res.data;
              if (response.status) {
                dispatch({
                  type: CONSTANT.finish_exam_success,
                });
                setTimeout(() => {
                  testContext.TestResults(test_id);
                }, 500);
                resolve(response);
                showToast(
                  response.message ? response.message : 'finished exam',
                );
              } else {
                showToast(
                  response.reason ? response.reason : 'Something went wrong',
                );
                dispatch({
                  type: CONSTANT.finish_exam_failed,
                });
                resolve(null);
              }
            } else {
              showToast('Something went wrong');
              resolve(null);
            }
          });
        }),
      // Exam Result
      TestResults: test_id => {
        dispatch({
          type: CONSTANT.exam_result_start,
        });
        getData(`/students/view-testresult-in-app/${test_id}/`).then(res => {
          console.log('Responce result Exam', res);
          if (res) {
            const response = res.data;
            if (response.status) {
              // if (response.questions.length > 0) {
              dispatch({
                type: CONSTANT.exam_result_success,
                results: response,
              });
              // } else {
              //   showToast('There is no Questions under this Exam');
              //   NavigationRef.goBack();
              // }
            } else {
              showToast(
                response.reason ? response.reason : 'Something went wrong',
              );
              NavigationRef.goBack();
              dispatch({
                type: CONSTANT.exam_result_failed,
              });
            }
          } else {
            showToast('Something went wrong');
            dispatch({
              type: CONSTANT.exam_result_failed,
            });
          }
        });
      },

      GetDiscussionClassListCount: () => {
        dispatch({
          type: CONSTANT.fetch_discussionclasscount_start,
        });
        getData('/staff/list-discussion-class-count/')
          .then(res => {
            if (res) {
              let response = res.data;
              console.log(res, 'discussin class count:');
              if (response.status) {
                dispatch({
                  type: CONSTANT.fetch_discussionclasscount_succes,
                  classlist: response,
                });
              } else {
                showToast(response.reason);
                dispatch({
                  type: CONSTANT.fetch_discussionclasscount_error,
                });
              }
            } else {
              showToast('Something went wrong');
              dispatch({
                type: CONSTANT.fetch_discussionclass_error,
              });
            }
          })
          .catch(err => console.log(err.message, 'error message'));
      },
      GetDiscussionSubjectList: (class_id = '') => {
        dispatch({
          type: CONSTANT.fetch_discussionsubject_start,
        });
        getData(`/staff/list-discussion-subject/?class_pk=${class_id}`)
          .then(res => {
            console.log(res, 'discussin sublist:');
            if (res) {
              let response = res.data;
              if (response.status) {
                dispatch({
                  type: CONSTANT.fetch_discussionsubject_succes,
                  Sublist: response.subject_list,
                });
              } else {
                showToast(response.reason);
                dispatch({
                  type: CONSTANT.fetch_discussionsubject_error,
                });
              }
            } else {
              showToast('Something went wrong');
              dispatch({
                type: CONSTANT.fetch_discussionsubject_error,
              });
            }
          })
          .catch(err => console.log(err.message, 'error message'));
      },
      GetDiscussionSubjectListCount: (class_id = '') => {
        dispatch({
          type: CONSTANT.fetch_discussionsubject_start,
        });
        getData(`/staff/list-discussion-subject-count/?class_pk=${class_id}`)
          .then(res => {
            console.log(res, 'discussion sublist count:');
            if (res) {
              let response = res.data;
              if (response.status) {
                dispatch({
                  type: CONSTANT.fetch_discussionsubjectcount_succes,
                  Sublist: response.subject_list,
                });
              } else {
                showToast(response.reason);
                dispatch({
                  type: CONSTANT.fetch_discussionsubjectcount_error,
                });
              }
            } else {
              showToast('Something went wrong');
              dispatch({
                type: CONSTANT.fetch_discussionsubjectcount_error,
              });
            }
          })
          .catch(err => console.log(err.message, 'error message'));
      },
      GetDiscussionList: (
        class_id,
        subject_id,
        status_filter = '',
        order_filter = '',
        page = 1,
        filter = false,
        searchkey = '',
      ) =>
        new Promise((resolve, reject) => {
          if (!filter) {
            dispatch({
              type: CONSTANT.fetch_discussuionlist_start,
            });
          }
          getData(
            `/staff/list-discussion/?class_filter=${class_id}&subject_id=${subject_id}&search=${searchkey}&status_filter=${status_filter}&order_filter=${order_filter}&page=${page}&page_count=${PAGE_COUNT}&new_app=true`,
          ).then(res => {
            console.log(res, 'discussin list resp:');
            if (res) {
              let response = res.data;
              if (response.status) {
                dispatch({
                  type: CONSTANT.fetch_discussuionlist_success,
                  discussionlist: response,
                });
                resolve(response);
              } else {
                showToast(
                  response.reason ? response.reason : 'Something went wrong',
                );
                dispatch({
                  type: CONSTANT.fetch_discussuionlist_error,
                });
              }
            } else {
              showToast('Something went wrong');
              dispatch({
                type: CONSTANT.fetch_discussuionlist_error,
              });
            }
          });
        }),

      GetDiscussionChatView: (discussionid, filter = false) => {
        if (!filter) {
          dispatch({
            type: CONSTANT.fetch_discussuionChat_list_start,
          });
        }
        getData(`/staff/view-discussion/${discussionid}/`).then(res => {
          if (res) {
            let response = res.data;
            if (response.status) {
              dispatch({
                type: CONSTANT.fetch_discussuionChat_list_success,
                chatdata: response,
              });
            } else {
              showToast(response.reason);
              dispatch({
                type: CONSTANT.fetch_discussuionChat_list_error,
              });
            }
          } else {
            showToast('Something went wrong');
            dispatch({
              type: CONSTANT.fetch_discussuionChat_list_error,
            });
          }
        });
      },
      DiscussuionSendMessage: (msg, image, type, discussionid) =>
        new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append('message', msg);
          if (type === 'ImageUpload') {
            formData.append('image', image);
          } else if (type === 'audio') {
            formData.append('audio', image);
          }
          postFormData(`/staff/view-discussion/${discussionid}/`, formData)
            .then(res => {
              console.log(res, 'ress');
              resolve(res);
            })
            .catch(err => {
              console.log(err.message, 'message');
            });
        }),
      DiscussionCreate: (title, msg, imageData, subject_id, class_id) =>
        new Promise(resolve => {
          const formData = new FormData();
          formData.append('title', title);
          formData.append('description', msg);
          formData.append('classes', class_id);

          if (imageData) {
            var file = {
              name: imageData.fileName,
              type: imageData.mime,
              uri: imageData.uri,
            };
            formData.append('image', file);
          }
          formData.append('subject', subject_id);
          postFormData('/staff/add-discussion/', formData)
            .then(res => {
              resolve(res);
            })
            .catch(err => {});
        }),

      DisscusionClose: (id, data, imageData) =>
        new Promise(resolve => {
          const formData = new FormData();
          formData.append('note', data);
          if (imageData) {
            var file = {
              name: imageData.fileName,
              type: imageData.mime,
              uri: imageData.uri,
            };
            formData.append('close_image', file);
          }

          postData(`/staff/close-discussion/${id}/`, formData)
            .then(res => {
              resolve(res);
              return res;
            })
            .catch(err => {
              console.log(err.message, 'error message');
            });
        }),
    }),
    [getData, postData, postFormData],
  );

  useEffect(() => {
    // For cache
    const initialize = async () => {
      let testData;

      try {
        testData = await AsyncStorage.getItem('@testData');
      } catch (e) {
        // Restoring token failed
      }
      dispatch({
        type: 'RESTORE_TOKEN',
        state: testData ? JSON.parse(testData) : {},
      });
    };
    if (state.isLoading) {
      initialize();
    } else {
      storeData(state);
    }
  }, [state]);

  return (
    <TestContext.Provider
      value={{...testContext, ...state, showToast, session_data}}>
      {props.children}
    </TestContext.Provider>
  );
};

TestProvider.Provider = TestProvider;
export {TestProvider};
