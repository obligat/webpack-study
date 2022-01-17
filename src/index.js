import style9 from 'style9'

const someStyles = style9.create({
  blue: {
    color: 'blue',
  }
});

const someOtherStyles = style9.create({
  tilt: {
    transform: 'rotate(0deg)'
  }
});


document.body.className = style9(someStyles.blue, someOtherStyles['ti' + 'lt']);
document.body.innerHTML = "<div>abcfffffffffffff</div>"