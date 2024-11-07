function submitLogin() {

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    
    if(!validateUsername() || !validatePassword()) {
        return;
    }

    const url = ('https://restapi.tu.ac.th/api/v1/auth/Ad/verify');

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key' : 'TUccc18e1b7e74094e279c457a405467d2e89eb803f6c5f72da823d99b0c9b9e013e310e0adc1237e1853a4a0f249788c2'
        },
        body: JSON.stringify({"UserName" : username,"PassWord" : password})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Login failed!');
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        if(data.message === 'Success'){
            document.getElementById('message').style.color = 'black';
            document.getElementById('message').innerText = data.message+'\n\n **Data** \n StudentID: '+
            data.username+'\n Name: '+
            data.displayname_en+'\n Email: '+
            data.email+'\n Department: '+
            data.department+'\n Faculty: '+
            data.faculty;

            fetch("http://localhost:8080/api/students", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName: data.username,
                    engName: data.displayname_en,
                    email: data.email,
                    type: data.type,
                    faculty: data.faculty
                })
            })
        }else{
            console.error('Login failed!');
            alert('Error: Login failed!');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Error: Login failed!");
    });
}

function validateUsername() {
    const username = document.getElementById('username').value;
    const errorMessage = document.getElementById('message');
    errorMessage.style.color = 'red';

    if (!username.length > 0) {
        errorMessage.innerText = 'กรุณากรอกชื่อผู้ใช้';
        return false;
    }
    if (username.length < 10) {
        errorMessage.innerText = 'ชื่อผู้ใช้ต้องมีความยาว 10 หลัก';
        return false;
    }
    else{
        errorMessage.innerText = '';
        return true;
    }
}

function validatePassword() {
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('message');
    errorMessage.style.color = 'red';

    if (!password) {
        errorMessage.innerText = 'กรุณากรอกรหัสผ่าน';
        return false;
    }
    if (password.length < 3) {
        errorMessage.innerText = 'รหัสผ่านต้องมีความยาวมากกว่า 3 ตัว';
        return fasle;
    }
    else{
        errorMessage.innerText = '';
        return true;
    }
}