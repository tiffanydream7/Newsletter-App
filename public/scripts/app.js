// Modal popup
const showModal = () => {
    setTimeout(() => {
        console.log('in setTimeout');
        const modal = document.getElementById('my-modal');
        modal.style.display = 'block';
    }, 1000);
}
showModal();

// Subscribe
$('#signup').on('click', function (e) {
    e.preventDefault();
    $('.erro').remove();
    // Assume the POST request has no errors; we will make it true if any validation doesn't work
    let errors = false;
    // $('#nameForm').append('<p>Test</p>');
    let fullName = $('#name').val();
    let firstName = fullName.split('')[0];
    let lastName = lastName.split('')[1];
    let email = $('#email').val();
    // name validation
    // special character regex
    let nameRegex = RegExp('^[a-zA-Z ]{2,30}$');

    if (!firstName) {
        errors = true;
        $('#nameForm').append('<p class="error">Please enter both a first and last name.</p>');
    } else if (!lastName) {
        errors = true;
        $('#nameForm').append('<p class="error">Please enter both a first and last name.</p>');
    } else if (firstName.match(/\d+/g) || lastName.match(/\d/g)) {
        errors = true;
        $('#nameForm').append('<p class="error">Please use letters only in your name, no numbers.</p>');
    } else if (!firstName.charAt(2) || !lastName.charAt(2)) {
        errors = true;
        $('#nameForm').append('<p class="error">Please write your full name, not initials.</p>');
    } else if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
        errors = true;
        $('#nameForm').append('<p class="error">Please use letters only in your name, no special characters.</p>');
    }

    // email validation
    if (!email) {
        errors = true;
        $('#emailForm').append('<p class="error">Please tell us where to send the newsletters.</p>');
    } else if (email.match(/@[^@]*@/)) {
        errors = true;
        $('#emailForm').append('<p class="error">There are too many @ symbols in your address.</p>');
    } else if (!email.match(/@+/g)) {
        errors = true;
        $('#emailForm').append('<p class="error">Please add an @ to your email address.</p>');
    } else if (!email.match(/\.+/g)) {
        errors = true;
        $('#emailForm').append('<p class="error">There\'s a period (.) missing from your email address.</p>');
    }

    // ajax setup
    if (!errors) {
        let api = '/api/users'
        $.ajax({
            method: 'POST',
            url: api,
            data: {
                firstName,
                lastName,
                email
            },
            success: handleSuccess,
            error: handleError
        });
    }

    function handleSuccess(res) {
        let success = `
        <div class="card" id="my-modal">
        <div class="card-body">
        <h5> You 're all set!</h5>
        <h5 id="name">Thanks for signing up, ${firstName}.</h5>
        <h5 padding="20px">Now enjoy our First Monthly FREE!</h5>
     <div class="form-group">
          <button type="button" class="btn btn-primary btn-danger btn-block" id="watching">Start Watching</button>
          <div class=“bottom”>
            <h6>Update Email Settings</h6>
          </div>
        </div>
      </div>
    </form>`;
        $('.my-modal').empty().append(success);
    }

    function handleError(err) {
        console.log(err);
    }
});