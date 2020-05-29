import { Provider, ServiceReturn } from 'services/extenders/Provider';

import { tokenSigner } from 'utils';

export class Auth extends Provider {
    public refreshAuthToken(): ServiceReturn<'TokenRefreshData'> {
        const userId = this.getUserId();

        return {
            token: tokenSigner(userId),
        };
    }
}
