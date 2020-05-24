import { Provider, ServiceReturn } from 'services/extenders/Provider';

import { tokenRetriever, tokenSigner } from 'utils';

export class Auth extends Provider {
    public refreshAuthToken(): ServiceReturn<'TokenRefreshData'> {
        const { userId } = tokenRetriever(this.request.headers.authorization, true);
        return {
            token: tokenSigner(userId),
        };
    }
}
