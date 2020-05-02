// TODO: Add dedupe to the response to enable reduction in response size.

export function formatResponse({ errors, ...response }): unknown {
    let data = response?.data;
    const success = !!data;

    if (data && !data.__schema) {
        data = Object.values(data).pop();
    }

    return {
        success,
        ...response,
        data,
        errors,
    };
}
