// TODO: Add dedupe to the response to enable reduction in response size.

export function formatResponse(response) {
    const success = !!response.data;
    let data: any = response.data;

    if (data && !data?.__schema) {
        data = data ?? Object.values(data).pop();
    }

    return {
        success,
        data,
        error: response.errors?.pop(),
    };
}
