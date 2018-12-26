import * as types from '../constants/ActionTypes';

const defaultState = {
    isLoggedIn: false,
    user: null,
    displaySelectCustomerModal: false,
    distributors: [],
    customers: [],
    selectedCustomer: null,
    distributorStops: [],
    message: '',
    resetMessage: '',
    signUpMessage: '',
    sendEmailModal: false,
    refreshSelectDistributors: false,
    DSDLinkAds: null
};

export default function reducer(state = defaultState, action) {
    let retString = '';
    switch (action.type) {
        case types.GET_INIT_DATA:
            return Object.assign({}, state, {
                isLoggedIn: true
            });
        case types.INIT_DATA_SUCCESSS:
            return Object.assign({}, state, {
                user: action.user,
                displaySelectCustomerModal: action.displaySelectCustomerModal,
                selectedCustomer: action.selectedCustomer
            });
        case types.RECEIVE_DISTRIBUTORS:
            return Object.assign({}, state, {
                distributors: action.distributors ? action.distributors : []
            });
        case types.RECEIVE_CUSTOMERS:
            return Object.assign({}, state, {
                customers: action.customers ? action.customers : []
            });
        case types.SELECT_CUSTOMER:
            return Object.assign({}, state, {
                selectedCustomer: action.customer,
                displaySelectCustomerModal: true,
                distributorStops: [],
                refreshSelectDistributors: false
            });
        case types.RESET_ADD_SHOP:
            return Object.assign({}, state, {
                displaySelectCustomerModal: true
            });
        case types.TOGGLE_SELECT_CUSTOMER_MODAL:
            return Object.assign({}, state, {
                displaySelectCustomerModal: !state.displaySelectCustomerModal
            });
        case types.RECEIVE_ADS:
            return Object.assign({}, state, {
                DSDLinkAds: action.DSDLinkAds
            });
        case types.RECEIVE_DISTRIBUTORS_STOPS:
            return Object.assign({}, state, {
                distributorStops: action.distributorStops,
                refreshSelectDistributors: true
            });
        case types.RECEIVE_CUSTOMERS_USERS_ROLES:
            return Object.assign({}, state, {
                customersUsersRoles: action.customersUsersRoles ? action.customersUsersRoles : [],
                setRolesResult: false
            });
        case types.SET_CUSTOMERS_USERS_ROLES_RESULT:
            return Object.assign({}, state, {
                setRolesResult: action.setRolesResult
            });
        
        case types.SET_PAYLINKINFO_RESULT:
            return Object.assign({}, state, {
                setPaylinkInfoResult: action.setPaylinkInfoResult
            });



        case types.LOGIN:
            return Object.assign({}, state, {
                message: ''
            });

        case types.LOGIN_NO_NETWORK:
            return Object.assign({}, state, {
                message: action.message
            });

        case types.SIGNUP_NO_NETWORK:
            return Object.assign({}, state, {
                signUpMessage: action.message
            });

        case types.RESET_NO_NETWORK:
            return Object.assign({}, state, {
                resetMessage: action.message
            });

        case types.RECEIVE_LOGIN_RESULT:
            let loginResults = action.results;

            return Object.assign({}, state, {
                message: loginResults ? loginResults.Message : '',
                isLoggedIn: loginResults ? loginResults.Message == 'True' : false
            });

        case types.RECEIVE_PASSWORD_RESET_RESULT:
            if (action.results === 'True') {
                return Object.assign({}, state, {
                    resetMessage: 'Reset Email sent successfully, please check your email to proceed'
                });
            } else if (action.results === 'False') {
                return Object.assign({}, state, {
                    resetMessage: 'Error sending Password reset email'
                });
            }

        case types.RECEIVE_USER_CREATE_RESULT_FAIL:
            retString = '';
            let isFirst = true;
            for (let i = 0; i < action.results.Messages.length; i++) {
                if (isFirst) {
                    isFirst = false;
                } else {
                    retString += '\r';
                }
                retString += action.results.Messages[i].Content;
            }
            return Object.assign({}, state, {
                signUpMessage: retString
            });

        case types.RECEIVE_USER_CREATE_RESULT_SUCCESS:
            const signUpStatus = 'Email sent successfully!';
            retString = 'Please check the email from DSDlink and click the link in the email to reset the password.';

            return Object.assign({}, state, {
                signUpStatus: signUpStatus,
                signUpMessage: retString,
                sendEmailModal: true
            });

        case types.LOGOUT_COMPLETED:
            return Object.assign({}, state, defaultState);

        // case types.RECEIVE_RECENT_ORDERS_NUM:
        //     return Object.assign({}, state, {
        //         recentOrdersNum: action.recentOrdersNum
        //     });
        case types.HIDE_EMAIL_MODAL:
            return Object.assign({}, state, {
                sendEmailModal: action.status
            })
        case types.RESET_SIGN_UP_MESSAGE:
            return Object.assign({}, state, {
                signUpMessage: ''
            })
        case types.RESET_MESSAGE:
            return Object.assign({}, state, {
                resetMessage: ''
            })
        default:
            return state;
    }
}