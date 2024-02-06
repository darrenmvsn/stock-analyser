function CheckPassword(inputtxt) 
{ 
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (inputtxt.match(passw)) 
    { 
        return true;
    }
    else
    { 
        // alert('Wrong Format!')
        return false;
    }
}
console.log(CheckPassword("ndka"))