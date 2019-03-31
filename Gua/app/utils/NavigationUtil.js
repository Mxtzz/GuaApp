// import { Alert } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
// import Logger from './Logger';

const reset = (navigation, routeName) => {
    const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: routeName })]
    });
    navigation.dispatch(resetAction);
};

const navigateStack = (navigation, stackName, pageName, index, params) => {
    const subAction = StackActions.reset({
        index: index,
        actions: [NavigationActions.navigate({
            routeName: pageName,
            params: params ? params : {}
        })]
    });

    navigation.dispatch(NavigationActions.navigate({
        routeName: stackName,
        action: subAction
    }));
}

export default { reset, navigateStack };