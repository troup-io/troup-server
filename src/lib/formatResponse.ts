// TODO: Add dedupe to the response to enable reduction in response size.

export function formatResponse(response) {
    const success = !!response.data;
    const data = response.data ? Object.values(response.data).pop() : response.data;

    return {
        success,
        data,
        error: response.errors?.pop(),
    };
}
