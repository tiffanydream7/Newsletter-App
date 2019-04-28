const api = '/api/users';

$.ajax({
    method: 'GET',
    url: api,
    success: handleSuccess,
    error: handleError
});

function handleSuccess(res) {
    let totalEntries = res.length;

}