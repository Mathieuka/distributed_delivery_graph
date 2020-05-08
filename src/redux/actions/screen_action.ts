import { UI } from './type';

export const isSmallScreenAction = (isSmallScreen: boolean) => {
	return {
        type: UI.IS_SMALL_SCREEN,
        payload: isSmallScreen
    }
};
