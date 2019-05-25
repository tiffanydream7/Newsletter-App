const api = '/api/users';

$.ajax({
    method: 'GET',
    url: api,
    success: handleSuccess,
    error: handleError
});

function handleSuccess(res) {
    console.log(res)
    res.forEach(user => {
        console.log(user.firstName)
        $('tbody').append(`
            <tr>
                <td></td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.email}</td>
                <td>${user.signUpDate.slice(0, 10)}</td>
            </tr>`
        )
    });

}

function handleError(err) {
    console.log(err)
}